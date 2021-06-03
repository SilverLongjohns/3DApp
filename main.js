import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio( window.devicePixelRatio );

renderer.setSize ( window.innerWidth, window.innerHeight );

camera.position.setZ(100);

renderer.render( scene, camera );

// const backgroundTexture = new THREE.TextureLoader().load('street.jpg')
// scene.background = backgroundTexture

const pointLight = new THREE.PointLight(0xffffff, 0.3)
pointLight.position.set(20, 20, 20);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper)

const controls = new OrbitControls(camera, renderer.domElement)

function addFragment() {
  const geometry = new THREE.ConeGeometry(0.15, 2, 10);
  const material = new THREE.MeshStandardMaterial( { color: 0x7AC5CD } )
  const fragment = new THREE.Mesh( geometry, material )

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

  fragment.position.set(x, y, z);
  scene.add(fragment);
  function animate() {
    requestAnimationFrame( animate );
    fragment.translateY(THREE.MathUtils.randFloatSpread( 50 ))
    fragment.translateX(THREE.MathUtils.randFloatSpread( 50 ))
    fragment.translateZ(THREE.MathUtils.randFloatSpread( 50 ))
  }
  
  animate();
}

Array(5000).fill().forEach(addFragment);

function animate() {
  requestAnimationFrame( animate );

  controls.update();
  renderer.render( scene, camera );
}

animate();