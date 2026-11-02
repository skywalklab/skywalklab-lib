<script lang="ts">
  import Cookies from "js-cookie";
  import { validate, getLocaleLabels } from "../../utils/gdpr.js";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import type {
    ChoiceOptions,
    ChoiceValues,
    ChoiceValuesWithId,
    Choices,
    Chosen,
    PartialChoices
  } from "../../utils/gdpr.js";
  import { SvelteDate } from "svelte/reactivity";

  interface Props {
    /** Language used for the banner copy. The category labels are read once on mount, so changing `locale` afterwards needs a reload to take effect. */
    locale?: string;
    /** Require explicit consent before setting non-essential cookies. */
    requiresOptIn?: boolean;
    /** Name of the cookie storing the consent choice. */
    cookieName: string;
    /** Cookie attributes such as domain and expiry. */
    cookieConfig?: {
      /** Path the consent cookie is scoped to. */
      path?: string;
      /** Domain the consent cookie is set on. */
      domain?: string;
      /** SameSite attribute for the consent cookie. */
      sameSite?: "strict" | "lax" | "none";
    };
    /** Whether the consent banner is visible. Bindable, so the parent can control it. */
    showCookieBanner?: boolean;
    /** Show the control that reopens the consent settings. */
    showEditIcon?: boolean;
    /** Show the per-category consent settings when the banner opens. */
    showSettings?: boolean;
    /** Skip reading the consent cookie on mount, so the banner always starts from its props. */
    ignoreCookiesOnLoad?: boolean;
    /** Offer a reject-all option. */
    canRejectCookies?: boolean;
    /** Class applied to the banner's buttons. */
    buttonClass?: string;
    /** Label for the accept-everything button, shown while the settings panel is closed. */
    acceptAllLabel?: string;
    /** Label for the confirm button, shown while the settings panel is open. */
    acceptSelectedLabel?: string;
    /** Label for the reject-everything button. */
    rejectLabel?: string;
    /** Label for the button that opens the settings panel. */
    settingsLabel?: string;
    /** Label for the button that dismisses the settings panel. */
    closeLabel?: string;
    /** Accessible name for the control that reopens the banner after a choice is saved. */
    editLabel?: string;
    /** Banner title. */
    heading?: string;
    /** Banner body copy. Rendered as HTML. */
    description?: string;
    /** Overrides for the cookie categories. Merged over the locale defaults, so any option or field you leave out keeps its default. */
    choices?: PartialChoices;
    /** Called with the visitor's answer for essential cookies. Always true, since they cannot be declined. */
    onnecessary?: (agreed: boolean) => void;
    /** Called with the visitor's answer for tracking cookies, e.g. to set or clear your ad-tracking pixel. */
    ontracking?: (agreed: boolean) => void;
    /** Called with the visitor's answer for analytics cookies, e.g. to update Google Analytics consent mode. */
    onanalytics?: (agreed: boolean) => void;
    /** Called with the visitor's answer for marketing cookies, e.g. to enable your remarketing scripts. */
    onmarketing?: (agreed: boolean) => void;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    choices,
    locale = "en",
    requiresOptIn = false,
    cookieName,
    cookieConfig = {
      domain: "",
      path: "/",
      sameSite: "strict"
    },
    showCookieBanner = $bindable(false),
    showEditIcon = false,
    showSettings = false,
    ignoreCookiesOnLoad = false,
    canRejectCookies = false,
    acceptAllLabel,
    acceptSelectedLabel,
    rejectLabel,
    settingsLabel,
    closeLabel,
    editLabel,
    heading,
    description,
    buttonClass,
    onnecessary,
    ontracking,
    onanalytics,
    onmarketing,
    style
  }: Props = $props();

  const localLabel = $derived(getLocaleLabels(locale));
  const resolved = $derived({
    acceptAllLabel: acceptAllLabel ?? localLabel.acceptAllLabel,
    acceptSelectedLabel: acceptSelectedLabel ?? localLabel.acceptSelectedLabel,
    rejectLabel: rejectLabel ?? localLabel.rejectLabel,
    settingsLabel: settingsLabel ?? localLabel.settingsLabel,
    closeLabel: closeLabel ?? localLabel.closeLabel,
    editLabel: editLabel ?? localLabel.editLabel,
    heading: heading ?? localLabel.heading,
    description: description ?? localLabel.description,
    choices: mergeChoices(localLabel.choices as Choices, choices ?? {}) as Choices
  });

  let uid: string = $props.id();
  let events = $derived({ onnecessary, ontracking, onanalytics, onmarketing });

  // svelte-ignore state_referenced_locally
  let choicesMerged = $state(resolved.choices) as Choices;

  let choicesArr = $derived<ChoiceValuesWithId[]>(
    Object.values(choicesMerged).map((item, index) =>
      Object.assign({}, item, {
        id: Object.keys(choicesMerged)[index] as ChoiceOptions
      })
    )
  );

  let cookieChoices = $derived<Chosen>(
    choicesArr.reduce((result: Chosen, item: ChoiceValuesWithId) => {
      result[item.id] = item.value || false;
      return result;
    }, {} as Chosen)
  );

  let necessaryCookieChoices = $derived<Chosen>(
    choicesArr.reduce((result: Chosen, item: ChoiceValuesWithId) => {
      result[item.id] = item.id === "necessary";
      return result;
    }, {} as Chosen)
  );

  let hasSelectedAllCookieTypes = $derived<boolean>(
    choicesArr.every((choice) => (!choice.disabled && choice.value) || choice.disabled)
  );

  function show() {
    showCookieBanner = true;
  }

  function hide() {
    showSettings = false;
    showCookieBanner = false;
  }

  onMount(() => {
    if (ignoreCookiesOnLoad) return;
    const cookie = Cookies.get(cookieName);

    if (!cookie) {
      if (requiresOptIn) {
        show();
      } else {
        accept();
        hide();
      }
      return;
    } else {
      hide();
    }

    try {
      const { choices, fp }: { choices: Chosen; fp: string } = JSON.parse(atob(cookie));
      const valid = validate(cookieChoices, choices);

      if (!valid) {
        throw new Error("cookie consent has changed");
      }

      if (!fp && (choices.analytics || choices.tracking)) {
        setCookie(choices);
      }

      execute(choices);
      hide();
    } catch (e) {
      removeCookie();
      show();
    }
  });

  function mergeChoices(base: Choices, overrides: Partial<Record<ChoiceOptions, Partial<ChoiceValues>>>): Choices {
    return Object.keys(base).reduce((acc, key) => {
      const k = key as ChoiceOptions;

      acc[k] = { ...base[k], ...overrides[k] };
      return acc;
    }, {} as Choices);
  }

  function setCookie(choices: Chosen) {
    const expires = new SvelteDate();

    expires.setDate(expires.getDate() + 400);

    const cookieContent: { choices: Chosen; fp?: string } = { choices };

    const options = Object.assign({}, cookieConfig, { expires });

    if (choices.analytics || choices.tracking) {
      cookieContent.fp = crypto.randomUUID();
    }

    Cookies.set(cookieName, btoa(JSON.stringify(cookieContent)), options);
  }

  function removeCookie() {
    const { path } = cookieConfig;

    Cookies.remove(cookieName, Object.assign({}, path ? { path } : {}));
  }

  function execute(chosen: Chosen) {
    const types = Object.keys(cookieChoices);

    for (const t of types) {
      const type = t as ChoiceOptions;
      const agreed = chosen[type];

      if (choicesMerged[type]) {
        choicesMerged[type].value = agreed;
      }

      events[`on${t}` as keyof typeof events]?.(agreed);
      window.dispatchEvent(new CustomEvent(`consent:${t}`, { detail: { agreed } }));
    }
  }

  function reject() {
    setCookie(necessaryCookieChoices);
    execute(necessaryCookieChoices);
  }

  function accept() {
    if (!showSettings) {
      Object.keys(choicesMerged).forEach((option) => {
        const choiceValues = choicesMerged[option as keyof typeof choicesMerged];
        choiceValues.value = option === "necessary" || !choiceValues.disabled;
      });
    }

    setCookie(cookieChoices);
    execute(cookieChoices);
  }
</script>

<div
  id="cookie-banner-{uid}"
  class="cookie-banner"
  class:show-banner={showCookieBanner}
  class:show-edit-icon={showEditIcon}
  {style}>
  <button
    class="cookie-banner--toggle"
    aria-label={resolved.editLabel}
    onclick={show}
    class:show-banner={showCookieBanner}
    disabled={showCookieBanner}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
      <path
        d="M510.52 255.82c-69.97-.85-126.47-57.69-126.47-127.86-70.17
        0-127-56.49-127.86-126.45-27.26-4.14-55.13.3-79.72 12.82l-69.13
        35.22a132.221 132.221 0 0 0-57.79 57.81l-35.1 68.88a132.645 132.645 0 0
        0-12.82 80.95l12.08 76.27a132.521 132.521 0 0 0 37.16 72.96l54.77
        54.76a132.036 132.036 0 0 0 72.71 37.06l76.71 12.15c27.51 4.36 55.7-.11
        80.53-12.76l69.13-35.21a132.273 132.273 0 0 0
        57.79-57.81l35.1-68.88c12.56-24.64 17.01-52.58 12.91-79.91zM176
        368c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32
        32zm32-160c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33
        32-32 32zm160 128c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32
        32-14.33 32-32 32z" />
    </svg>
  </button>

  <div class="cookie-banner--wrapper" class:show-banner={showCookieBanner} in:fade={{ duration: 200 }}>
    <div class="cookie-banner--consent">
      <div class="cookie-banner--left">
        <div class="cookie-banner--content">
          <p class="cookie-banner--title">{resolved.heading}</p>

          <p class="cookie-banner--description">
            <!-- eslint-disable-next-line svelte/no-at-html-tags -->
            {@html resolved.description}
          </p>
        </div>
      </div>

      <div class="cookie-banner--right">
        <button
          type="button"
          class="{buttonClass} cookie-banner--button cookie-banner--preferences-button"
          class:show-settings={showCookieBanner && showSettings}
          aria-label={resolved.settingsLabel}
          onclick={() => {
            showSettings = !showSettings;
          }}>
          {resolved.settingsLabel}
        </button>

        {#if canRejectCookies}
          <button
            type="submit"
            class="{buttonClass} cookie-banner--button cookie-banner--reject-button"
            onclick={() => {
              reject();
              hide();
            }}
            aria-label={resolved.rejectLabel}>
            {resolved.rejectLabel}
          </button>
        {/if}

        <button
          type="submit"
          class="{buttonClass} cookie-banner--button cookie-banner--accept-button"
          onclick={() => {
            accept();
            hide();
          }}
          aria-label={hasSelectedAllCookieTypes && !showSettings
            ? resolved.acceptAllLabel
            : resolved.acceptSelectedLabel}>
          {!showSettings ? resolved.acceptAllLabel : resolved.acceptSelectedLabel}
        </button>
      </div>
    </div>
  </div>

  <div
    class="cookie-banner--operations"
    class:show-settings={showCookieBanner && showSettings}
    in:fade={{ duration: 200 }}>
    <div class="cookie-banner--operations-list">
      {#each choicesArr as choice (choice.id)}
        {#if Object.hasOwnProperty.call(choicesMerged, choice.id) && choicesMerged[choice.id]}
          <div
            class="cookie-banner--operations-item"
            class:disabled={choice.id === "necessary" || choice.disabled === true}>
            <input
              type="checkbox"
              id={`cookie-banner--consent-check-${uid}-${choice.id}`}
              bind:checked={choicesMerged[choice.id].value}
              disabled={choice.id === "necessary" || choice.disabled === true} />

            <label for={`cookie-banner--consent-check-${uid}-${choice.id}`}>
              {choice.label}
            </label>

            <span class="cookie-banner--operations-item-label">
              {choice.description}
            </span>
          </div>
        {/if}
      {/each}

      <button
        type="submit"
        class="{buttonClass} cookie-banner--button cookie-banner--close-button"
        aria-label={resolved.closeLabel}
        onclick={() => {
          showSettings = false;
        }}>
        {resolved.closeLabel}
      </button>
    </div>
  </div>
</div>

<style>
  :where(.cookie-banner) {
    position: fixed;
    z-index: 101;
    bottom: 40px;
    right: 0;
    margin: 0;
    width: fit-content;
    max-width: min(90vw, 500px);
    max-height: calc(100svh - 40px);
    overflow: auto;
    flex-direction: column;
    gap: 1rem;
    display: none;
    font-size: clamp(14px, 4.5vw, 16px);

    &.show-banner {
      display: flex;
      background-color: var(--background, white);
      box-shadow: var(--box-shadow, none);
      border-radius: 8px;
      padding: 20px clamp(16px, 5vw, 20px);
      z-index: 201;
    }

    &.show-edit-icon {
      display: flex;

      &:not(.show-banner) .cookie-banner--toggle {
        padding: 0.5rem;
        border-radius: 8px;
        background-color: var(--background, white);
        box-shadow: var(--box-shadow, none);
      }
    }

    @media (min-width: 480px) {
      right: 40px;
    }

    .cookie-banner--toggle {
      width: 4rem;
      color: var(--primary, black);
      cursor: pointer;

      svg {
        width: 100%;
      }
    }

    .cookie-banner--wrapper {
      display: none;

      &.show-banner {
        display: block;
      }
    }

    .cookie-banner--consent {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .cookie-banner--content {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        .cookie-banner--title {
          font-weight: bold;
          font-size: 20px;
        }

        .cookie-banner--description {
          :global {
            a {
              color: var(--accent-dark, slategray);
              border-bottom: 1px solid currentColor;
              transition: all 0.15s linear;

              &:hover,
              &:focus-visible {
                color: var(--primary, black);
              }
            }
          }
        }
      }

      .cookie-banner--right {
        display: flex;
        gap: 0.5rem;
        width: fit-content;
        margin: 0;
      }
    }

    .cookie-banner--operations {
      display: none;

      &.show-settings {
        display: block;
      }

      .cookie-banner--operations-item {
        &.disabled {
          color: grey;
        }

        label {
          font-weight: bold;
        }
      }

      .cookie-banner--operations-list {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        button {
          width: fit-content;
          margin: 0.25rem 0 0;
        }
      }
    }
  }
</style>
