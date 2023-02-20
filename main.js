import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



let renderer, scene, camera, planet, halo, asteroid;

window.onload = function() {
  init();
  animate();
}

function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  renderer.setClearColor(0x000000, 0.0);
  document.getElementById('canvas').appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 400;
  //Mouse controls
  const controls = new OrbitControls(camera, renderer.domElement);
  scene.add(camera);

  asteroid = new THREE.Object3D();
  planet = new THREE.Object3D();
  halo = new THREE.Object3D();
  
  scene.add(asteroid);
  scene.add(planet);
  scene.add(halo);

  let asteroid_geometry = new THREE.TetrahedronGeometry(2, 0);
  let planet_geometry = new THREE.IcosahedronGeometry(7, 1);
  let halo_geometry = new THREE.IcosahedronGeometry(15, 1);

  let asteroid_material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    flatShading: true,
  });
  let planet_material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    flatShading: true
  });
  let halo_material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: true,
    side: THREE.DoubleSide
  });

  for (let i = 0; i < 1000; i++) {
    let asteroid_mesh = new THREE.Mesh(asteroid_geometry, asteroid_material);
    asteroid_mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
    asteroid_mesh.position.multiplyScalar(150 + (Math.random() * 700));
    asteroid_mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
    asteroid.add(asteroid_mesh);
  }

  let planet_mesh = new THREE.Mesh(planet_geometry, planet_material);
  planet_mesh.scale.x = planet_mesh.scale.y = planet_mesh.scale.z = 16;
  planet.add(planet_mesh);

  let halo_mesh = new THREE.Mesh(halo_geometry, halo_material);
  halo_mesh.scale.x = halo_mesh.scale.y = halo_mesh.scale.z = 10;
  halo.add(halo_mesh);

  //Lighting
  let ambientLight = new THREE.AmbientLight(0x999999 );
  scene.add(ambientLight);
  
  let lights = [];
  lights[0] = new THREE.DirectionalLight( 0xffffff, 1 );
  lights[0].position.set( 1, 0, 0 );
  lights[1] = new THREE.DirectionalLight( 0x11E8BB, 1 );
  lights[1].position.set( 0.75, 1, 0.5 );
  lights[2] = new THREE.DirectionalLight( 0x8200C9, 1 );
  lights[2].position.set( -0.75, -1, 0.5 );
  scene.add( lights[0] );
  scene.add( lights[1] );
  scene.add( lights[2] );
  
  //Resizing
  window.addEventListener('resize', onWindowResize, false);

};

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  asteroid.rotation.x += 0.0000;
  asteroid.rotation.y -= 0.0020;
  planet.rotation.x -= 0.0010;
  planet.rotation.y -= 0.0015;
  halo.rotation.x -= 0.0005;
  halo.rotation.y += 0.0010;
  renderer.clear();

  renderer.render( scene, camera )
};
