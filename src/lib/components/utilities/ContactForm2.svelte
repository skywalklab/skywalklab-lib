<script lang="ts">
  import type { Snippet } from "svelte";
  import { readable, writable } from "svelte/store";
  import type { Action } from "svelte/action";
  import type { FormBinding } from "./types.js";

  interface Props {
    /** URL the form POSTs to. */
    action?: string;
    /** Visible text for each field and the submit button. */
    labels: {
      /** Label for the name field. */
      name: string;
      /** Label for the email field. */
      email: string;
      /** Label for the phone field. */
      phone: string;
      /** Label for the message field. */
      message: string;
      /** Label on the submit button. */
      button: string;
    };
    /** Return value of `superForm()` from sveltekit-superforms. Omit it to fall back to a plain POST with no client-side validation. */
    binding?: FormBinding;
    /** Heading shown above the fields. */
    title?: string;
    /** Center the title. */
    centered?: boolean;
    /** Max width of the form when centered. Sets `--contact-form-2-max-width`. */
    maxWidth?: string;
    /** Class applied to the submit button alongside its own, e.g. a button CSS module from `@skywalklab/lib/css-modules`. */
    buttonClass?: string;
    /** Accent color for focus rings and the form message. Sets `--contact-form-2-accent-color`. */
    accentColor?: string;
    /** Field background color. Sets `--contact-form-2-field-bg-color`. */
    fieldBgColor?: string;
    /** Field border color. Sets `--contact-form-2-field-border-color`. */
    fieldBorderColor?: string;
    /** Text color inside fields. Sets `--contact-form-2-field-color`. */
    fieldColor?: string;
    /** Field label color. Sets `--contact-form-2-label-color`. */
    labelColor?: string;
    /** Title color. Sets `--contact-form-2-title-color`. */
    titleColor?: string;
    /** Captcha widget rendered above the submit button. */
    turnstileSnippet?: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    action,
    labels,
    binding,
    title,
    centered = false,
    maxWidth,
    buttonClass,
    accentColor,
    fieldBgColor,
    fieldBorderColor,
    fieldColor,
    labelColor,
    titleColor,
    turnstileSnippet,
    style
  }: Props = $props();
  let uid: string = $props.id();

  const noValues = writable<Record<string, string>>({ name: "", email: "", phone: "", message: "" });
  const noErrors = readable<Record<string, string[]>>({});
  const noConstraints = readable<Record<string, Record<string, unknown>>>({});
  const noMessage = readable<string | undefined>(undefined);
  const notSubmitting = readable(false);
  const enhanceFallback: Action<HTMLFormElement> = () => {};

  const values = $derived(binding?.form ?? noValues);
  const errors = $derived(binding?.errors ?? noErrors);
  const constraints = $derived(binding?.constraints ?? noConstraints);

  const fieldConstraints = (field: string) => {
    const { pattern, ...rest } = $constraints[field] ?? {};
    return rest;
  };
  const message = $derived(binding?.message ?? noMessage);

  const rendered = ["name", "email", "phone", "message"];
  const formErrors = $derived(
    Object.entries($errors)
      .filter(([field]) => !rendered.includes(field))
      .flatMap(([, value]) => (Array.isArray(value) ? value : []))
  );
  const submitting = $derived(binding?.submitting ?? notSubmitting);
  const enhance = $derived(binding?.enhance ?? enhanceFallback);

  const fieldError = (field: string) => {
    const error = $errors[field];
    return Array.isArray(error) ? error.join(" ") || undefined : undefined;
  };
</script>

<form
  id="contact-form-2-{uid}"
  class="contact-form-2"
  class:centered
  style:--contact-form-2-max-width={maxWidth}
  style:--contact-form-2-accent-color={accentColor}
  style:--contact-form-2-field-bg-color={fieldBgColor}
  style:--contact-form-2-field-border-color={fieldBorderColor}
  style:--contact-form-2-field-color={fieldColor}
  style:--contact-form-2-label-color={labelColor}
  style:--contact-form-2-title-color={titleColor}
  {style}
  {action}
  method="POST"
  use:enhance>
  {#if title}
    <h2 class="contact-form-2--title">{title}</h2>
  {/if}

  <div class="contact-form-2--fields">
    <div class="contact-form-2--field">
      <label class="contact-form-2--label" for="contact-form-2--name-{uid}">{labels.name}*</label>
      <input
        class="contact-form-2--input"
        id="contact-form-2--name-{uid}"
        name="name"
        type="text"
        autocomplete="name"
        required
        {...fieldConstraints("name")}
        bind:value={$values.name}
        aria-invalid={fieldError("name") ? "true" : undefined} />
      {#if fieldError("name")}
        <p class="contact-form-2--error">{fieldError("name")}</p>
      {/if}
    </div>
    <div class="contact-form-2--field">
      <label class="contact-form-2--label" for="contact-form-2--email-{uid}">{labels.email}*</label>
      <input
        class="contact-form-2--input"
        id="contact-form-2--email-{uid}"
        name="email"
        type="email"
        autocomplete="email"
        required
        {...fieldConstraints("email")}
        bind:value={$values.email}
        aria-invalid={fieldError("email") ? "true" : undefined} />
      {#if fieldError("email")}
        <p class="contact-form-2--error">{fieldError("email")}</p>
      {/if}
    </div>
    <div class="contact-form-2--field">
      <label class="contact-form-2--label" for="contact-form-2--phone-{uid}">{labels.phone}</label>
      <input
        class="contact-form-2--input"
        id="contact-form-2--phone-{uid}"
        name="phone"
        type="tel"
        autocomplete="tel"
        {...fieldConstraints("phone")}
        bind:value={$values.phone}
        aria-invalid={fieldError("phone") ? "true" : undefined} />
      {#if fieldError("phone")}
        <p class="contact-form-2--error">{fieldError("phone")}</p>
      {/if}
    </div>
    <div class="contact-form-2--field wide">
      <label class="contact-form-2--label" for="contact-form-2--message-{uid}">{labels.message}*</label>
      <textarea
        class="contact-form-2--input contact-form-2--textarea"
        id="contact-form-2--message-{uid}"
        name="message"
        rows="6"
        required
        {...fieldConstraints("message")}
        bind:value={$values.message}
        aria-invalid={fieldError("message") ? "true" : undefined}></textarea>
      {#if fieldError("message")}
        <p class="contact-form-2--error">{fieldError("message")}</p>
      {/if}
    </div>
  </div>

  <div class:contact-form-2--turnstile={turnstileSnippet != undefined}>{@render turnstileSnippet?.()}</div>

  <button class="{buttonClass} contact-form-2--submit" type="submit" disabled={$submitting}>{labels.button}</button>

  {#if formErrors.length}
    <p class="contact-form-2--error contact-form-2--form-error">{formErrors.join(" ")}</p>
  {/if}

  {#if $message}
    <p class="contact-form-2--message">{$message}</p>
  {/if}
</form>

<style>
  .contact-form-2 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .contact-form-2--title {
      color: var(--contact-form-2-title-color, #fff);
      font-size: clamp(28px, 3.2vw, 44px);
      line-height: 1.15;
      font-weight: 800;
      letter-spacing: -0.02em;
      text-transform: none;
    }

    .contact-form-2--fields {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1.25rem;
      width: 100%;
      margin-top: 2.5rem;

      .contact-form-2--field {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        text-align: left;

        .contact-form-2--label {
          color: var(--contact-form-2-label-color, rgba(255, 255, 255, 0.72));
          font-size: 14px;
          font-weight: 600;
          line-height: 1.2;
        }

        .contact-form-2--input {
          width: 100%;
          background-color: var(--contact-form-2-field-bg-color, rgba(255, 255, 255, 0.03));
          border: 1px solid var(--contact-form-2-field-border-color, rgba(255, 255, 255, 0.14));
          border-radius: 10px;
          color: var(--contact-form-2-field-color, #fff);
          font: inherit;
          font-size: 16px;
          padding: 0.95rem 1.15rem;
          transition: border-color 0.15s linear;

          &:focus-visible {
            outline: none;
            border-color: var(--contact-form-2-accent-color, var(--accent, lightblue));
          }
        }

        .contact-form-2--textarea {
          min-height: 150px;
          resize: vertical;
        }

        &.wide {
          grid-column: 1 / -1;
        }
      }

      @media (min-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .contact-form-2--turnstile {
      margin-top: 1.75rem;
    }

    .contact-form-2--submit {
      margin-top: 1.75rem;

      &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
      }
    }

    .contact-form-2--error {
      color: var(--error, #e5484d);
      font-size: 13px;
      line-height: 1.35;

      &.contact-form-2--form-error {
        margin-top: 1rem;
      }
    }

    .contact-form-2--message {
      margin-top: 1.25rem;
      background-color: color-mix(
        in srgb,
        var(--contact-form-2-accent-color, var(--accent, lightblue)),
        transparent 88%
      );
      border-left: 3px solid var(--contact-form-2-accent-color, var(--accent, lightblue));
      border-radius: 8px;
      color: var(--contact-form-2-field-color, #fff);
      font-size: 14px;
      line-height: 22px;
      padding: 0.85rem 1.1rem;
    }

    &.centered {
      max-width: var(--contact-form-2-max-width, 760px);
      margin-inline: auto;
      align-items: center;
      text-align: center;
    }
  }
</style>
