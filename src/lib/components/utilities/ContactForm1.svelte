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
      /** Small print shown above the submit button. */
      disclaimer: string;
      /** Label on the submit button. */
      button: string;
    };
    /** Return value of `superForm()` from sveltekit-superforms. Omit it to fall back to a plain POST with no client-side validation. */
    binding?: FormBinding;
    /** Class applied to the submit button alongside its own, e.g. a button CSS module from `@skywalklab/lib/css-modules`. */
    buttonClass?: string;
    /** Color of the validation error text. Sets `--contact-form-1-error-color`. */
    errorColor?: string;
    /** Color of the form-level message banner. Sets `--contact-form-1-message-color`. */
    messageColor?: string;
    /** Captcha widget rendered above the submit button. */
    turnstileSnippet?: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  let {
    action,
    labels,
    binding,
    buttonClass,
    errorColor = "var(--error, #e5484d)",
    messageColor = "var(--primary, #333)",
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
  id="contact-form-1-{uid}"
  class="contact-form-1"
  {action}
  method="POST"
  style:--contact-form-1-error-color={errorColor}
  style:--contact-form-1-message-color={messageColor}
  {style}
  use:enhance>
  <div class="contact-form-1--contact-info">
    <div class="contact-form-1--field">
      <label for="name-{uid}">{labels.name}*</label>
      <input
        id="name-{uid}"
        name="name"
        type="text"
        autocomplete="name"
        required
        {...fieldConstraints("name")}
        bind:value={$values.name}
        aria-invalid={fieldError("name") ? "true" : undefined} />
      {#if fieldError("name")}
        <p class="contact-form-1--error">{fieldError("name")}</p>
      {/if}
    </div>
    <div class="contact-form-1--field">
      <label for="email-{uid}">{labels.email}*</label>
      <input
        id="email-{uid}"
        name="email"
        type="email"
        autocomplete="email"
        required
        {...fieldConstraints("email")}
        bind:value={$values.email}
        aria-invalid={fieldError("email") ? "true" : undefined} />
      {#if fieldError("email")}
        <p class="contact-form-1--error">{fieldError("email")}</p>
      {/if}
    </div>
    <div class="contact-form-1--field">
      <label for="phone-{uid}">{labels.phone}</label>
      <input
        id="phone-{uid}"
        name="phone"
        type="tel"
        autocomplete="tel"
        {...fieldConstraints("phone")}
        bind:value={$values.phone}
        aria-invalid={fieldError("phone") ? "true" : undefined} />
      {#if fieldError("phone")}
        <p class="contact-form-1--error">{fieldError("phone")}</p>
      {/if}
    </div>
  </div>
  <div class="contact-form-1--message-info">
    <div class="contact-form-1--field">
      <label for="message-{uid}">{labels.message}*</label>
      <textarea
        name="message"
        id="message-{uid}"
        required
        {...fieldConstraints("message")}
        bind:value={$values.message}
        aria-invalid={fieldError("message") ? "true" : undefined}></textarea>
      {#if fieldError("message")}
        <p class="contact-form-1--error">{fieldError("message")}</p>
      {/if}
    </div>
  </div>
  {#if formErrors.length}
    <p class="contact-form-1--error contact-form-1--form-error">{formErrors.join(" ")}</p>
  {/if}

  {#if $message}
    <p class="contact-form-1--message">{$message}</p>
  {/if}
  <div class="contact-form-1--field contact-form-1--submit-container">
    <p class="contact-form-1--disclaimer">{labels.disclaimer}</p>
    <div class:contact-form-1--turnstile={turnstileSnippet != undefined}>{@render turnstileSnippet?.()}</div>
    <button class={buttonClass} type="submit" disabled={$submitting}>{labels.button}</button>
  </div>
</form>

<style>
  .contact-form-1 {
    display: flex;
    flex-wrap: wrap;
    column-gap: 2rem;
    row-gap: 1rem;

    .contact-form-1--field {
      display: flex;
      flex-direction: column;
      gap: 0;
      font-size: 14px;

      input,
      textarea {
        border: 1px solid #e2e6e7;
        padding: 0.75rem 1rem;
      }

      &:has(textarea) {
        height: 100%;

        textarea {
          height: inherit;
          min-height: 199px;
        }
      }
    }

    .contact-form-1--error {
      color: var(--contact-form-1-error-color);
      font-size: 13px;
      line-height: 1.35;
      margin-top: 0.25rem;
    }

    .contact-form-1--form-error {
      margin-top: 1rem;
    }

    .contact-form-1--message {
      width: 100%;
      background-color: color-mix(in srgb, var(--contact-form-1-message-color), transparent 92%);
      border-left: 3px solid var(--contact-form-1-message-color);
      border-radius: 8px;
      font-size: 14px;
      line-height: 22px;
      padding: 0.75rem 1rem;
    }

    .contact-form-1--contact-info {
      flex: 1;
      min-width: 280px;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .contact-form-1--message-info {
      flex: 1;
      min-width: 280px;
    }

    .contact-form-1--submit-container {
      width: 100%;
      flex-direction: row;
      row-gap: 1rem;
      column-gap: 3rem;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>
