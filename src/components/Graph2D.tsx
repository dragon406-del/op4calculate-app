import React, { useEffect, useRef, useState, useCallback } from 'react';
import { math } from '../utils/mathInstance';
import { ZoomIn, ZoomOut, RefreshCw, Crosshair, TrendingUp, Sparkles, X } from 'lucide-react';

interface Graph2DProps {
  initialExpression?: string;
  onClose?: () => void;
}

export const Graph2D: React.FC<Graph2DProps> = ({ initialExpression = 'sin(x)', onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [expression, setExpression] = useState<string>(initialExpression);
  const [scale, setScale] = useState<number>(30); // pixels per unit
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 250, y: 200 });
  const [traceX, setTraceX] = useState<number | null>(null);
  const [showTangent, setShowTangent] = useState<boolean>(false);
  const [showNormal, setShowNormal] = useState<boolean>(false);

  // Drag pan
  const isDragging = useRef<boolean>(false);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const renderPlot = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    // Subtle grid
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;

    // Vertical grid lines
    const startX = origin.x % scale;
    for (let x = startX; x < width; x += scale) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal grid lines
    const startY = origin.y % scale;
    for (let y = startY; y < height; y += scale) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Main Axes
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;

    // X Axis
    ctx.beginPath();
    ctx.moveTo(0, origin.y);
    ctx.lineTo(width, origin.y);
    ctx.stroke();

    // Y Axis
    ctx.beginPath();
    ctx.moveTo(origin.x, 0);
    ctx.lineTo(origin.x, height);
    ctx.stroke();

    // Tick labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';

    for (let x = origin.x + scale; x < width; x += scale * 2) {
      const val = ((x - origin.x) / scale).toFixed(0);
      ctx.fillText(val, x - 4, origin.y + 14);
    }
    for (let x = origin.x - scale * 2; x > 0; x -= scale * 2) {
      const val = ((x - origin.x) / scale).toFixed(0);
      ctx.fillText(val, x - 6, origin.y + 14);
    }
    for (let y = origin.y - scale * 2; y > 0; y -= scale * 2) {
      const val = (-(y - origin.y) / scale).toFixed(0);
      ctx.fillText(val, origin.x + 6, y + 4);
    }
    for (let y = origin.y + scale * 2; y < height; y += scale * 2) {
      const val = (-(y - origin.y) / scale).toFixed(0);
      ctx.fillText(val, origin.x + 6, y + 4);
    }

    // Plot Function f(x)
    if (expression.trim()) {
      try {
        const compiled = math.compile(expression);

        ctx.strokeStyle = '#06b6d4';
        ctx.lineWidth = 2.5;
        ctx.beginPath();

        let started = false;
        // Fast-path: px += 2 reduces evaluation count by 50% for smooth 60fps on low-end hardware
        for (let px = 0; px < width; px += 2) {
          const mathX = (px - origin.x) / scale;
          try {
            const mathY = Number(compiled.evaluate({ x: mathX }));
            if (Number.isFinite(mathY)) {
              const py = origin.y - mathY * scale;
              if (py >= -100 && py <= height + 100) {
                if (!started) {
                  ctx.moveTo(px, py);
                  started = true;
                } else {
                  ctx.lineTo(px, py);
                }
              } else {
                started = false;
              }
            } else {
              started = false;
            }
          } catch {
            started = false;
          }
        }
        ctx.stroke();

        // Trace and tangent line
        if (traceX !== null) {
          const mathX = (traceX - origin.x) / scale;
          const mathY = Number(compiled.evaluate({ x: mathX }));
          if (Number.isFinite(mathY)) {
            const py = origin.y - mathY * scale;

            // Trace point
            ctx.fillStyle = '#f43f5e';
            ctx.beginPath();
            ctx.arc(traceX, py, 5, 0, Math.PI * 2);
            ctx.fill();

            // Coordinate label
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 11px monospace';
            ctx.fillText(`(${mathX.toFixed(2)}, ${mathY.toFixed(2)})`, traceX + 8, py - 8);

            // Tangent line
            if (showTangent) {
              const h = 0.001;
              const y1 = Number(compiled.evaluate({ x: mathX + h }));
              const y0 = Number(compiled.evaluate({ x: mathX - h }));
              const slope = (y1 - y0) / (2 * h);

              ctx.strokeStyle = '#eab308';
              ctx.lineWidth = 1.5;
              ctx.setLineDash([4, 4]);
              ctx.beginPath();
              const dx = 100;
              ctx.moveTo(traceX - dx, py + slope * dx);
              ctx.lineTo(traceX + dx, py - slope * dx);
              ctx.stroke();
              ctx.setLineDash([]);
            }

            // Normal line
            if (showNormal) {
              const h = 0.001;
              const y1 = Number(compiled.evaluate({ x: mathX + h }));
              const y0 = Number(compiled.evaluate({ x: mathX - h }));
              const slope = (y1 - y0) / (2 * h);
              const normalSlope = Math.abs(slope) > 1e-6 ? -1 / slope : 1e6;

              ctx.strokeStyle = '#a855f7';
              ctx.lineWidth = 1.5;
              ctx.setLineDash([4, 4]);
              ctx.beginPath();
              const dx = 100;
              ctx.moveTo(traceX - dx, py + normalSlope * dx);
              ctx.lineTo(traceX + dx, py - normalSlope * dx);
              ctx.stroke();
              ctx.setLineDash([]);
            }
          }
        }
      } catch {
        // formula error
      }
    }
  }, [expression, scale, origin, traceX, showTangent, showNormal]);

  useEffect(() => {
    renderPlot();
  }, [renderPlot]);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const canvasX = e.clientX - rect.left;
    setTraceX(canvasX);

    if (isDragging.current) {
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      setOrigin((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
  };

  return (
    <div className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col gap-3">
      {/* Top Header & Inputs */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-cyan-500/10 text-cyan-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="font-semibold text-sm text-slate-200">2D Function Plotter</span>
        </div>

        <div className="flex items-center gap-2 flex-1 max-w-sm">
          <span className="font-mono text-cyan-400 text-xs">y =</span>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            placeholder="e.g. sin(x), x^2 - 4, cos(2*x)"
            className="flex-1 px-2.5 py-1 bg-slate-950 border border-slate-700 rounded-lg text-xs font-mono text-cyan-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setScale((s) => Math.min(100, s * 1.25))}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setScale((s) => Math.max(10, s / 1.25))}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => {
              setScale(30);
              setOrigin({ x: 250, y: 200 });
            }}
            className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
            title="Reset Origin"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setShowTangent(!showTangent)}
            className={`px-2 py-1 rounded text-[11px] font-mono border ${
              showTangent ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title="Toggle Tangent Line"
          >
            Tangent
          </button>
          <button
            onClick={() => setShowNormal(!showNormal)}
            className={`px-2 py-1 rounded text-[11px] font-mono border ${
              showNormal ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
            title="Toggle Normal Line"
          >
            Normal
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition ml-1"
              title="Close Graph"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Canvas */}
      <div className="relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-center">
        <canvas
          id="graphCanvas"
          ref={canvasRef}
          width={500}
          height={380}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onWheel={(e) => {
            e.preventDefault();
            const factor = e.deltaY < 0 ? 1.15 : 0.87;
            setScale((s) => Math.min(160, Math.max(10, Math.round(s * factor))));
          }}
          className="w-full max-w-[500px] h-[380px] cursor-crosshair touch-none select-none"
        />
        <div className="absolute bottom-2 left-2 text-[10px] text-slate-500 bg-slate-900/80 px-2 py-0.5 rounded pointer-events-none">
          Click & Drag to pan · Scroll wheel to zoom · Hover to trace
        </div>
      </div>
    </div>
  );
};
