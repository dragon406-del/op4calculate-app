import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { math } from '../utils/mathInstance';
import { 
  Rotate3d, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  Trash2, 
  Play, 
  Pause,
  X,
  Maximize2,
  Sparkles
} from 'lucide-react';

interface ThreeGraph3DProps {
  isOpen: boolean;
  onClose: () => void;
  initialEquation?: string;
}

const PRESET_EQUATIONS = [
  { name: 'Ripple', eq: 'sin(sqrt(x^2 + y^2)) * 2' },
  { name: 'Saddle', eq: '(x^2 - y^2) / 4' },
  { name: 'Sombrero', eq: '3 * sin(sqrt(x^2 + y^2)) / (sqrt(x^2 + y^2) + 0.2)' },
  { name: 'Waves', eq: 'cos(x) * sin(y) * 2' },
  { name: 'Paraboloid', eq: '(x^2 + y^2) / 8' },
  { name: 'Gaussian Peak', eq: '4 * exp(-(x^2 + y^2) / 5)' },
  { name: 'Egg Carton', eq: 'sin(x) + sin(y)' },
];

export const ThreeGraph3D: React.FC<ThreeGraph3DProps> = ({ isOpen, onClose, initialEquation }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [equation, setEquation] = useState<string>(initialEquation || 'sin(sqrt(x^2 + y^2)) * 2');
  const [error, setError] = useState<string | null>(null);
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [resolution, setResolution] = useState<number>(40);
  const [gridRange, setGridRange] = useState<number>(6);

  // Three.js instances ref
  const instancesRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    controls: OrbitControls;
    surfaceMesh?: THREE.Mesh;
    wireMesh?: THREE.LineSegments;
    animId?: number;
  } | null>(null);

  // Helper to color by height
  const getColorForHeight = (t: number): THREE.Color => {
    // Gradient: Deep Blue (0.0) -> Cyan (0.25) -> Emerald (0.5) -> Amber/Orange (0.75) -> Magenta/Pink (1.0)
    const color = new THREE.Color();
    const clamped = Math.max(0, Math.min(1, t));
    
    if (clamped < 0.25) {
      color.lerpColors(new THREE.Color(0x1e3a8a), new THREE.Color(0x06b6d4), clamped / 0.25);
    } else if (clamped < 0.5) {
      color.lerpColors(new THREE.Color(0x06b6d4), new THREE.Color(0x10b981), (clamped - 0.25) / 0.25);
    } else if (clamped < 0.75) {
      color.lerpColors(new THREE.Color(0x10b981), new THREE.Color(0xf59e0b), (clamped - 0.5) / 0.25);
    } else {
      color.lerpColors(new THREE.Color(0xf59e0b), new THREE.Color(0xec4899), (clamped - 0.75) / 0.25);
    }
    return color;
  };

  const createSurfacePlot = useCallback((expr: string, rangeVal: number, resVal: number) => {
    const inst = instancesRef.current;
    if (!inst) return;
    const { scene } = inst;

    // Remove existing surface
    if (inst.surfaceMesh) {
      scene.remove(inst.surfaceMesh);
      inst.surfaceMesh.geometry.dispose();
      if (Array.isArray(inst.surfaceMesh.material)) {
        inst.surfaceMesh.material.forEach(m => m.dispose());
      } else {
        inst.surfaceMesh.material.dispose();
      }
      inst.surfaceMesh = undefined;
    }

    if (inst.wireMesh) {
      scene.remove(inst.wireMesh);
      inst.wireMesh.geometry.dispose();
      if (Array.isArray(inst.wireMesh.material)) {
        inst.wireMesh.material.forEach(m => m.dispose());
      } else {
        inst.wireMesh.material.dispose();
      }
      inst.wireMesh = undefined;
    }

    try {
      // Test expression with sample inputs (allow x, y or x, z)
      let compiled: math.EvalFunction;
      try {
        compiled = math.compile(expr);
        // Test evaluate
        compiled.evaluate({ x: 1, y: 1, z: 1 });
      } catch (err) {
        throw new Error("Invalid formula. Use variables x and y (or z).");
      }

      const size = rangeVal;
      const step = (size * 2) / resVal;
      const cols = resVal + 1;
      const vertices: number[] = [];
      const indices: number[] = [];
      const rawY: number[] = [];

      let minY = Infinity;
      let maxY = -Infinity;

      for (let r = 0; r < cols; r++) {
        const z = -size + r * step;
        for (let c = 0; c < cols; c++) {
          const x = -size + c * step;
          let val = 0;
          try {
            // Support equation in terms of (x, y) or (x, z)
            const res = compiled.evaluate({ x, y: z, z });
            val = Number.isFinite(res) ? Number(res) : 0;
          } catch {
            val = 0;
          }

          // Clamp extreme vertical spikes
          val = Math.max(-size * 3, Math.min(size * 3, val));
          rawY.push(val);
          if (val < minY) minY = val;
          if (val > maxY) maxY = val;

          // Vertex in 3D: X is x, Y is height (val), Z is z
          vertices.push(x, val, z);
        }
      }

      // Generate triangulated faces
      for (let r = 0; r < resVal; r++) {
        for (let c = 0; c < resVal; c++) {
          const a = r * cols + c;
          const b = a + 1;
          const d = a + cols;
          const e = d + 1;

          indices.push(a, b, d);
          indices.push(b, e, d);
        }
      }

      // Build height vertex colors
      const colors: number[] = [];
      const yDelta = maxY - minY || 1;
      for (let i = 0; i < rawY.length; i++) {
        const t = (rawY[i] - minY) / yDelta;
        const col = getColorForHeight(t);
        colors.push(col.r, col.g, col.b);
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      geometry.setIndex(indices);
      geometry.computeVertexNormals();

      const material = new THREE.MeshStandardMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
        roughness: 0.35,
        metalness: 0.15,
        wireframe: wireframe,
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      inst.surfaceMesh = mesh;

      // Add subtle wireframe edges if not in full wireframe mode
      if (!wireframe) {
        const wireGeo = new THREE.WireframeGeometry(geometry);
        const wireMat = new THREE.LineBasicMaterial({
          color: 0x00ffff,
          transparent: true,
          opacity: 0.12,
        });
        const wire = new THREE.LineSegments(wireGeo, wireMat);
        scene.add(wire);
        inst.wireMesh = wire;
      }

      setError(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error rendering 3D surface');
    }
  }, [wireframe]);

  // Init Three.js Scene
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 700;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x090d16);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(12, 14, 18);
    camera.lookAt(0, 0, 0);

    const isLowPower = window.innerWidth < 640 || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: !isLowPower, 
      alpha: false, 
      powerPreference: 'high-performance',
      precision: isLowPower ? 'mediump' : 'highp'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isLowPower ? 1.25 : 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // Clear container
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 80;
    controls.minDistance = 3;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight1.position.set(15, 25, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 0.6);
    dirLight2.position.set(-15, -10, -15);
    scene.add(dirLight2);

    // Axes & Grid
    const axesHelper = new THREE.AxesHelper(8);
    scene.add(axesHelper);

    const gridHelper = new THREE.GridHelper(16, 16, 0x0ea5e9, 0x1e293b);
    gridHelper.position.y = -0.05;
    scene.add(gridHelper);

    // Axis labels helper
    const makeTextSprite = (text: string, color: string, pos: THREE.Vector3) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.font = 'bold 36px monospace';
        ctx.fillStyle = color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 64, 32);
      }
      const texture = new THREE.CanvasTexture(canvas);
      const spriteMat = new THREE.SpriteMaterial({ map: texture, transparent: true });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.copy(pos);
      sprite.scale.set(2, 1, 1);
      scene.add(sprite);
    };

    makeTextSprite('+X', '#f43f5e', new THREE.Vector3(9, 0, 0));
    makeTextSprite('+Y (Height)', '#10b981', new THREE.Vector3(0, 9, 0));
    makeTextSprite('+Z', '#38bdf8', new THREE.Vector3(0, 0, 9));

    instancesRef.current = { scene, camera, renderer, controls };

    // Initial plot
    createSurfacePlot(equation, gridRange, resolution);

    // Optimized Animation Loop: pauses idle rendering on low-end hardware
    let animId: number;
    let needsRender = true;
    controls.addEventListener('change', () => { needsRender = true; });

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (autoRotate && controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.2;
        controls.update();
        renderer.render(scene, camera);
      } else if (controls) {
        controls.autoRotate = false;
        const changed = controls.update();
        if (changed || needsRender) {
          renderer.render(scene, camera);
          needsRender = false;
        }
      }
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      instancesRef.current = null;
    };
  }, [isOpen]);

  // Update plot when equation or parameters change
  useEffect(() => {
    if (isOpen && instancesRef.current) {
      createSurfacePlot(equation, gridRange, resolution);
    }
  }, [equation, gridRange, resolution, wireframe, createSurfacePlot, isOpen]);

  const handleZoom = (factor: number) => {
    const inst = instancesRef.current;
    if (!inst) return;
    inst.camera.position.multiplyScalar(factor);
    inst.controls.update();
  };

  const handleResetView = () => {
    const inst = instancesRef.current;
    if (!inst) return;
    inst.camera.position.set(12, 14, 18);
    inst.camera.lookAt(0, 0, 0);
    inst.controls.target.set(0, 0, 0);
    inst.controls.update();
  };

  const handleClear = () => {
    setEquation('');
    const inst = instancesRef.current;
    if (!inst) return;
    if (inst.surfaceMesh) inst.scene.remove(inst.surfaceMesh);
    if (inst.wireMesh) inst.scene.remove(inst.wireMesh);
    inst.surfaceMesh = undefined;
    inst.wireMesh = undefined;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="flex flex-col w-full max-w-4xl h-[90vh] max-h-[780px] bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/50 overflow-hidden text-slate-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Rotate3d className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-100 flex items-center gap-2">
                3D Surface Grapher
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  WebGL · Orbit
                </span>
              </h2>
              <p className="text-xs text-slate-400">Plot 3D surfaces z = f(x, y) with interactive rotation and height shading</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Close 3D Graph"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls Toolbar */}
        <div className="px-5 py-3 border-b border-slate-800/80 bg-slate-900/90 flex flex-col gap-2.5">
          {/* Equation Input Bar */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-cyan-400 font-medium text-sm">z =</span>
            <input
              type="text"
              id="graph3DInput"
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              placeholder="e.g. sin(sqrt(x^2 + y^2)) * 2, x^2 - y^2"
              className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-sm font-mono text-cyan-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition"
            />
            <button
              onClick={() => createSurfacePlot(equation, gridRange, resolution)}
              className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-xs rounded-lg transition shadow-md shadow-cyan-500/20 active:scale-95 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Plot
            </button>
            <button
              onClick={handleClear}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-lg transition flex items-center gap-1"
              title="Clear plot"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>

          {/* Quick Presets & Visual Options */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            {/* Presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <span className="text-slate-400 font-medium">Presets:</span>
              {PRESET_EQUATIONS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setEquation(preset.eq)}
                  className={`px-2.5 py-1 rounded-md border font-mono transition text-[11px] whitespace-nowrap ${
                    equation === preset.eq
                      ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border-slate-700/60'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>

            {/* View actions */}
            <div className="flex items-center gap-1.5 ml-auto">
              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`p-1.5 rounded-lg border transition ${
                  autoRotate ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
                title={autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
              >
                {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setWireframe(!wireframe)}
                className={`p-1.5 rounded-lg border transition ${
                  wireframe ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
                title="Toggle Wireframe"
              >
                <Layers className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleZoom(0.85)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleZoom(1.15)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleResetView}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
                title="Reset Camera View"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* WebGL Canvas Container */}
        <div className="relative flex-1 w-full bg-slate-950 overflow-hidden">
          <div 
            id="graph3DContainer"
            ref={containerRef} 
            className="w-full h-full cursor-grab active:cursor-grabbing"
          />

          {/* Interactive Overlay Hints */}
          <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-[11px] text-slate-400 flex items-center gap-3 pointer-events-none">
            <span>🖱 Drag to rotate</span>
            <span>⚲ Scroll to zoom</span>
            <span>⇧ Shift + Drag to pan</span>
          </div>

          {error && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-rose-950/90 border border-rose-500/50 text-rose-200 px-4 py-2 rounded-xl text-xs font-mono backdrop-blur-sm shadow-xl">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Footer info & parameters */}
        <div className="px-5 py-2.5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5">
              <span>Resolution:</span>
              <input
                type="range"
                min="20"
                max="60"
                step="5"
                value={resolution}
                onChange={(e) => setResolution(Number(e.target.value))}
                className="w-20 accent-cyan-400 cursor-pointer"
              />
              <span className="font-mono text-cyan-300 text-[11px]">{resolution}x{resolution}</span>
            </label>

            <label className="flex items-center gap-1.5">
              <span>Range:</span>
              <input
                type="range"
                min="3"
                max="12"
                step="1"
                value={gridRange}
                onChange={(e) => setGridRange(Number(e.target.value))}
                className="w-20 accent-cyan-400 cursor-pointer"
              />
              <span className="font-mono text-cyan-300 text-[11px]">±{gridRange}</span>
            </label>
          </div>

          <div className="font-mono text-[11px] text-slate-500">
            Shading: Spectral Height Map
          </div>
        </div>

      </div>
    </div>
  );
};
