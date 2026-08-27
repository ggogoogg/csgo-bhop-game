let scene, camera, renderer;
let player;
let map;
let knife;
let keys = {};
let mouseDown = false;
let knifeIndex = 0;

const knifeSkins = [
    'Marble Fade',
    'Fade',
    'Crimson Web',
    'Night',
    'Forest DDPAT',
    'Boreal Forest'
];

function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    scene.fog = new THREE.Fog(0x87ceeb, 1000, 3000);

    // Camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(0, 100, 0);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowShadowMap;
    document.body.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(500, 500, 500);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Initialize game objects
    player = new Player(camera);
    map = new Map(scene);
    knife = new Knife(scene);

    // Input handling
    document.addEventListener('keydown', (e) => keys[e.key] = true);
    document.addEventListener('keyup', (e) => keys[e.key] = false);
    document.addEventListener('mousemove', (e) => player.handleMouseMove(e));
    document.addEventListener('mousedown', () => mouseDown = true);
    document.addEventListener('mouseup', () => mouseDown = false);
    document.addEventListener('click', switchKnife);

    // Pointer lock
    document.addEventListener('click', () => {
        renderer.domElement.requestPointerLock();
    });

    // Window resize
    window.addEventListener('resize', onWindowResize);

    animate();
}

function switchKnife() {
    knifeIndex = (knifeIndex + 1) % knifeSkins.length;
    knife.changeSkin(knifeSkins[knifeIndex]);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Update player
    player.update(keys);
    knife.update(player);

    // Update UI
    document.getElementById('speed').textContent = `Speed: ${Math.round(player.velocity.length())} u/s`;
    document.getElementById('height').textContent = `Height: ${Math.round(player.position.y)}`;

    renderer.render(scene, camera);
}

window.addEventListener('load', init);