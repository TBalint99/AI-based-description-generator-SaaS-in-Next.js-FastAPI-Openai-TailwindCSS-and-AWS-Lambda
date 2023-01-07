import * as React from 'react';
import * as THREE from 'three';

const BrandyGlass: React.FC = () => {
  const mount = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.current!.appendChild(renderer.domElement);

    // Load the image as a texture
    const texture = new THREE.TextureLoader().load('frontend\public\brandy_logo_removedbg.png');

    // Create the 3D object
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Set up the mouse follow behavior
    document.addEventListener('mousemove', event => {
      // Update the cube's position to be at the cursor
      cube.position.x = event.clientX / window.innerWidth * 2 - 1;
      cube.position.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Set up the continuous rotation behavior
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    // Start the animation loop
    animate();
  }, []); // The empty array ensures that the effect only runs once

  return <div ref={mount} />;
};

export default BrandyGlass;
