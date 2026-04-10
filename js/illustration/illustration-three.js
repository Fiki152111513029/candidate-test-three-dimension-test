import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

// CAMERA
const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

// === GRID & AXIS ===
const grid = new THREE.GridHelper(20, 20);
scene.add(grid);

const axes = new THREE.AxesHelper(5);
scene.add(axes);

// === LOAD TEXTURE JPG ===
const textureLoader = new THREE.TextureLoader();

// ganti sesuai nama file kamu
const texture = textureLoader.load('./model/wood/wood.fbm/Color_A02.jpg');
const texture2 = textureLoader.load('./model/wood/wood.fbm/Colormap.png');

// biar texture tidak ketarik (repeat)
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(2, 1);

// === MATERIAL UNTUK SEMUA SISI (kanan, kiri, depan, belakang) ===
// Buat 6 material untuk 6 sisi box
// Urutan: right, left, up, down, front, back
const materialArray = [
    texture2, // kanan (right)
    texture2, // kiri (left)
    new THREE.MeshStandardMaterial({ map: texture }), // atas (up) - optional
    new THREE.MeshStandardMaterial({ map: texture }), // bawah (down) - optional
    texture, // depan (front)
    texture,  // belakang (back)
].map(mat => {
    // Jika mat adalah texture, buat MeshStandardMaterial dengan texture tersebut
    if (mat instanceof THREE.Texture) {
        return new THREE.MeshStandardMaterial({ map: mat });
    }
    return mat;
});

const materialSama = new THREE.MeshStandardMaterial({
    map: texture
});

// === BALOK 1 (TENGAH) ===
const balok1 = new THREE.Mesh(
    new THREE.BoxGeometry(3, 0.2, 0.5),
    materialArray
);
balok1.position.set(-1.5, 0.1, 0.25);
scene.add(balok1);

// === BALOK 2 (KANAN) ===
const balok2 = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.2, 0.5),
    materialArray
);
balok2.position.set(-1.5, 0.1, 0.75);
scene.add(balok2);

// === BALOK 3 (KIRI) ===
const balok3 = new THREE.Mesh(
    new THREE.BoxGeometry(2, 0.2, 0.4),
    materialArray
);
balok3.position.set(-1.7, 0.3, 0.5);
scene.add(balok3);

// === LIGHTING ===
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);

// POSISI CAMERA (view dari atas miring)
camera.position.set(8, 1.8, 2);
camera.lookAt(0, 0, 0);

// RESPONSIVE
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ANIMATE
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();