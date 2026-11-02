<script lang="ts">
  // https://bgjar.com/
  interface Props {
    /** Color filling the element behind the bars. Sets `--pattern-soundwave-bg-color`. */
    bgColor?: string;
    /** Opacity of the bars, from 0 to 1. Sets `--pattern-soundwave-bar-opacity`. */
    barOpacity?: number;
    /** Thickness of each bar, in SVG units. */
    barWidth?: number;
    /** Shape of each bar's ends. */
    barCap?: "round" | "butt" | "square";
    /** Color of the first set of bars. Sets `--pattern-soundwave-bar-color-1`. */
    barColor1?: string;
    /** Color of the second set of bars. Sets `--pattern-soundwave-bar-color-2`. */
    barColor2?: string;
    /** Color of the third set of bars. Sets `--pattern-soundwave-bar-color-3`. */
    barColor3?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    bgColor = "transparent",
    barOpacity = 1,
    barWidth = 9,
    barCap = "round",
    barColor1 = "var(--accent-analogous-1, cornflowerblue)",
    barColor2 = "var(--accent, lightblue)",
    barColor3 = "var(--accent-analogous-2, paleturquoise)",
    style
  }: Props = $props();
  let uid: string = $props.id();
</script>

<svg
  id="pattern-soundwave-{uid}"
  class="pattern-soundwave"
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
  width="1440"
  height="560"
  preserveAspectRatio="xMinYMin slice"
  viewBox="0 0 1440 560"
  style:--pattern-soundwave-bg-color={bgColor}
  style:--pattern-soundwave-bar-opacity={barOpacity}
  style:--pattern-soundwave-bar-color-1={barColor1}
  style:--pattern-soundwave-bar-color-2={barColor2}
  style:--pattern-soundwave-bar-color-3={barColor3}
  {style}>
  <g stroke-linecap={barCap} stroke-width={barWidth}>
    <path d="M6 171.39 L6 388.61" class="pattern-soundwave--bar-1"></path>
    <path d="M18 210.77 L18 349.23" class="pattern-soundwave--bar-2"></path>
    <path d="M30 111.38 L30 448.62" class="pattern-soundwave--bar-3"></path>
    <path d="M42 146.66 L42 413.34" class="pattern-soundwave--bar-3"></path>
    <path d="M54 100.81 L54 459.19" class="pattern-soundwave--bar-1"></path>
    <path d="M66 44.15 L66 515.86" class="pattern-soundwave--bar-3"></path>
    <path d="M78 16.9 L78 543.1" class="pattern-soundwave--bar-3"></path>
    <path d="M90 246.59 L90 313.42" class="pattern-soundwave--bar-3"></path>
    <path d="M102 185.31 L102 374.69" class="pattern-soundwave--bar-2"></path>
    <path d="M114 69.29 L114 490.71" class="pattern-soundwave--bar-3"></path>
    <path d="M126 62.52 L126 497.48" class="pattern-soundwave--bar-2"></path>
    <path d="M138 36.95 L138 523.05" class="pattern-soundwave--bar-1"></path>
    <path d="M150 115.93 L150 444.07" class="pattern-soundwave--bar-2"></path>
    <path d="M162 62.91 L162 497.1" class="pattern-soundwave--bar-2"></path>
    <path d="M174 217.89 L174 342.11" class="pattern-soundwave--bar-2"></path>
    <path d="M186 235.94 L186 324.06" class="pattern-soundwave--bar-1"></path>
    <path d="M198 147.07 L198 412.93" class="pattern-soundwave--bar-1"></path>
    <path d="M210 153.49 L210 406.51" class="pattern-soundwave--bar-2"></path>
    <path d="M222 196 L222 364" class="pattern-soundwave--bar-1"></path>
    <path d="M234 216.35 L234 343.64" class="pattern-soundwave--bar-1"></path>
    <path d="M246 207.77 L246 352.23" class="pattern-soundwave--bar-1"></path>
    <path d="M258 234.19 L258 325.81" class="pattern-soundwave--bar-2"></path>
    <path d="M270 210.72 L270 349.28" class="pattern-soundwave--bar-3"></path>
    <path d="M282 41.36 L282 518.64" class="pattern-soundwave--bar-3"></path>
    <path d="M294 163.09 L294 396.91" class="pattern-soundwave--bar-1"></path>
    <path d="M306 22.65 L306 537.35" class="pattern-soundwave--bar-1"></path>
    <path d="M318 50.15 L318 509.86" class="pattern-soundwave--bar-2"></path>
    <path d="M330 34.78 L330 525.23" class="pattern-soundwave--bar-1"></path>
    <path d="M342 171.75 L342 388.25" class="pattern-soundwave--bar-3"></path>
    <path d="M354 149.45 L354 410.55" class="pattern-soundwave--bar-3"></path>
    <path d="M366 230.65 L366 329.36" class="pattern-soundwave--bar-2"></path>
    <path d="M378 81.9 L378 478.1" class="pattern-soundwave--bar-3"></path>
    <path d="M390 224.61 L390 335.39" class="pattern-soundwave--bar-1"></path>
    <path d="M402 120.33 L402 439.67" class="pattern-soundwave--bar-1"></path>
    <path d="M414 57.78 L414 502.23" class="pattern-soundwave--bar-2"></path>
    <path d="M426 198.53 L426 361.47" class="pattern-soundwave--bar-3"></path>
    <path d="M438 121.99 L438 438.01" class="pattern-soundwave--bar-2"></path>
    <path d="M450 141.25 L450 418.75" class="pattern-soundwave--bar-2"></path>
    <path d="M462 124.07 L462 435.93" class="pattern-soundwave--bar-2"></path>
    <path d="M474 33.52 L474 526.48" class="pattern-soundwave--bar-1"></path>
    <path d="M486 109.66 L486 450.35" class="pattern-soundwave--bar-3"></path>
    <path d="M498 233.34 L498 326.67" class="pattern-soundwave--bar-3"></path>
    <path d="M510 87.05 L510 472.95" class="pattern-soundwave--bar-2"></path>
    <path d="M522 217.85 L522 342.14" class="pattern-soundwave--bar-1"></path>
    <path d="M534 98.94 L534 461.06" class="pattern-soundwave--bar-2"></path>
    <path d="M546 210.73 L546 349.27" class="pattern-soundwave--bar-2"></path>
    <path d="M558 122.99 L558 437.01" class="pattern-soundwave--bar-1"></path>
    <path d="M570 210.33 L570 349.67" class="pattern-soundwave--bar-3"></path>
    <path d="M582 238.22 L582 321.77" class="pattern-soundwave--bar-1"></path>
    <path d="M594 33.41 L594 526.59" class="pattern-soundwave--bar-3"></path>
    <path d="M606 114.82 L606 445.18" class="pattern-soundwave--bar-2"></path>
    <path d="M618 174.56 L618 385.44" class="pattern-soundwave--bar-3"></path>
    <path d="M630 195.75 L630 364.25" class="pattern-soundwave--bar-3"></path>
    <path d="M642 189.35 L642 370.65" class="pattern-soundwave--bar-1"></path>
    <path d="M654 36.07 L654 523.93" class="pattern-soundwave--bar-2"></path>
    <path d="M666 126.94 L666 433.06" class="pattern-soundwave--bar-3"></path>
    <path d="M678 137.81 L678 422.19" class="pattern-soundwave--bar-3"></path>
    <path d="M690 55.81 L690 504.19" class="pattern-soundwave--bar-3"></path>
    <path d="M702 187.14 L702 372.86" class="pattern-soundwave--bar-2"></path>
    <path d="M714 166.47 L714 393.53" class="pattern-soundwave--bar-1"></path>
    <path d="M726 117.64 L726 442.36" class="pattern-soundwave--bar-3"></path>
    <path d="M738 103 L738 457" class="pattern-soundwave--bar-2"></path>
    <path d="M750 6.57 L750 553.43" class="pattern-soundwave--bar-2"></path>
    <path d="M762 115.47 L762 444.53" class="pattern-soundwave--bar-2"></path>
    <path d="M774 73.1 L774 486.9" class="pattern-soundwave--bar-1"></path>
    <path d="M786 111.38 L786 448.62" class="pattern-soundwave--bar-2"></path>
    <path d="M798 34.1 L798 525.89" class="pattern-soundwave--bar-2"></path>
    <path d="M810 146.17 L810 413.83" class="pattern-soundwave--bar-3"></path>
    <path d="M822 6.65 L822 553.35" class="pattern-soundwave--bar-2"></path>
    <path d="M834 41.74 L834 518.26" class="pattern-soundwave--bar-1"></path>
    <path d="M846 203.23 L846 356.77" class="pattern-soundwave--bar-2"></path>
    <path d="M858 225.64 L858 334.36" class="pattern-soundwave--bar-3"></path>
    <path d="M870 10.57 L870 549.42" class="pattern-soundwave--bar-3"></path>
    <path d="M882 103.36 L882 456.64" class="pattern-soundwave--bar-3"></path>
    <path d="M894 27.87 L894 532.13" class="pattern-soundwave--bar-3"></path>
    <path d="M906 51.23 L906 508.77" class="pattern-soundwave--bar-3"></path>
    <path d="M918 59.15 L918 500.86" class="pattern-soundwave--bar-1"></path>
    <path d="M930 247.75 L930 312.25" class="pattern-soundwave--bar-2"></path>
    <path d="M942 29.17 L942 530.83" class="pattern-soundwave--bar-1"></path>
    <path d="M954 111.68 L954 448.32" class="pattern-soundwave--bar-1"></path>
    <path d="M966 152.11 L966 407.89" class="pattern-soundwave--bar-3"></path>
    <path d="M978 119.31 L978 440.69" class="pattern-soundwave--bar-1"></path>
    <path d="M990 49.8 L990 510.2" class="pattern-soundwave--bar-3"></path>
    <path d="M1002 56.38 L1002 503.62" class="pattern-soundwave--bar-3"></path>
    <path d="M1014 157.08 L1014 402.92" class="pattern-soundwave--bar-2"></path>
    <path d="M1026 206.72 L1026 353.27" class="pattern-soundwave--bar-1"></path>
    <path d="M1038 115.38 L1038 444.62" class="pattern-soundwave--bar-1"></path>
    <path d="M1050 111 L1050 449" class="pattern-soundwave--bar-3"></path>
    <path d="M1062 156.07 L1062 403.93" class="pattern-soundwave--bar-3"></path>
    <path d="M1074 173.13 L1074 386.87" class="pattern-soundwave--bar-1"></path>
    <path d="M1086 97.59 L1086 462.41" class="pattern-soundwave--bar-3"></path>
    <path d="M1098 83.72 L1098 476.27" class="pattern-soundwave--bar-3"></path>
    <path d="M1110 78.2 L1110 481.8" class="pattern-soundwave--bar-3"></path>
    <path d="M1122 246.67 L1122 313.33" class="pattern-soundwave--bar-1"></path>
    <path d="M1134 242.49 L1134 317.51" class="pattern-soundwave--bar-3"></path>
    <path d="M1146 59.04 L1146 500.96" class="pattern-soundwave--bar-1"></path>
    <path d="M1158 81.54 L1158 478.46" class="pattern-soundwave--bar-3"></path>
    <path d="M1170 125.81 L1170 434.19" class="pattern-soundwave--bar-1"></path>
    <path d="M1182 147.18 L1182 412.82" class="pattern-soundwave--bar-3"></path>
    <path d="M1194 68.47 L1194 491.53" class="pattern-soundwave--bar-2"></path>
    <path d="M1206 218.17 L1206 341.83" class="pattern-soundwave--bar-1"></path>
    <path d="M1218 213.65 L1218 346.35" class="pattern-soundwave--bar-3"></path>
    <path d="M1230 169.44 L1230 390.56" class="pattern-soundwave--bar-2"></path>
    <path d="M1242 79.51 L1242 480.49" class="pattern-soundwave--bar-2"></path>
    <path d="M1254 205.53 L1254 354.47" class="pattern-soundwave--bar-2"></path>
    <path d="M1266 244.84 L1266 315.15" class="pattern-soundwave--bar-3"></path>
    <path d="M1278 162.2 L1278 397.8" class="pattern-soundwave--bar-1"></path>
    <path d="M1290 84.17 L1290 475.83" class="pattern-soundwave--bar-3"></path>
    <path d="M1302 27.15 L1302 532.85" class="pattern-soundwave--bar-1"></path>
    <path d="M1314 42.88 L1314 517.12" class="pattern-soundwave--bar-3"></path>
    <path d="M1326 167.43 L1326 392.57" class="pattern-soundwave--bar-2"></path>
    <path d="M1338 80.96 L1338 479.04" class="pattern-soundwave--bar-1"></path>
    <path d="M1350 64.81 L1350 495.19" class="pattern-soundwave--bar-1"></path>
    <path d="M1362 70.15 L1362 489.85" class="pattern-soundwave--bar-2"></path>
    <path d="M1374 177.75 L1374 382.25" class="pattern-soundwave--bar-1"></path>
    <path d="M1386 83.49 L1386 476.51" class="pattern-soundwave--bar-2"></path>
    <path d="M1398 184.09 L1398 375.9" class="pattern-soundwave--bar-2"></path>
    <path d="M1410 141.75 L1410 418.25" class="pattern-soundwave--bar-1"></path>
    <path d="M1422 229.44 L1422 330.56" class="pattern-soundwave--bar-1"></path>
    <path d="M1434 236.01 L1434 323.99" class="pattern-soundwave--bar-1"></path>
  </g>

  <defs>
    <mask id="#svg-mask-{uid}">
      <rect width="1440" height="560" fill="#ffffff"></rect>
    </mask>
  </defs>
</svg>

<style>
  .pattern-soundwave {
    width: 100%;
    height: 100%;
    background-color: var(--pattern-soundwave-bg-color);

    .pattern-soundwave--bar-1,
    .pattern-soundwave--bar-2,
    .pattern-soundwave--bar-3 {
      opacity: var(--pattern-soundwave-bar-opacity);
      transform: scaleY(1);
      transform-origin: center;
      transition:
        opacity 0.75s cubic-bezier(0.34, 1.5, 0.64, 1),
        transform 0.75s cubic-bezier(0.34, 1.5, 0.64, 1);
    }

    .pattern-soundwave--bar-1 {
      stroke: var(--pattern-soundwave-bar-color-1);
    }

    .pattern-soundwave--bar-2 {
      stroke: var(--pattern-soundwave-bar-color-2);
    }

    .pattern-soundwave--bar-3 {
      stroke: var(--pattern-soundwave-bar-color-3);
    }
  }
</style>
