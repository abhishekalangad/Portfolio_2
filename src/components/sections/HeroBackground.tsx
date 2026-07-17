import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const HeroBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = width < 768 ? 7.5 : 5.0;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.IcosahedronGeometry(2, 3);
    const material = new THREE.MeshPhongMaterial({
        color: 0x4a7c59, 
        wireframe: true,
        transparent: true,
        opacity: 0.15,
    });
    const mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);

    const particlesCount = 150;
    const positions = new Float32Array(particlesCount * 3);
    for(let i = 0; i < particlesCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        color: 0x4a7c59,
        size: 0.05,
        transparent: true,
        opacity: 0.3
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    group.add(particles);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x4a7c59, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    let mouseX = 0;
    let mouseY = 0;
    
    const onMouseMove = (e: MouseEvent) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
    };
    
    document.addEventListener('mousemove', onMouseMove);

    let animationFrameId: number;

    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const time = Date.now() * 0.001;

        mesh.rotation.x += 0.001;
        mesh.rotation.y += 0.001;
        particles.rotation.y += 0.0005;

        const s = 1 + Math.sin(time) * 0.05;
        mesh.scale.set(s, s, s);

        group.position.x += (mouseX * 2 - group.position.x) * 0.03;
        group.position.y += (-mouseY * 2 - group.position.y) * 0.03;

        renderer.render(scene, camera);
    };
    
    animate();

    const onResize = () => {
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.position.z = w < 768 ? 7.5 : 5.0;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    };
    
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
};
