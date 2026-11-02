<script lang="ts">
  import type { Component } from "svelte";

  interface Props {
    /** Heading shown above the steps. */
    title: string;
    /** Steps rendered in order; each `icon` is a component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL; `iconProps` takes `lucide_icon` and `size` for `Icon`, and everything else is forwarded to the component or `<img>`. */
    items: {
      /** Label for the step. */
      text: string;
      /** Detail shown under the label. */
      description?: string;
      /** Turns the step title into a link. */
      href?: string;
      /** A component, e.g. the library's `Icon` (`@skywalklab/lib/components/icons`) with a Lucide name in `iconProps`, or an image URL. */
      icon: Component<any, object, ""> | string;
      /** The library's `Icon` takes `lucide_icon` and `size`; everything else is forwarded to the component or `<img>`. */
      iconProps?: Record<string, any>;
    }[];
    /** Color of the title and step headings. Sets `--process-flow-heading-color`. */
    headingColor?: string;
    /** Background color of the step discs. Sets `--process-flow-disc-bg-color`. */
    discBgColor?: string;
    /** Color of the arrows between steps. Sets `--process-flow-arrow-color`. */
    arrowColor?: string;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let { title, items, headingColor, discBgColor, arrowColor, style }: Props = $props();
  let uid: string = $props.id();
</script>

<div
  id="process-flow-{uid}"
  class="process-flow"
  style:--process-flow-heading-color={headingColor}
  style:--process-flow-disc-bg-color={discBgColor}
  style:--process-flow-arrow-color={arrowColor}
  {style}>
  <h2 class="process-flow--title">{title}</h2>

  <ol class="process-flow--steps">
    {#each items as item, i (i)}
      {@const IconComponent = item.icon}
      <li class="process-flow--step">
        <div class="process-flow--disc">
          {#if typeof IconComponent === "string"}
            <img
              {...item.iconProps}
              src={IconComponent}
              alt=""
              width={item.iconProps?.size ?? 38}
              height={item.iconProps?.size ?? 38} />
          {:else}
            <IconComponent {...item.iconProps} />
          {/if}
          <span class="process-flow--number">{String(i + 1).padStart(2, "0")}</span>
        </div>
        <h3 class="process-flow--step-title">
          {#if item.href}
            <a class="process-flow--step-link" href={item.href}>{item.text}</a>
          {:else}
            {item.text}
          {/if}
        </h3>
        {#if item.description}
          <p class="process-flow--step-description">{item.description}</p>
        {/if}

        {#if i < items.length - 1}
          <!-- Hand-drawn style connector, mirrored on alternate gaps to follow the zig-zag. -->
          <svg class="process-flow--arrow" viewBox="0 0 130 56" fill="none" aria-hidden="true">
            <path
              d="M4 10 C 36 4, 72 18, 100 42"
              stroke="currentColor"
              stroke-width="3"
              stroke-linecap="round"
              stroke-dasharray="1 9" />
            <path d="M92 24 L110 46 L84 48 Z" fill="currentColor" />
          </svg>
        {/if}
      </li>
    {/each}
  </ol>
</div>

<style>
  .process-flow {
    --process-flow-accent: var(--accent, lightblue);

    .process-flow--title {
      color: var(--process-flow-heading-color, var(--primary, black));
      font-size: clamp(30px, 3.4vw, 46px);
      line-height: 1.15;
      font-weight: 800;
      letter-spacing: -0.02em;
      text-transform: none;
      text-align: center;
      margin-bottom: 4rem;
    }

    .process-flow--steps {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 2.5rem 1.5rem;

      .process-flow--step {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        gap: 1rem;

        .process-flow--disc {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background-color: var(--process-flow-disc-bg-color, var(--process-flow-accent));
          color: var(--primary, black);

          .process-flow--number {
            position: absolute;
            top: -4px;
            left: -10px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background-color: var(--primary, black);
            color: var(--process-flow-accent);
            font-size: 15px;
            font-weight: 700;
          }
        }

        .process-flow--step-title {
          color: var(--process-flow-heading-color, var(--primary, black));
          font-size: 22px;
          line-height: 1.3;
          font-weight: 800;
          letter-spacing: -0.01em;
          text-transform: none;

          .process-flow--step-link {
            transition: color 0.15s linear;
            text-decoration: underline;

            &:hover {
              color: color-mix(in srgb, var(--process-flow-heading-color, var(--primary, black)), transparent 35%);
            }
          }
        }

        .process-flow--step-description {
          font-size: 15px;
          line-height: 26px;
          max-width: 34ch;
        }

        .process-flow--arrow {
          display: none;
          color: var(--process-flow-arrow-color, var(--accent-dark, slategray));

          @media (min-width: 768px) {
            display: block;
            position: absolute;
            top: 42px;
            left: 72%;
            width: 130px;
          }
        }

        &:nth-child(even) .process-flow--arrow {
          transform: scaleY(-1);
          top: -10px;
        }

        @media (min-width: 768px) {
          &:nth-child(even) {
            margin-top: 5rem;
          }
        }
      }
    }
  }
</style>
