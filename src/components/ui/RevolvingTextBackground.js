import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const createTextTexture = (text) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Initial font setup to measure text width
  ctx.font = 'bold 80px "Outfit", sans-serif';
  const textString = `${text.toUpperCase()} • `;
  const textMetrics = ctx.measureText(textString);
  
  canvas.width = textMetrics.width;
  canvas.height = 128;

  // Re-apply styles after dimension change
  ctx.font = 'bold 80px "Outfit", sans-serif';
  ctx.fillStyle = '#f0f0f0';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillText(textString, 0, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  // Repeat the text 3 times around the cylinder horizontally
  texture.repeat.set(3, 1);
  // Ensure the texture is sharp
  texture.minFilter = THREE.LinearFilter;
  
  return texture;
};

const keywords = [
  "react", "javascript", "animation", "zustand", 
  "debounce", "throttling", "currying", 
  "memoization", "virtualization"
];

export function RevolvingTextBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
    mount.appendChild(renderer.domElement);

    const meshes = [];

    // --- Generate Cylinders ---
    keywords.forEach((word) => {
      const texture = createTextTexture(word);
      
      const mat = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.15,
        side: THREE.DoubleSide,
        depthWrite: false // Helps with transparency rendering
      });
      
      // Radius Top, Radius Bottom, Height, RadialSegments, HeightSegments, OpenEnded
      const geo = new THREE.CylinderGeometry(
        0.8 + Math.random() * 0.5, 
        0.8 + Math.random() * 0.5, 
        2 + Math.random() * 2, 
        64, 
        1, 
        true
      );
      
      const mesh = new THREE.Mesh(geo, mat);
      
      // Position them randomly around the center
      mesh.position.x = (Math.random() - 0.5) * 8;
      mesh.position.y = (Math.random() - 0.5) * 10;
      mesh.position.z = -Math.random() * 4;
      
      // Initial Random Rotation
      mesh.rotation.x = Math.random() * Math.PI;
      mesh.rotation.y = Math.random() * Math.PI;
      mesh.rotation.z = Math.random() * Math.PI;
      
      // Rotation Speeds
      mesh.userData = {
        rx: (Math.random() - 0.5) * 0.01,
        ry: (Math.random() - 0.5) * 0.015,
        rz: (Math.random() - 0.5) * 0.01
      };
      
      scene.add(mesh);
      meshes.push(mesh);
    });

    // --- Animation Loop ---
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      meshes.forEach(mesh => {
        mesh.rotation.x += mesh.userData.rx;
        mesh.rotation.y += mesh.userData.ry;
        mesh.rotation.z += mesh.userData.rz;
      });
      
      renderer.render(scene, camera);
    };
    animate();

    // --- Handle Resize ---
    const handleResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mount) {
        mount.removeChild(renderer.domElement);
      }
      // Dispose geometry and materials to prevent memory leaks
      meshes.forEach(mesh => {
        mesh.geometry.dispose();
        mesh.material.map.dispose();
        mesh.material.dispose();
      });
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }} 
    />
  );
}
