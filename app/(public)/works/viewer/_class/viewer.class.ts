'use client';

import styles from '@/app/(public)/works/viewer/viewer.module.css';
import type { ViewerData } from '@/types/viwer.type';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { RenderPixelatedPass } from 'three/addons/postprocessing/RenderPixelatedPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { DotScreenShader } from 'three/addons/shaders/DotScreenShader.js';

declare global {
  interface Window {
    gc?: () => void;
  }
}

const colors = {
  sun: 0xfdfdf4,
  ired: 0xdcf6fe,
  bulb: 0xffe4c3,
  pin: 0xffffff,
};

export default class ViewerClass {
  loadCounter = 0;
  nowLoading = 0;
  running = true;
  objGroup: THREE.Group | null;
  originalMaterial: THREE.Material | null;
  baseMesh: THREE.Mesh | null;
  imageMap: THREE.Texture | null;
  wireframe: THREE.LineSegments | null;
  rotateObject = false;
  fixedWidth = 0;
  fixedHeight = 0;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  loader: GLTFLoader;
  pointLight: THREE.PointLight;
  sunLight: THREE.DirectionalLight;
  iredLight: THREE.DirectionalLight;
  bulbLight: THREE.DirectionalLight;
  pinLight: THREE.PointLight;
  hemiLight: THREE.HemisphereLight;
  basicMaterial: THREE.MeshBasicMaterial;
  phongMaterial: THREE.MeshPhongMaterial;
  physicalMaterial: THREE.MeshPhysicalMaterial;
  glitchPass: GlitchPass | null;
  pixelPass: RenderPixelatedPass | null;
  dotScreenPass: ShaderPass | null;
  composer: EffectComposer | null;
  cubeMap: THREE.CubeTexture | null;
  pmremGenerator: THREE.PMREMGenerator | null;
  renderPass: RenderPass | null;
  controls: OrbitControls | null;
  canvas: HTMLDivElement | null;
  viewerData: ViewerData[];
  selected: number;
  resizeHandler: (() => void) | null;
  animationId: number | null = null;
  isIdle = false;
  lastFrameTime = 0;
  targetFPS = 30;
  frameInterval = 1000 / 30;
  idleTimer: NodeJS.Timeout | null = null;
  resetIdleTimer!: () => void;
  constructor(canvasRef: HTMLDivElement, viewerData: ViewerData[], selected: number) {
    this.loadCounter = 0;
    this.nowLoading = 0;
    this.running = true; // 디스트로이 시 false 로 변경되는 상태 스테이트
    this.objGroup = null; // isMesh 이면 gltf.scene 을 복사 스테이트
    this.originalMaterial = null; // isMesh 이면 기본 머티리얼 복사하스테이트
    this.baseMesh = null; // isMesh 이면 mesh 를 복사 스테이트
    this.imageMap = null;
    this.wireframe = null;
    this.rotateObject = false; // 오브젝트 로테이션 상태 스테이트
    this.glitchPass = null;
    this.pixelPass = null;
    this.dotScreenPass = null;
    this.composer = null;
    this.cubeMap = null;
    this.pmremGenerator = null;
    this.renderPass = null;
    this.controls = null;
    this.viewerData = viewerData;
    this.canvas = canvasRef;
    this.selected = selected;
    this.resizeHandler = null;
    const fixedWidth = window.innerWidth;
    const fixedHeight = window.innerHeight;
    this.fixedWidth = fixedWidth;
    this.fixedHeight = fixedHeight;

    /************* renderer ***************/
    const isMobile = this.isMobile();
    const pixelRatio = isMobile ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio;
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      powerPreference: isMobile ? 'low-power' : 'high-performance',
      alpha: false,
      stencil: false,
      depth: true,
    });
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(fixedWidth, fixedHeight);
    renderer.setClearColor(0xffffff, 1);
    renderer.shadowMap.enabled = !isMobile;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    if (this.canvas?.firstChild) this.canvas.removeChild(this.canvas.firstChild); // 만약 캔버스에 이미 domElement 요소가 있다면 삭제
    this.canvas?.appendChild(renderer.domElement); // 캔버스에 렌더러 적용
    this.renderer = renderer;

    /************* scene ***************/
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xc7c7c7);
    scene.fog = new THREE.Fog(0xc7c7c7, 10, 30);
    this.scene = scene;

    /************* camera ***************/
    const camera = new THREE.PerspectiveCamera(
      85, // FOV
      this.fixedWidth / this.fixedHeight, // aspect ratio
      1, // near
      10000, // far 10000
    );
    this.camera = camera;
    this.camera.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();
    camera.position.set(0, 2, 10);

    /************* light ***************/
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 3);
    hemiLight.position.set(0, 20, 0);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    const sunLight = new THREE.DirectionalLight(colors.sun, 7);
    sunLight.position.set(0, 20, 0);

    const iredLight = new THREE.DirectionalLight(colors.ired, 7);
    iredLight.position.set(0, 20, 30);

    const bulbLight = new THREE.DirectionalLight(colors.bulb, 12);
    bulbLight.position.set(0, 20, 30);

    const pinLight = new THREE.PointLight(colors.pin, 500, 0);
    pinLight.position.set(0, 2, 10);

    this.pointLight = pointLight;
    this.hemiLight = hemiLight;
    this.sunLight = sunLight;
    this.iredLight = iredLight;
    this.bulbLight = bulbLight;
    this.pinLight = pinLight;

    /************* material ***************/
    // basic material
    const basicMaterial = new THREE.MeshBasicMaterial({ color: 0xfff7e0 });
    this.basicMaterial = basicMaterial;

    // phong material
    const phongMaterial = new THREE.MeshPhongMaterial({
      color: 0x8a8a8a,
    });
    this.phongMaterial = phongMaterial;

    const physicalMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      reflectivity: 0.5,
      transmission: 0.8,
      roughness: 0.2,
      metalness: 0,
      clearcoat: 0.2,
      clearcoatRoughness: 0.25,
      ior: 1.7,
      thickness: 10.0,
    });
    this.physicalMaterial = physicalMaterial;

    /************* shadow ***************/
    const shadowMeshGeo = new THREE.PlaneGeometry(1000, 1000);
    shadowMeshGeo.rotateX(-Math.PI / 2);
    const shadowMeshMat = new THREE.ShadowMaterial();
    shadowMeshMat.opacity = 0.5;
    const shodowMesh = new THREE.Mesh(shadowMeshGeo, shadowMeshMat);
    shodowMesh.position.y = -6;
    shodowMesh.receiveShadow = true;
    this.scene.add(shodowMesh);

    /************* model loader ***************/
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
    loader.setDRACOLoader(dracoLoader);
    this.loader = loader;

    /************ init App **************/
    this.setupModel(viewerData[selected]);
    this.setupLight();
    this.setupControls();
    this.setupEffects();
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Resize 이벤트 리스너 설정
    this.resizeHandler = () => {
      this.resize();
    };
    window.addEventListener('resize', this.resizeHandler);

    // 유휴 상태 감지를 위한 이벤트 리스너
    this.resetIdleTimer = () => {
      this.isIdle = false;
      if (this.idleTimer) clearTimeout(this.idleTimer);
      this.idleTimer = setTimeout(() => {
        this.isIdle = true;
      }, 5000); // 5초 후 유휴 상태
    };

    document.addEventListener('mousemove', this.resetIdleTimer);
    document.addEventListener('touchstart', this.resetIdleTimer);
    document.addEventListener('touchmove', this.resetIdleTimer);

    // 초기 타이머 설정
    this.resetIdleTimer();
  }
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  }
  isAndroid() {
    return /Android/i.test(navigator.userAgent);
  }
  setupLight() {
    this.pointLight.position.set(6, 20, 17);
    const isMobile = this.isMobile();

    if (!isMobile) {
      this.pointLight.castShadow = true;
      this.pointLight.shadow.radius = 2;
      this.pointLight.shadow.mapSize.width = 512;
      this.pointLight.shadow.mapSize.height = 512;
      this.pointLight.shadow.camera.near = 1;
      this.pointLight.shadow.camera.far = 10000;
    } else {
      this.pointLight.castShadow = false;
    }

    this.scene.add(this.hemiLight);
    this.scene.add(this.pointLight);
  }
  setupModel(model: ViewerData) {
    const overlay = document.querySelector(`.${styles.temporal}`) as HTMLDivElement;
    const loadDiv = document.querySelector(`.${styles.xyzLoading}`) as HTMLDivElement;
    const gui = document.querySelector(`.${styles.guiWrapper3d}`) as HTMLDivElement;
    const guiSwipe3d = document.querySelector(`.${styles.guiSwipeEachBox}`) as HTMLDivElement;
    this.loader.load(
      model.objurl,
      (gltf) => {
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const size = box.getSize(new THREE.Vector3());
        const scaleFactor = 6 / Math.max(size.x, size.y, size.z);
        gltf.scene.scale.set(scaleFactor, scaleFactor, scaleFactor);
        gltf.scene.rotation.y = -1.1;
        gltf.scene.position.set(0, -6, 0); //0, -3, 17
        gltf.scene.name = model.nick;
        this.scene.add(gltf.scene);

        const isMobile = this.isMobile();
        gltf.scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (!isMobile) {
              object.castShadow = true;
              object.receiveShadow = true;
            }

            // wireframe helper - 모바일에서는 생성하지 않음

            const wireframeGeometry = new THREE.WireframeGeometry(object.geometry);
            const wireframeMaterial = new THREE.LineBasicMaterial({
              color: 0xff0000,
            });
            const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
            wireframe.visible = false;
            object.add(wireframe);
            this.wireframe = wireframe;

            this.originalMaterial = object.material;
            this.imageMap = object.material.map;
            this.baseMesh = object;
            this.objGroup = gltf.scene;
          }
        });
      },
      (xhr) => {
        const loadCounter = (xhr.loaded / xhr.total) * 100;
        if (overlay && loadDiv) {
          if (loadCounter >= 100) {
            this.nowLoading = 1;
            overlay.style.opacity = '0';
            overlay.style.display = 'none';
            loadDiv.style.display = 'none';
            gui.style.opacity = '1';
            // gui.style.pointerEvents = 'auto';
            // gui.style.touchAction = 'auto';
            guiSwipe3d.style.pointerEvents = 'auto';
            guiSwipe3d.style.touchAction = 'auto';
          } else {
            this.nowLoading = 0;
            loadDiv.style.display = 'flex';
            loadDiv.innerHTML = `Loading.. ${Math.round(loadCounter)}%`;
            overlay.style.transition = `opacity ${loadCounter / 100}s ease-out ${loadCounter / 100}s`;
          }
        }
      },
      (error) => {
        if (loadDiv) {
          loadDiv.innerHTML = 'error ocurred! restart page!';
          loadDiv.style.fontSize = '1rem';
        }
        console.error(error);
      },
    );
  }
  setupControls() {
    // 기존 controls 정리
    if (this.controls) {
      this.controls.dispose();
      this.controls = null;
    }

    /************* controls ***************/
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.target.set(0, -3, 0); // 모델의 위치로 설정
    controls.minDistance = 3.5; // 객체에 가까워질 수 있는 최소 거리
    controls.maxDistance = this.fixedWidth > 768 ? 9 : 29; // 객체에서 멀어질 수 있는 최대 거리
    controls.autoRotate = false;
    controls.update();
    this.controls = controls;
  }
  setupEffects() {
    // 기존 effects 정리
    this.disposeEffects();

    /************* composer **************/
    const composer = new EffectComposer(this.renderer);

    const glitchPass = new GlitchPass();
    this.glitchPass = glitchPass;

    const renderPixelatedPass = new RenderPixelatedPass(5, this.scene, this.camera);
    this.pixelPass = renderPixelatedPass;

    const effect1 = new ShaderPass(DotScreenShader);
    effect1.uniforms.scale.value = 4;
    this.dotScreenPass = effect1;

    if (!this.cubeMap) {
      const genCubeUrls = (prefix: string, postfix: string) => {
        return [
          `${prefix}px${postfix}`,
          `${prefix}nx${postfix}`,
          `${prefix}py${postfix}`,
          `${prefix}ny${postfix}`,
          `${prefix}pz${postfix}`,
          `${prefix}nz${postfix}`,
        ];
      };
      const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
      const ldrUrls = genCubeUrls('/assets/whitecube2/', '.png');
      const envTexture = new THREE.CubeTextureLoader().load(
        ldrUrls,
        (ldrCubeMap: THREE.CubeTexture) => {
          this.physicalMaterial.envMap = pmremGenerator.fromCubemap(envTexture).texture;
          pmremGenerator.dispose();
          this.cubeMap = ldrCubeMap;
        },
      );
    } else if (this.cubeMap) {
      const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
      this.physicalMaterial.envMap = pmremGenerator.fromCubemap(this.cubeMap).texture;
      pmremGenerator.dispose();
    }

    const renderPass = new RenderPass(this.scene, this.camera);
    renderPass.clear = false;
    composer.addPass(renderPass);
    this.composer = composer;
  }

  disposeEffects() {
    // Composer와 passes 정리
    if (this.composer) {
      this.composer.dispose();
      this.composer = null;
    }

    if (this.glitchPass) {
      this.glitchPass.dispose?.();
      this.glitchPass = null;
    }

    if (this.pixelPass) {
      this.pixelPass.dispose?.();
      this.pixelPass = null;
    }

    if (this.dotScreenPass) {
      this.dotScreenPass.dispose?.();
      this.dotScreenPass = null;
    }

    if (this.renderPass) {
      this.renderPass.dispose?.();
      this.renderPass = null;
    }

    // CubeMap 정리 (destroy 시에만 정리)
    if (this.cubeMap) {
      this.cubeMap.dispose();
      this.cubeMap = null;
    }
  }
  removeLight() {
    if (this.sunLight || this.iredLight || this.bulbLight || this.pinLight) {
      this.scene.remove(this.sunLight);
      this.scene.remove(this.iredLight);
      this.scene.remove(this.bulbLight);
      this.scene.remove(this.pinLight);
    }
  }
  removeLightPlus() {
    this.removeLight();
    const rightIcon = document.querySelectorAll('.xyzright');
    for (const e of Array.from(rightIcon)) {
      if (e.classList.value.includes(styles.xyzon)) e.classList.remove(styles.xyzon);
    }
  }
  lightModeChange(target: string) {
    switch (target) {
      case 'wb_sunny':
        this.removeLight();
        this.scene.add(this.sunLight);
        break;
      case 'wb_iridescent':
        this.removeLight();
        this.scene.add(this.iredLight);
        break;
      case 'lightbulb':
        this.removeLight();
        this.scene.add(this.bulbLight);
        break;
      case 'highlight':
        this.removeLight();
        this.scene.add(this.pinLight);
        break;
    }
  }
  next() {
    const nextData = this.selected + 1;
    if (nextData >= this.viewerData.length) return;
    this.selected = nextData;
    this.modelDispose();
    // 강제 가비지 컬렉션 (브라우저가 지원하는 경우)
    if (window.gc) {
      window.gc();
    }
    this.setupModel(this.viewerData[nextData]);
  }
  prev() {
    const prevData = this.selected - 1;
    if (prevData < 0) return;
    this.selected = prevData;
    this.modelDispose();
    // 강제 가비지 컬렉션 (브라우저가 지원하는 경우)
    if (window.gc) {
      window.gc();
    }
    this.setupModel(this.viewerData[prevData]);
  }
  selectedChange(num: number) {
    this.selected = num;
    this.modelDispose();
    // 강제 가비지 컬렉션 (브라우저가 지원하는 경우)
    if (window.gc) {
      window.gc();
    }
    this.setupModel(this.viewerData[num]);
  }
  resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;

    if (this.camera instanceof THREE.PerspectiveCamera) {
      // PerspectiveCamera
      this.camera.aspect = aspect;
    } else if (this.camera instanceof THREE.OrthographicCamera) {
      // OrthographicCamera
      this.camera.left = aspect * -1;
      this.camera.right = aspect * 1;
    }
    if (this.controls) {
      this.controls.maxDistance = this.fixedWidth > 768 ? 9 : 29; // 객체에서 멀어질 수 있는 최대 거리
    }
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.composer?.setSize(width, height);
  }
  render() {
    if (!this.running || !this.renderer || !this.scene || !this.camera || !this.composer) return;

    const now = performance.now();
    const delta = now - this.lastFrameTime;

    // FPS 제한 (모바일에서 배터리 절약)
    if (delta < this.frameInterval) return;

    this.lastFrameTime = now;

    // 유휴 상태 감지 (사용자 상호작용이 없을 때 렌더링 빈도 줄이기)
    if (this.isIdle && !this.rotateObject) {
      // 유휴 상태에서는 1FPS로 제한
      if (delta < 1000) return;
    }

    if (this.rotateObject && this.objGroup) {
      this.objGroup.rotation.y += -0.001;
    }

    this.composer.render();
  }
  destroy() {
    this.running = false;

    // 애니메이션 프레임 정리
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }

    // 유휴 타이머 정리
    if (this.idleTimer) {
      clearTimeout(this.idleTimer);
    }

    this.disposeEffects();

    // Controls 정리
    if (this.controls) {
      this.controls.dispose();
      this.controls = null;
    }

    // Event Listeners 정리
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
      this.resizeHandler = null;
    }

    // 모든 유휴 이벤트 리스너 정리
    document.removeEventListener('mousemove', this.resetIdleTimer);
    document.removeEventListener('touchstart', this.resetIdleTimer);
    document.removeEventListener('touchmove', this.resetIdleTimer);

    this.renderer.dispose();
    this.modelDispose();
  }
  modelDispose() {
    if (this.objGroup) {
      this.objGroup.removeFromParent();
      this.scene.remove(this.objGroup);
    }
    this.scene.traverse((object) => {
      //Geometry 삭제
      if (object instanceof THREE.Mesh && object.geometry) {
        object.geometry.dispose();
        console.log('geo disposed!');
      }

      // Wireframe geometry 정리
      if (object instanceof THREE.LineSegments && object.geometry) {
        object.geometry.dispose();
        console.log('wireframe geo disposed!');
      }

      // Material 삭제
      if (object instanceof THREE.Mesh && object.material) {
        if (Array.isArray(object.material)) {
          for (const material of object.material) {
            this.disposeMaterial(material);
          }
          console.log('material array disposed!');
        } else {
          this.disposeMaterial(object.material);
          console.log('material disposed!');
        }
      }

      // Wireframe material 정리
      if (object instanceof THREE.LineSegments && object.material) {
        if (Array.isArray(object.material)) {
          for (const material of object.material) {
            this.disposeMaterial(material);
          }
          console.log('wireframe material array disposed!');
        } else {
          this.disposeMaterial(object.material);
          console.log('wireframe material disposed!');
        }
      }
    });
  }
  disposeMaterial(material: THREE.Material) {
    // 모든 텍스처 타입 정리
    const textureProperties = [
      'map',
      'lightMap',
      'bumpMap',
      'normalMap',
      'specularMap',
      'envMap',
      'aoMap',
      'emissiveMap',
      'metalnessMap',
      'roughnessMap',
      'displacementMap',
      'alphaMap',
      'clearcoatMap',
      'clearcoatNormalMap',
      'clearcoatRoughnessMap',
      'iridescenceMap',
      'iridescenceThicknessMap',
      'sheenColorMap',
      'sheenRoughnessMap',
      'specularIntensityMap',
      'specularColorMap',
      'thicknessMap',
      'transmissionMap',
    ];

    for (const prop of textureProperties) {
      const texture = (material as unknown as Record<string, unknown>)[prop];
      if (texture && typeof texture === 'object' && 'dispose' in texture) {
        (texture as THREE.Texture).dispose();
      }
    }

    // Material 자체 삭제
    material.dispose();
  }
  toggleRotation(target: HTMLElement | SVGElement) {
    if (target.classList.value.includes(styles.xyzon)) {
      target.classList.remove(styles.xyzon);
      this.rotateObject = false;
    } else {
      target.classList.add(styles.xyzon);
      this.rotateObject = true;
    }
  }
  xyzonViewRemove() {
    const viewIcon = document.querySelectorAll('.xyzview');
    for (const e of Array.from(viewIcon)) {
      e.classList.remove(styles.xyzon);
    }
  }
  xyzonEffectsRemove() {
    const effectsIcon = document.querySelectorAll('.xyzeffects');
    for (const e of Array.from(effectsIcon)) {
      e.classList.remove(styles.xyzon);
    }
  }
  toggleWireframe(target: HTMLElement | SVGElement) {
    if (target.classList.value.includes(styles.xyzon)) {
      this.xyzonViewRemove();
      if (this.wireframe) this.wireframe.visible = false;
      if (this.baseMesh)
        this.baseMesh.material = this.originalMaterial ? this.originalMaterial : this.basicMaterial;
    } else {
      this.xyzonViewRemove();
      target.classList.add(styles.xyzon);
      if (this.wireframe) this.wireframe.visible = true;
      if (this.baseMesh) this.baseMesh.material = this.basicMaterial;
      if (this.scene) this.scene.background = new THREE.Color(0xc7c7c7);
    }
  }
  toggleMap(target: HTMLElement | SVGElement) {
    if (target.classList.value.includes(styles.xyzon)) {
      this.xyzonViewRemove();
      if (this.baseMesh)
        this.baseMesh.material = this.originalMaterial ? this.originalMaterial : this.basicMaterial;
    } else {
      this.xyzonViewRemove();
      target.classList.add(styles.xyzon);
      if (this.wireframe) this.wireframe.visible = false;
      if (this.baseMesh) this.baseMesh.material = this.phongMaterial;
      if (this.scene) this.scene.background = new THREE.Color(0xc7c7c7);
    }
  }
  toggleReflection(target: HTMLElement | SVGElement) {
    if (target.classList.value.includes(styles.xyzon)) {
      this.xyzonViewRemove();
      if (this.baseMesh)
        this.baseMesh.material = this.originalMaterial ? this.originalMaterial : this.basicMaterial;
      if (this.scene) this.scene.background = new THREE.Color(0xc7c7c7);
    } else {
      this.xyzonViewRemove();
      this.removeLightPlus();
      target.classList.add(styles.xyzon);
      if (this.wireframe) this.wireframe.visible = false;
      if (this.baseMesh) this.baseMesh.material = this.physicalMaterial;
      if (this.scene) this.scene.background = this.cubeMap; // 배경 적용!
    }
  }
  togglePixelate(target: HTMLElement | SVGElement) {
    if (target.classList.value.includes(styles.xyzon)) {
      this.xyzonEffectsRemove();
      if (this.composer) {
        while (this.composer.passes.length > 1) {
          const pass = this.composer.passes[1];
          this.composer.removePass(pass);
        }
      }
      if (this.hemiLight) this.hemiLight.intensity = 3;
    } else {
      this.xyzonEffectsRemove();
      target.classList.add(styles.xyzon);
      if (this.composer && this.pixelPass) {
        while (this.composer.passes.length > 1) {
          const pass = this.composer.passes[1];
          this.composer.removePass(pass);
        }
        this.composer.addPass(this.pixelPass);
      }
      if (this.hemiLight) this.hemiLight.intensity = 10;
    }
  }
  toggleGlitch(target: HTMLElement | SVGElement) {
    if (target.classList.value.includes(styles.xyzon)) {
      this.xyzonEffectsRemove();
      if (this.composer) {
        while (this.composer.passes.length > 1) {
          const pass = this.composer.passes[1];
          this.composer.removePass(pass);
        }
      }
      if (this.hemiLight) this.hemiLight.intensity = 3;
    } else {
      this.xyzonEffectsRemove();
      target.classList.add(styles.xyzon);
      if (this.composer && this.glitchPass) {
        while (this.composer.passes.length > 1) {
          const pass = this.composer.passes[1];
          this.composer.removePass(pass);
        }
        this.composer.addPass(this.glitchPass);
      }
      if (this.hemiLight) this.hemiLight.intensity = 10;
    }
  }
  toggleDotScreen(target: HTMLElement | SVGElement) {
    if (target.classList.value.includes(styles.xyzon)) {
      this.xyzonEffectsRemove();
      if (this.composer) {
        while (this.composer.passes.length > 1) {
          const pass = this.composer.passes[1];
          this.composer.removePass(pass);
        }
      }
      if (this.hemiLight) this.hemiLight.intensity = 3;
    } else {
      this.xyzonEffectsRemove();
      target.classList.add(styles.xyzon);
      if (this.composer && this.dotScreenPass) {
        while (this.composer.passes.length > 1) {
          const pass = this.composer.passes[1];
          this.composer.removePass(pass);
        }
        this.composer.addPass(this.dotScreenPass);
      }
      if (this.hemiLight) this.hemiLight.intensity = 3;
    }
  }
}
