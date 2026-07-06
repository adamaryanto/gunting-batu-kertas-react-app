import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function ThreeDHand({ weapon = null, isShaking = false, colorTheme = 'player', className = '' }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- SETUP SCENE, CAMERA, RENDERER ---
    const width = container.clientWidth || 220;
    const height = container.clientHeight || 220;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // --- SETUP LIGHTS ---
    const ambientLight = new THREE.AmbientLight(0x334155, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 3.0);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    // Dynamic glowing light matching theme
    const glowColor = colorTheme === 'player' ? 0x22d3ee : 0xef4444;
    const pointLight = new THREE.PointLight(glowColor, 5.0, 10);
    pointLight.position.set(0, 0, 2);
    scene.add(pointLight);

    // --- PROCEDURAL 3D ROBOT HAND CREATION ---
    const handGroup = new THREE.Group();
    scene.add(handGroup);

    // Adjust hand facing direction based on player vs bot
    if (colorTheme === 'player') {
      handGroup.rotation.y = -0.7; // Angle slightly facing right
    } else {
      handGroup.rotation.y = 0.7;  // Angle slightly facing left
      handGroup.scale.x = -1;      // Mirror for bot
    }

    // materials
    const metalMaterial = new THREE.MeshStandardMaterial({
      color: 0x64748b, // Slate 500
      metalness: 0.95,
      roughness: 0.15,
      flatShading: true
    });

    const jointMaterial = new THREE.MeshStandardMaterial({
      color: glowColor,
      emissive: glowColor,
      emissiveIntensity: 2.0,
      roughness: 0.1
    });

    // Palm
    const palmGeo = new THREE.BoxGeometry(1.6, 1.8, 0.45);
    const palm = new THREE.Mesh(palmGeo, metalMaterial);
    palm.position.y = -0.6;
    handGroup.add(palm);

    // Finger creator helper
    function createFinger(startX, startY, length, width, isThumb = false) {
      const fingerRoot = new THREE.Group();
      fingerRoot.position.set(startX, startY, 0);
      
      // Knuckle Joint 1 (Base)
      const knuckleGeo = new THREE.SphereGeometry(width * 0.7, 8, 8);
      const knuckle1 = new THREE.Mesh(knuckleGeo, jointMaterial);
      fingerRoot.add(knuckle1);

      // Segment 1 (Base Phalanx)
      const seg1Length = length * 0.45;
      const seg1Geo = new THREE.BoxGeometry(width, seg1Length, width);
      const seg1 = new THREE.Mesh(seg1Geo, metalMaterial);
      seg1.position.y = seg1Length / 2;
      fingerRoot.add(seg1);

      // Joint 2 (Middle Joint)
      const joint2Group = new THREE.Group();
      joint2Group.position.y = seg1Length;
      
      const knuckle2 = new THREE.Mesh(knuckleGeo, jointMaterial);
      knuckle2.scale.set(0.9, 0.9, 0.9);
      joint2Group.add(knuckle2);

      // Segment 2 (Middle Phalanx)
      const seg2Length = length * 0.35;
      const seg2Geo = new THREE.BoxGeometry(width * 0.9, seg2Length, width * 0.9);
      const seg2 = new THREE.Mesh(seg2Geo, metalMaterial);
      seg2.position.y = seg2Length / 2;
      joint2Group.add(seg2);

      // Joint 3 (Tip Joint)
      const joint3Group = new THREE.Group();
      joint3Group.position.y = seg2Length;

      const knuckle3 = new THREE.Mesh(knuckleGeo, jointMaterial);
      knuckle3.scale.set(0.8, 0.8, 0.8);
      joint3Group.add(knuckle3);

      // Segment 3 (Tip Phalanx)
      const seg3Length = length * 0.2;
      const seg3Geo = new THREE.BoxGeometry(width * 0.8, seg3Length, width * 0.8);
      const seg3 = new THREE.Mesh(seg3Geo, metalMaterial);
      seg3.position.y = seg3Length / 2;
      joint3Group.add(seg3);

      // Nesting hierarchy for forward kinematics/natural curling
      joint2Group.add(joint3Group);
      fingerRoot.add(joint2Group);
      
      handGroup.add(fingerRoot);

      return {
        root: fingerRoot,
        joint1: fingerRoot,
        joint2: joint2Group,
        joint3: joint3Group,
        isThumb
      };
    }

    // Construct 5 fingers
    const fingers = {
      thumb: createFinger(-0.85, -0.4, 1.0, 0.26, true),
      index: createFinger(-0.55, 0.3, 1.4, 0.22),
      middle: createFinger(-0.18, 0.34, 1.5, 0.22),
      ring: createFinger(0.18, 0.3, 1.4, 0.21),
      pinky: createFinger(0.55, 0.24, 1.1, 0.19)
    };

    // Make thumb rotate outward a bit at base
    fingers.thumb.root.rotation.z = -0.55;

    // --- ANIMATION INTERPOLATION VARIABLES ---
    // Target angles for each finger segment
    const targetAngles = {
      thumb: { rx1: 0, rx2: 0, rz: -0.55 },
      index: { rx1: 0, rx2: 0, rx3: 0, rz: 0 },
      middle: { rx1: 0, rx2: 0, rx3: 0, rz: 0 },
      ring: { rx1: 0, rx2: 0, rx3: 0, rz: 0 },
      pinky: { rx1: 0, rx2: 0, rx3: 0, rz: 0 }
    };

    // Current angles for smooth LERP
    const currentAngles = {
      thumb: { rx1: 0, rx2: 0, rz: -0.55 },
      index: { rx1: 0, rx2: 0, rx3: 0, rz: 0 },
      middle: { rx1: 0, rx2: 0, rx3: 0, rz: 0 },
      ring: { rx1: 0, rx2: 0, rx3: 0, rz: 0 },
      pinky: { rx1: 0, rx2: 0, rx3: 0, rz: 0 }
    };

    let animationFrameId;
    let clock = new THREE.Clock();

    // --- GAME SHAPES DEFINITION ---
    function setTargetHandShape() {
      // Shaking is always a closed fist (Rock)
      const currentWeapon = isShaking ? 'rock' : weapon;

      if (currentWeapon === 'rock') {
        // --- CLOSED FIST ---
        targetAngles.index = { rx1: 1.4, rx2: 1.5, rx3: 1.0, rz: 0 };
        targetAngles.middle = { rx1: 1.4, rx2: 1.5, rx3: 1.0, rz: 0 };
        targetAngles.ring = { rx1: 1.4, rx2: 1.5, rx3: 1.0, rz: 0 };
        targetAngles.pinky = { rx1: 1.4, rx2: 1.5, rx3: 1.0, rz: 0 };
        targetAngles.thumb = { rx1: 0.9, rx2: 1.0, rz: 0.5 }; // Curled over fingers
      } 
      else if (currentWeapon === 'scissors') {
        // --- SCISSORS (V SIGN) ---
        targetAngles.index = { rx1: 0, rx2: 0, rx3: 0, rz: -0.25 }; // index straight, spread left
        targetAngles.middle = { rx1: 0, rx2: 0, rx3: 0, rz: 0.25 };  // middle straight, spread right
        targetAngles.ring = { rx1: 1.4, rx2: 1.5, rx3: 1.0, rz: 0 };
        targetAngles.pinky = { rx1: 1.4, rx2: 1.5, rx3: 1.0, rz: 0 };
        targetAngles.thumb = { rx1: 1.0, rx2: 1.1, rz: 0.7 };
      } 
      else if (currentWeapon === 'paper') {
        // --- OPEN PALM ---
        targetAngles.index = { rx1: -0.1, rx2: 0, rx3: 0, rz: -0.06 };
        targetAngles.middle = { rx1: -0.1, rx2: 0, rx3: 0, rz: 0 };
        targetAngles.ring = { rx1: -0.1, rx2: 0, rx3: 0, rz: 0.05 };
        targetAngles.pinky = { rx1: -0.1, rx2: 0, rx3: 0, rz: 0.12 };
        targetAngles.thumb = { rx1: 0.1, rx2: 0.1, rz: -0.85 }; // Thumb stretched wide
      } 
      else {
        // --- IDLE RELAXED PALM ---
        targetAngles.index = { rx1: 0.15, rx2: 0.15, rx3: 0.1, rz: 0 };
        targetAngles.middle = { rx1: 0.15, rx2: 0.15, rx3: 0.1, rz: 0 };
        targetAngles.ring = { rx1: 0.15, rx2: 0.15, rx3: 0.1, rz: 0 };
        targetAngles.pinky = { rx1: 0.15, rx2: 0.15, rx3: 0.1, rz: 0 };
        targetAngles.thumb = { rx1: 0.45, rx2: 0.35, rz: -0.45 };
      }
    }

    // --- ANIMATION LOOP ---
    const tick = () => {
      const time = clock.getElapsedTime();

      // Refresh targets based on state
      setTargetHandShape();

      // Lerp helper
      const lerp = (start, end, amt) => start + (end - start) * amt;
      const lerpSpeed = 0.15; // Smooth interpolation speed

      // Smoothly animate each finger segment
      Object.keys(fingers).forEach((key) => {
        const finger = fingers[key];
        const target = targetAngles[key];
        const current = currentAngles[key];

        // Base knuckle rotation
        current.rx1 = lerp(current.rx1, target.rx1, lerpSpeed);
        finger.joint1.rotation.x = current.rx1;

        if (finger.isThumb) {
          current.rz = lerp(current.rz, target.rz, lerpSpeed);
          finger.root.rotation.z = current.rz;

          current.rx2 = lerp(current.rx2, target.rx2, lerpSpeed);
          finger.joint2.rotation.z = current.rx2; // thumb middle joint curls on z-ish
        } else {
          current.rz = lerp(current.rz, target.rz, lerpSpeed);
          finger.root.rotation.z = current.rz;

          current.rx2 = lerp(current.rx2, target.rx2, lerpSpeed);
          finger.joint2.rotation.x = current.rx2;

          current.rx3 = lerp(current.rx3, target.rx3, lerpSpeed);
          finger.joint3.rotation.x = current.rx3;
        }
      });

      // --- SHAKING / IDLE MOVEMENTS ---
      if (isShaking) {
        // High-frequency battle shake
        handGroup.position.y = Math.sin(time * 22) * 0.45 - 0.2;
        handGroup.position.x = Math.cos(time * 22) * 0.06;
        handGroup.rotation.z = Math.sin(time * 22) * 0.15;
      } else {
        // Return to center and breathe slowly
        handGroup.position.y = lerp(handGroup.position.y, Math.sin(time * 2) * 0.08, 0.1);
        handGroup.position.x = lerp(handGroup.position.x, 0, 0.1);
        handGroup.rotation.z = lerp(handGroup.rotation.z, 0, 0.1);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    // --- RESIZE HANDLER ---
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      palmGeo.dispose();
      metalMaterial.dispose();
      jointMaterial.dispose();
    };
  }, [weapon, isShaking, colorTheme]);

  return (
    <div 
      ref={mountRef} 
      className={`w-full h-44 md:h-56 flex items-center justify-center overflow-hidden cursor-default ${className}`}
      style={{ perspective: '1000px' }}
    />
  );
}

export default ThreeDHand;
