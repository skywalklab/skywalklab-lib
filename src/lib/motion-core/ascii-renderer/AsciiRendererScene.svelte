<script lang="ts">
  import { untrack } from "svelte";
  import type { Attachment } from "svelte/attachments";
  // @ts-expect-error ogl's index.d.ts omits .js extensions, so NodeNext can't resolve
  import { Camera, Mesh, Program, Renderer, Texture, Transform, Triangle, Vec2, Vec3 } from "ogl";
  import { toLinearRgb } from "../helpers/color.js";

  interface Props {
    /**
     * The image source URL.
     */
    image: string;
    /**
     * Grid density for the ASCII effect.
     * @default 25.0
     */
    density?: number;
    /**
     * Intensity of the ASCII character generation threshold.
     * @default 3.0
     */
    strength?: number;
    /**
     * Foreground color of the ASCII characters.
     * @default "#00ff00"
     */
    color?: string;
    /**
     * Background color.
     * @default "#17181A"
     */
    backgroundColor?: string;
    /**
     * Animated horizontal tear and flickering scanline.
     * @default true
     */
    glitch?: boolean;
    /**
     * Glitch animation speed; 1 is the original, lower is slower.
     * @default 1
     */
    glitchSpeed?: number;
    /**
     * Fill the space around a non-matching image with the background color, instead of leaving it transparent.
     * @default false
     */
    fillLetterbox?: boolean;
    /**
     * How the image fits the canvas: `contain` shows all of it, `cover` fills the canvas and crops the overflow.
     * @default "contain"
     */
    fit?: "contain" | "cover";
    /**
     * Vertical alignment when the image doesn't fill the canvas height (`contain`) or overflows it (`cover`).
     * @default "center"
     */
    position?: "top" | "center" | "bottom";
  }

  let {
    image,
    density = 25.0,
    strength = 3.0,
    color = "#00ff00",
    backgroundColor = "#17181A",
    glitch = true,
    glitchSpeed = 1,
    fillLetterbox = false,
    fit = "contain",
    position = "center"
  }: Props = $props();

  type UniformState = {
    uTime: { value: number };
    uResolution: { value: Vec2 };
    uTexture: { value: Texture };
    uContainScale: { value: Vec2 };
    uContainOffset: { value: Vec2 };
    uDensity: { value: number };
    uStrength: { value: number };
    uGlitch: { value: number };
    uColor: { value: Vec3 };
    uBackgroundColor: { value: Vec3 };
    uFillLetterbox: { value: number };
  };

  let uniforms = $state.raw<UniformState>();
  let setImageSource = $state<(source: string) => void>();

  const resolutionUniform = new Vec2(1, 1);
  const containScaleUniform = new Vec2(1, 1);
  const containOffsetUniform = new Vec2(0, 0);
  const colorUniform = new Vec3(0, 1, 0);
  const backgroundColorUniform = new Vec3(23 / 255, 24 / 255, 26 / 255);

  let canvasWidth = 1;
  let canvasHeight = 1;
  let imageWidth = 1;
  let imageHeight = 1;

  const updateContainUniforms = () => {
    if (canvasWidth <= 0 || canvasHeight <= 0 || imageWidth <= 0 || imageHeight <= 0) {
      return;
    }

    const screenAspect = canvasWidth / canvasHeight;
    const imageAspect = imageWidth / imageHeight;

    let scaleX = 1;
    let scaleY = 1;
    let offsetX = 0;
    let offsetY = 0;

    // contain scales up the axis with spare room; cover scales down the overflowing one
    if (screenAspect > imageAspect !== (fit === "cover")) {
      scaleX = screenAspect / imageAspect;
      offsetX = (1 - scaleX) * 0.5;
    } else {
      scaleY = imageAspect / screenAspect;
      // uv y runs bottom to top, so top aligns at 1
      offsetY = (1 - scaleY) * (position === "top" ? 1 : position === "bottom" ? 0 : 0.5);
    }

    containScaleUniform.set(scaleX, scaleY);
    containOffsetUniform.set(offsetX, offsetY);
  };

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

		uniform float uTime;
		uniform vec2 uResolution;
		uniform sampler2D uTexture;
		uniform vec2 uContainScale;
		uniform vec2 uContainOffset;
		uniform float uDensity;
		uniform float uStrength;
		uniform float uGlitch;
		uniform vec3 uColor;
		uniform vec3 uBackgroundColor;
		uniform float uFillLetterbox;

		varying vec2 vUv;

		vec2 mirrored(vec2 value) {
			vec2 m = mod(value, 2.0);
			return mix(m, 2.0 - m, step(1.0, m));
		}

		float digit(vec2 p, float intensity){
			p = (fract(p) - 0.5) * 1.2 + 0.5;

			if (p.x < 0.0 || p.x > 1.0 || p.y < 0.0 || p.y > 1.0) return 0.0;

			float x = fract(p.x * 5.0);
			float y = fract((1.0 - p.y) * 5.0);
			int i = int(floor((1.0 - p.y) * 5.0));
			int j = int(floor(p.x * 5.0));
			int n = (i-2)*(i-2)+(j-2)*(j-2);
			float f = float(n)/16.0;
			float isOn = smoothstep(0.1, 0.2, intensity - f);
			return isOn * (0.2 + y*4.0/5.0) * (0.75 + x/4.0);
		}

		float onOff(float a, float b, float c) {
			return step(c, sin(uTime + a*cos(uTime*b)));
		}

		float displace(vec2 look) {
			float y = (look.y - mod(uTime/4.0, 1.0));
			float window = 1.0 / (1.0 + 50.0 * y * y);
			return sin(look.y * 20.0 + uTime)/80.0 * onOff(4.0, 2.0, 0.8) * (1.0 + cos(uTime*60.0)) * window;
		}

		vec3 linearToSrgb(vec3 color) {
			vec3 safe = max(color, vec3(0.0));
			vec3 low = safe * 12.92;
			vec3 high = 1.055 * pow(safe, vec3(1.0 / 2.4)) - 0.055;
			vec3 cutoff = step(vec3(0.0031308), safe);
			return mix(low, high, cutoff);
		}

		void main() {
			vec2 p = vUv;
			float aspect = uResolution.x / max(uResolution.y, 1.0);
			p.x *= aspect;

			vec2 pDisplaced = p;
			pDisplaced.x += displace(p) * 0.5 * uGlitch;

			vec2 grid = vec2(3.0, 1.0) * uDensity;

			vec2 cellIndex = floor(pDisplaced * grid);
			vec2 cellCenterP = (cellIndex + 0.5) / grid;

			vec2 cellCenterUV = cellCenterP;
			cellCenterUV.x /= aspect;

			vec2 cellCenterUVContain = (cellCenterUV * uContainScale) + uContainOffset;
			bool outside = any(lessThan(cellCenterUVContain, vec2(0.0))) || any(greaterThan(cellCenterUVContain, vec2(1.0)));
			// letterbox: transparent, or zero intensity (background color, no glyphs) with uFillLetterbox
			if (outside && uFillLetterbox < 0.5) discard;
			vec3 texColor = outside ? vec3(0.0) : texture2D(uTexture, mirrored(cellCenterUVContain)).rgb;

			float intensity = dot(texColor, vec3(0.299, 0.587, 0.114));
			intensity = pow(intensity, 2.8);

			float bar = mix(1.0, mod(p.y + uTime * 20.0, 1.0) < 0.2 ? 1.4 : 1.0, uGlitch);

			vec2 gridP = pDisplaced * grid;
			float middle = digit(gridP, intensity * 1.3 * uStrength);

			float off = 0.002;
			float sum = 0.0;
			for (float i = -1.0; i < 2.0; i += 1.0) {
				for (float j = -1.0; j < 2.0; j += 1.0) {
					vec2 offsetGridP = gridP + vec2(off * i * grid.x, off * j * grid.y);
					sum += digit(offsetGridP, intensity * 1.3 * uStrength);
				}
			}

			vec3 emission = vec3(0.6) * middle + sum / 15.0 * uColor * bar;
			vec3 finalColor = uBackgroundColor + emission;

			gl_FragColor = vec4(linearToSrgb(finalColor), 1.0);
		}
	`;

  $effect(() => {
    if (!uniforms) return;
    uniforms.uDensity.value = density;
  });

  $effect(() => {
    if (!uniforms) return;
    uniforms.uStrength.value = strength;
  });

  $effect(() => {
    if (!uniforms) return;
    uniforms.uGlitch.value = glitch ? 1 : 0;
  });

  $effect(() => {
    if (!uniforms) return;
    uniforms.uFillLetterbox.value = fillLetterbox ? 1 : 0;
  });

  $effect(() => {
    const [r, g, b] = toLinearRgb(color, [0, 1, 0]);
    colorUniform.set(r, g, b);
  });

  $effect(() => {
    const [r, g, b] = toLinearRgb(backgroundColor, [23 / 255, 24 / 255, 26 / 255]);
    backgroundColorUniform.set(r, g, b);
  });

  $effect(() => {
    if (!setImageSource) return;
    setImageSource(image);
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
      minFilter: gl.LINEAR,
      magFilter: gl.LINEAR,
      wrapS: gl.CLAMP_TO_EDGE,
      wrapT: gl.CLAMP_TO_EDGE,
      generateMipmaps: false,
      flipY: true
    });

    const localUniforms: UniformState = {
      uTime: { value: 0 },
      uResolution: { value: resolutionUniform },
      uTexture: { value: imageTexture },
      uContainScale: { value: containScaleUniform },
      uContainOffset: { value: containOffsetUniform },
      uDensity: { value: density },
      uStrength: { value: strength },
      uGlitch: { value: glitch ? 1 : 0 },
      uColor: { value: colorUniform },
      uBackgroundColor: { value: backgroundColorUniform },
      uFillLetterbox: { value: fillLetterbox ? 1 : 0 }
    };
    uniforms = localUniforms;

    let imageLoadToken = 0;
    let disposed = false;
    // the 1x1 placeholder renders as a background-colored square, so draw nothing until a real image arrives
    let hasImage = false;
    const loadImage = (source: string) => {
      imageLoadToken += 1;
      const token = imageLoadToken;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.decoding = "async";
      img.onload = () => {
        if (disposed || token !== imageLoadToken) return;
        imageTexture.image = img;
        hasImage = true;
        imageWidth = img.naturalWidth || img.width || 1;
        imageHeight = img.naturalHeight || img.height || 1;
        updateContainUniforms();
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

    const mesh = new Mesh(gl, { geometry, program, frustumCulled: false });
    mesh.setParent(scene);

    let raf = 0;
    let previous = 0;
    let appliedFit = `${fit}-${position}`;
    const tick = (now: number) => {
      if (`${fit}-${position}` !== appliedFit) {
        appliedFit = `${fit}-${position}`;
        updateContainUniforms();
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
        localUniforms.uResolution.value.set(w, h);
        canvasWidth = w;
        canvasHeight = h;
        updateContainUniforms();
      }
      const delta = previous ? (now - previous) / 1000 : 0;
      previous = now;
      localUniforms.uTime.value += delta * glitchSpeed;
      if (hasImage) renderer.render({ scene, camera });
      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      disposed = true;
      imageLoadToken += 1;
      window.cancelAnimationFrame(raf);
      mesh.setParent(null);
      setImageSource = undefined;
      program.remove();
      geometry.remove();
      if (imageTexture.texture) gl.deleteTexture(imageTexture.texture);
    };
  };

  const mountScene: Attachment<HTMLCanvasElement> = (targetCanvas) => untrack(() => setupScene(targetCanvas));
</script>

<canvas
  {@attach mountScene}
  class="absolute inset-0 block h-full w-full"
  style="width:100%;height:100%;"
  aria-hidden="true"></canvas>
