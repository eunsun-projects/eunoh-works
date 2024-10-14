'use client';

import styles from '@/app/(public)/works/viewer/viewer.module.css';
import { ViewerData } from '@/types/viwer.type';
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
  constructor(canvasRef: HTMLDivElement, viewerData: ViewerData[]) {
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
    this.selected = 0;
    const fixedWidth = window.innerWidth;
    const fixedHeight = window.innerHeight;
    this.fixedWidth = fixedWidth;
    this.fixedHeight = fixedHeight;

    /************* renderer ***************/
    const renderer = new THREE.WebGLRenderer({ antialias: true }); //canvas : canvas,
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(fixedWidth, fixedHeight);
    renderer.setClearColor(0xffffff, 1);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
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
    this.isMobile() ? this.camera.position.set(0, 2, 17) : this.camera.position.set(0, 2, 29);
    this.camera.lookAt(0, 0, 0);
    this.camera.updateProjectionMatrix();

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
    this.setupModel(this.viewerData[0]);
    this.setupLight();
    this.setupControls();
    this.setupEffects();
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
    this.pointLight.position.set(0, 20, 13);
    this.pointLight.castShadow = true; // default false
    this.pointLight.shadow.radius = 6; // 그림자 반경
    this.pointLight.shadow.mapSize.width = 1024; // 2x 그림자 품질 조정
    this.pointLight.shadow.mapSize.height = 1024; // 2x
    this.pointLight.shadow.camera.near = 1; // default
    this.pointLight.shadow.camera.far = 10000; // default
    this.scene.add(this.hemiLight);
    this.scene.add(this.pointLight);
  }
  setupModel(model: ViewerData) {
    const overlay = document.querySelector(`.${styles.temporal}`) as HTMLDivElement;
    const loadDiv = document.querySelector(`.${styles.xyzLoading}`) as HTMLDivElement;
    this.loader.load(
      model.objurl,
      (gltf) => {
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const size = box.getSize(new THREE.Vector3());
        const scaleFactor = 6 / Math.max(size.x, size.y, size.z);
        gltf.scene.scale.set(scaleFactor, scaleFactor, scaleFactor);
        gltf.scene.rotation.y = -1.7;
        gltf.scene.position.set(0, -6, 0); //0, -3, 17
        this.objGroup = gltf.scene; // 그룹 참조 저장 회전 등을 위해
        gltf.scene.name = model.nick;
        this.scene.add(gltf.scene);

        gltf.scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.castShadow = true; // traverse 돌려서 mesh 인 애들 전부 castshadow
            object.receiveShadow = true;

            // wireframe helper
            const wireframeGeometry = new THREE.WireframeGeometry(object.geometry);
            const wireframeMaterial = new THREE.LineBasicMaterial({
              color: 0xff0000,
            });
            const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
            wireframe.visible = false;
            object.add(wireframe);

            this.originalMaterial = object.material; //  머티리얼 복사
            this.imageMap = object.material.map; // 이미지 맵 복사
            this.baseMesh = object; // 메쉬 복사
            this.wireframe = wireframe; // 와이어프레임 복사
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
          loadDiv.innerHTML = `error ocurred! restart page!`;
          loadDiv.style.fontSize = '1rem';
        }
        console.error(error);
      },
    );
  }
  setupControls() {
    /************* controls ***************/
    const controls = new OrbitControls(this.camera, this.renderer.domElement);
    controls.target.set(0, -3, 0); // 모델의 위치로 설정
    controls.minDistance = 3.5; // 객체에 가까워질 수 있는 최소 거리
    controls.maxDistance = 8; // 객체에서 멀어질 수 있는 최대 거리
    controls.autoRotate = false;
    controls.update();
    this.controls = controls;
  }
  setupEffects() {
    /************* composer **************/
    const composer = new EffectComposer(this.renderer);

    const glitchPass = new GlitchPass();
    this.glitchPass = glitchPass;

    const renderPixelatedPass = new RenderPixelatedPass(15, this.scene, this.camera);
    this.pixelPass = renderPixelatedPass;

    const effect1 = new ShaderPass(DotScreenShader);
    effect1.uniforms['scale'].value = 3;
    this.dotScreenPass = effect1;

    const genCubeUrls = (prefix: string, postfix: string) => {
      return [
        prefix + 'px' + postfix,
        prefix + 'nx' + postfix,
        prefix + 'py' + postfix,
        prefix + 'ny' + postfix,
        prefix + 'pz' + postfix,
        prefix + 'nz' + postfix,
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

    const renderPass = new RenderPass(this.scene, this.camera);
    renderPass.clear = false;
    composer.addPass(renderPass);

    this.composer = composer;
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
    rightIcon.forEach((e) => {
      if (e.classList.value.includes(styles.xyzon)) e.classList.remove(styles.xyzon);
    });
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
    this.selected = nextData;
    if (nextData >= this.viewerData.length) return;
    this.modelDispose(this.scene);
    this.setupModel(this.viewerData[nextData]);
  }
  prev() {
    const prevData = this.selected - 1;
    this.selected = prevData;
    if (prevData < 0) return;
    this.modelDispose(this.scene);
    this.setupModel(this.viewerData[prevData]);
  }
  selectedChange(num: number) {
    this.selected = num;
    this.modelDispose(this.scene);
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

    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.composer?.setSize(width, height);
  }
  render() {
    if (!this.running) return;
    if (this.rotateObject && this.objGroup) this.objGroup.rotation.y += -0.001;
    this.composer?.render();
  }
  destroy() {
    this.running = false;
    this.renderer.dispose();
    this.modelDispose(this.scene);
  }
  modelDispose(scene: THREE.Scene) {
    this.objGroup?.removeFromParent();
    scene.traverse((object) => {
      //Geometry 삭제
      if (object instanceof THREE.Mesh && object.geometry) {
        object.geometry.dispose();
        console.log('geo disposed!');
      }
      // Material 삭제
      if (object instanceof THREE.Mesh && object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((material: THREE.Material) => this.disposeMaterial(material));
          console.log('material array disposed!');
        } else {
          this.disposeMaterial(object.material);
          console.log('material disposed!');
        }
      }
    });
  }
  disposeMaterial(material: THREE.Material) {
    // 텍스처 삭제
    if (material instanceof THREE.MeshBasicMaterial && material.map) material.map.dispose();
    if (material instanceof THREE.MeshPhongMaterial && material.lightMap)
      material.lightMap.dispose();
    if (material instanceof THREE.MeshPhongMaterial && material.bumpMap) material.bumpMap.dispose();
    if (material instanceof THREE.MeshPhongMaterial && material.normalMap)
      material.normalMap.dispose();
    if (material instanceof THREE.MeshPhongMaterial && material.specularMap)
      material.specularMap.dispose();
    if (material instanceof THREE.MeshPhysicalMaterial && material.envMap)
      material.envMap.dispose();
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
    viewIcon.forEach((e) => {
      e.classList.remove(styles.xyzon);
    });
  }
  xyzonEffectsRemove() {
    const effectsIcon = document.querySelectorAll('.xyzeffects');
    effectsIcon.forEach((e) => {
      e.classList.remove(styles.xyzon);
    });
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
