<script lang="ts">
  import { untrack } from "svelte";
  import type { Attachment } from "svelte/attachments";
  // @ts-expect-error ogl's index.d.ts omits .js extensions, so NodeNext can't resolve
  import { Camera, Mesh, Program, Renderer, Texture, Transform, Triangle, Vec2 } from "ogl";

  interface Props {
    /**
     * The image source URL.
     */
    image: string;
    /**
     * Initial grid size for the pixelation effect.
     * @default 6.0
     */
    initialGridSize?: number;
    /**
     * Duration of each step in the depixelation animation, in milliseconds.
     * @default 150
     */
    stepDuration?: number;
    /**
     * Hold the depixelation at this step; set to `undefined` to resume.
     */
    pauseStep?: number;
    /**
     * Called when the depixelation finishes and the image is shown sharp.
     */
    oncomplete?: () => void;
  }

  let { image, initialGridSize = 6.0, stepDuration = 150, pauseStep, oncomplete }: Props = $props();
  let uid: string = $props.id();

  type UniformState = {
    uTexture: { value: Texture };
    uResolution: { value: Vec2 };
    uTextureSize: { value: Vec2 };
    uGridSize: { value: number };
    uIsDone: { value: number };
  };

  type RuntimeConfig = {
    initialGridSize: number;
    stepDuration: number;
  };

  let setImageSource = $state<(source: string) => void>();
  let setRuntimeConfig = $state<(config: RuntimeConfig) => void>();

  const vertexShader = `
		attribute vec2 uv;
		attribute vec2 position;
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = vec4(position, 0.0, 1.0);
		}
	`;

  const fragmentShader = `
		precision highp float;

		uniform sampler2D uTexture;
		uniform vec2 uResolution;
		uniform vec2 uTextureSize;
		uniform float uGridSize;
		uniform float uIsDone;
		varying vec2 vUv;

		vec2 getContainUV(vec2 uv, vec2 textureSize) {
			vec2 safeTexture = max(textureSize, vec2(1.0));
			vec2 s = uResolution / safeTexture;
			float scale = min(s.x, s.y);
			vec2 scaledSize = safeTexture * scale;
			vec2 offset = (uResolution - scaledSize) * 0.5;
			return (uv * uResolution - offset) / scaledSize;
		}

		void main() {
			vec2 containUv = getContainUV(vUv, uTextureSize);
			// letterbox stays transparent
			if (any(lessThan(containUv, vec2(0.0))) || any(greaterThan(containUv, vec2(1.0)))) discard;

			// grid in image space, so edges don't snap to screen cells
			vec2 t = max(uTextureSize, vec2(1.0));
			vec2 grid = vec2(uGridSize * t.x / t.y, uGridSize);
			vec2 pixelatedUv = floor(containUv * grid) / grid + (0.5 / grid);

			vec2 finalUv = mix(pixelatedUv, containUv, clamp(uIsDone, 0.0, 1.0));
			gl_FragColor = texture2D(uTexture, finalUv);
		}
	`;

  $effect(() => {
    if (!setImageSource) return;
    setImageSource(image);
  });

  $effect(() => {
    if (!setRuntimeConfig) return;
    setRuntimeConfig({ initialGridSize, stepDuration });
  });

  const setupScene = (targetCanvas: HTMLCanvasElement) => {
    const renderer = new Renderer({
      canvas: targetCanvas,
      alpha: true,
      // transparent letterbox: avoids gray fringe at image edges when the canvas is resampled
      premultipliedAlpha: true,
      dpr: typeof window !== "undefined" ? window.devicePixelRatio : 1
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    targetCanvas.style.width = "100%";
    targetCanvas.style.height = "100%";

    const camera = new Camera(gl);
    camera.position.z = 1;

    const scene = new Transform();
    const geometry = new Triangle(gl);

    const imageTexture = new Texture(gl, {
      image: new Uint8Array([0, 0, 0, 255]),
      width: 1,
      height: 1,
      format: gl.RGBA,
      type: gl.UNSIGNED_BYTE,
      minFilter: gl.NEAREST,
      magFilter: gl.NEAREST,
      wrapS: gl.CLAMP_TO_EDGE,
      wrapT: gl.CLAMP_TO_EDGE,
      generateMipmaps: false,
      flipY: true
    });

    const resolutionUniform = new Vec2(1, 1);
    const textureSizeUniform = new Vec2(1, 1);
    const localUniforms: UniformState = {
      uTexture: { value: imageTexture },
      uResolution: { value: resolutionUniform },
      uTextureSize: { value: textureSizeUniform },
      uGridSize: { value: Math.max(1, initialGridSize) },
      uIsDone: { value: 0 }
    };

    let currentInitialGridSize = Math.max(1, initialGridSize);
    let currentStepDuration = Math.max(1, stepDuration);
    let currentGridSize = currentInitialGridSize;
    let isDone = false;
    let elapsed = 0;

    const resetState = () => {
      currentGridSize = currentInitialGridSize;
      isDone = false;
      elapsed = 0;
      imageTexture.minFilter = gl.NEAREST;
      imageTexture.magFilter = gl.NEAREST;
      imageTexture.needsUpdate = true;
      localUniforms.uGridSize.value = currentGridSize;
      localUniforms.uIsDone.value = 0;
    };
    setRuntimeConfig = (config) => {
      const nextInitialGridSize = Math.max(1, config.initialGridSize);
      const nextStepDuration = Math.max(1, config.stepDuration);
      const shouldReset = nextInitialGridSize !== currentInitialGridSize || nextStepDuration !== currentStepDuration;

      currentInitialGridSize = nextInitialGridSize;
      currentStepDuration = nextStepDuration;

      if (shouldReset) {
        resetState();
      }
    };

    let imageToken = 0;
    let hasImage = false;
    const loadImage = (source: string) => {
      imageToken += 1;
      const token = imageToken;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.decoding = "async";
      img.onload = () => {
        if (token !== imageToken) return;
        imageTexture.image = img;
        hasImage = true;
        textureSizeUniform.set(img.naturalWidth || img.width || 1, img.naturalHeight || img.height || 1);
        resetState();
      };
      img.src = source;
    };
    setImageSource = loadImage;

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: localUniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false
    });

    const mesh = new Mesh(gl, { geometry, program });
    mesh.setParent(scene);

    let raf = 0;
    let previous = 0;
    const tick = (now: number) => {
      if (targetCanvas.clientHeight === 0 || !hasImage) {
        previous = 0;
        raf = window.requestAnimationFrame(tick);
        return;
      }

      const w = Math.max(1, targetCanvas.clientWidth);
      const h = Math.max(1, targetCanvas.clientHeight);
      const bufW = Math.round(w * renderer.dpr);
      const bufH = Math.round(h * renderer.dpr);
      if (targetCanvas.width !== bufW || targetCanvas.height !== bufH) {
        targetCanvas.width = bufW;
        targetCanvas.height = bufH;
        renderer.width = w;
        renderer.height = h;
        renderer.state.viewport = { x: 0, y: 0, width: null, height: null };
        resolutionUniform.set(bufW, bufH);
      }
      const delta = previous ? now - previous : 0;
      previous = now;

      if (!isDone) {
        elapsed += delta;
        if (pauseStep !== undefined) {
          elapsed = Math.min(elapsed, pauseStep * currentStepDuration);
        }

        const step = Math.floor(elapsed / currentStepDuration);
        const nextGrid = Math.max(1, currentInitialGridSize * Math.pow(2, step));
        currentGridSize = nextGrid;

        if (currentGridSize > resolutionUniform.y) {
          isDone = true;

          if (isDone) {
            oncomplete?.();
          }

          imageTexture.minFilter = gl.LINEAR;
          imageTexture.magFilter = gl.LINEAR;
          imageTexture.needsUpdate = true;
        }
      }

      localUniforms.uGridSize.value = currentGridSize;
      localUniforms.uIsDone.value = isDone ? 1 : 0;

      renderer.render({ scene, camera });
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      mesh.setParent(null);
      setImageSource = undefined;
      setRuntimeConfig = undefined;
      program.remove();
      geometry.remove();
      if (imageTexture.texture) {
        gl.deleteTexture(imageTexture.texture);
      }
    };
  };

  const mountScene: Attachment<HTMLCanvasElement> = (targetCanvas) => untrack(() => setupScene(targetCanvas));
</script>

<canvas id="pixelated-image-scene-{uid}" class="pixelated-image-scene" {@attach mountScene} aria-hidden="true"></canvas>

<style>
  .pixelated-image-scene {
    width: 100%;
    height: 100%;
  }
</style>
