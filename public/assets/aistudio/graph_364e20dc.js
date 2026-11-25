/*=========================================
        OP3CALCULATE GRAPH ENGINE
=========================================*/

/*=========================================
        THREE.JS VARIABLES
=========================================*/

let scene;
let camera;
let renderer;
let cube;
let cubeEdges;

let animationId;
let isDragging3D = false;
let previousX3D = 0;
let previousY3D = 0;

function graph3D() {

    document.getElementById("graph3DModal").style.display = "block";

    init3DScene();

    setTimeout(function() {

    if (scene && !cube) {
        createDefaultCube();
    }

}, 50);}

function close3DGraph(){

    document.getElementById("graph3DModal").style.display = "none";

    if(animationId){

        cancelAnimationFrame(animationId);
        animationId = null;

    }

    if(renderer){

        renderer.dispose();

        document.getElementById("graph3DContainer").innerHTML = "";

        renderer = null;
        scene = null;
        camera = null;
        cube = null;

    }

}

function addAxisLabel(text, position) {

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = 256;
    canvas.height = 128;

    context.font = "Bold 48px Arial";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.textBaseline = "middle";

    context.fillText(text, 128, 64);

    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true
    });

    const sprite = new THREE.Sprite(material);

    sprite.position.set(
        position.x,
        position.y,
        position.z
    );

    sprite.scale.set(2, 1, 1);

    scene.add(sprite);
}
function createDefaultCube() {
    
    if (!scene) return;
    
    const geometry = new THREE.BoxGeometry(6, 6, 6);
    
    const material = new THREE.MeshStandardMaterial({
        color: 0x00BCD4,
        metalness: 0.1,
        roughness: 0.7
    });
    
    cube = new THREE.Mesh(
        geometry,
        material
    );
    
    cube.position.set(0, 3, 0);
    
    scene.add(cube);
    
    // Make cube edges clearly visible
    const edgeGeometry =
        new THREE.EdgesGeometry(geometry);
    
    const edgeMaterial =
        new THREE.LineBasicMaterial({
            color: 0xffffff,
            linewidth: 2
        });
    
    cubeEdges =
        new THREE.LineSegments(
            edgeGeometry,
            edgeMaterial
        );
    
    cubeEdges.position.copy(cube.position);
    
    scene.add(cubeEdges);
}
function init3DScene(){

    const container =
    document.getElementById("graph3DContainer");

    container.innerHTML = "";

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0x111111);

    camera = new THREE.PerspectiveCamera(

        45,

        container.clientWidth /
        container.clientHeight,

        0.1,

        1000

    );

    camera.position.set(0, 10, 22);

camera.up.set(0, 1, 0);

camera.lookAt(0, 2, 0);

    renderer = new THREE.WebGLRenderer({
        antialias:true
    });

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );

    container.appendChild(
        renderer.domElement
    );
    window.addEventListener("resize", function () {

    if (!camera || !renderer) return;

    const container =
        document.getElementById("graph3DContainer");

    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    camera.aspect = width / height;

    camera.updateProjectionMatrix();

    renderer.setSize(width, height);

});

    const ambient =
    new THREE.AmbientLight(
        0xffffff,
        0.7
    );

    scene.add(ambient);

    const light =
    new THREE.DirectionalLight(
        0xffffff,
        1
    );

    light.position.set(5,5,5);

    scene.add(light);
    const axesHelper = new THREE.AxesHelper(8);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(16, 16);

gridHelper.position.y = -0.05;

scene.add(gridHelper);
addAxisLabel("X", new THREE.Vector3(9, 0, 0));
addAxisLabel("Y", new THREE.Vector3(0, 9, 0));
addAxisLabel("Z", new THREE.Vector3(0, 0, 9));
    
    /*cube.position.set(0,0,0);*/

    

setup3DRotation();

animate3D();

}
function resize3DScene() {

    if (!renderer || !camera) return;

    const container =
        document.getElementById("graph3DContainer");

    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    if (width === 0 || height === 0) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height, false);
}

window.addEventListener("resize", resize3DScene);

let animationRunning3D = false;

function animate3D() {

    if (animationRunning3D) return;

    animationRunning3D = true;

    function renderLoop() {

        animationId = requestAnimationFrame(renderLoop);

        if (renderer && scene && camera) {
            renderer.render(scene, camera);
        }

    }

    renderLoop();
}
function createSurface(expression) {
    
    const size = 5;
    const step = 0.4;
    
    const vertices = [];
    const indices = [];
    
    const cols =
        Math.floor((size * 2) / step) + 1;
    
    for (let r = 0; r < cols; r++) {
        
        const z = -size + r * step;
        
        for (let c = 0; c < cols; c++) {
            
            const x = -size + c * step;
            
            let y;
            
            try {
                
                y = math.evaluate(
                    expression,
                    {
                        x: x,
                        z: z
                    }
                );
                
                if (!Number.isFinite(y)) {
                    y = 0;
                }
                
            } catch (error) {
                
                console.error(
                    "3D equation error:",
                    error
                );
                
                y = 0;
            }
            
            // Prevent extreme values
            y = Math.max(
                -20,
                Math.min(20, y)
            );
            
            vertices.push(x, y, z);
        }
    }
    
    const rows = cols;
    
    for (let r = 0; r < rows - 1; r++) {
        
        for (let c = 0; c < cols - 1; c++) {
            
            const a = r * cols + c;
            const b = a + 1;
            const d = a + cols;
            const e = d + 1;
            
            indices.push(a, b, d);
            indices.push(b, e, d);
        }
    }
    
    const geometry =
        new THREE.BufferGeometry();
    
    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
            vertices,
            3
        )
    );
    
    geometry.setIndex(indices);
    
    geometry.computeVertexNormals();
    
    const material =
        new THREE.MeshStandardMaterial({
            
            color: 0x00BCD4,
            
            side: THREE.DoubleSide,
            
            metalness: 0.1,
            
            roughness: 0.7
            
        });
    
    cube =
        new THREE.Mesh(
            geometry,
            material
        );
    
    scene.add(cube);
}
function zoomIn3D() {

    if (!camera) return;

    const distance = camera.position.length();

    if (distance > 8) {
        camera.position.multiplyScalar(0.85);
    }

    camera.lookAt(0, 2, 0);
}


function zoomOut3D() {

    if (!camera) return;

    const distance = camera.position.length();

    if (distance < 50) {
        camera.position.multiplyScalar(1.15);
    }

    camera.lookAt(0, 2, 0);
}

function reset3DView() {

    if (!camera) return;

    camera.position.set(0, 10, 22);

    camera.up.set(0, 1, 0);

    camera.lookAt(0, 2, 0);
}
function plot3DGraph() {

    const input =
    document.getElementById("graph3DInput");

    const expression =
    input.value.trim();
    try {
    math.evaluate(expression, { x: 1, z: 1 });
} catch (error) {
    alert("Invalid 3D equation. Use x and z as variables.");
    return;
}

    if (!expression) {
        alert("Enter a 3D equation.");
        return;
    }

    if (!scene || !camera || !renderer) {
        init3DScene();
    }

    // Remove previous surface
    if (cube) {

    scene.remove(cube);

    cube.geometry.dispose();
    cube.material.dispose();

    cube = null;
}

if (cubeEdges) {

    scene.remove(cubeEdges);

    cubeEdges.geometry.dispose();
    cubeEdges.material.dispose();

    cubeEdges = null;
}

    // Create surface from entered expression
    createSurface(expression);
    reset3DView();
}


function clear3DGraph() {

    if (cube && scene) {
        scene.remove(cube);

        cube.geometry.dispose();
        cube.material.dispose();

        cube = null;
    }

    if (cubeEdges && scene) {
        scene.remove(cubeEdges);

        cubeEdges.geometry.dispose();
        cubeEdges.material.dispose();

        cubeEdges = null;
    }

    const input =
        document.getElementById("graph3DInput");

    if (input) {
        input.value = "";
    }

    // Restore default cube
    createDefaultCube();

    reset3DView();
}
function setup3DRotation() {

    if (!renderer || !camera) return;

    const canvas = renderer.domElement;

    canvas.addEventListener("pointerdown", function(e) {

        isDragging3D = true;

        previousX3D = e.clientX;
        previousY3D = e.clientY;

        canvas.setPointerCapture(e.pointerId);

    });

    canvas.addEventListener("pointermove", function(e) {

        if (!isDragging3D || !camera) return;

        const dx = e.clientX - previousX3D;
        const dy = e.clientY - previousY3D;

        previousX3D = e.clientX;
        previousY3D = e.clientY;

        // Horizontal orbit
        const angle = Math.atan2(
            camera.position.x,
            camera.position.z
        );

        const radius = Math.sqrt(
            camera.position.x ** 2 +
            camera.position.z ** 2
        );

        const newAngle = angle - dx * 0.01;

        camera.position.x =
            Math.sin(newAngle) * radius;

        camera.position.z =
            Math.cos(newAngle) * radius;

        // Vertical orbit
        camera.position.y -= dy * 0.05;

camera.position.y = Math.max(
    2,
    Math.min(15, camera.position.y)
);

        camera.lookAt(0, 0, 0);

    });

    canvas.addEventListener("pointerup", function(e) {

        isDragging3D = false;

        canvas.releasePointerCapture(e.pointerId);

    });

    canvas.addEventListener("pointercancel", function() {

        isDragging3D = false;

    });

}