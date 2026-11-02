declare global {
  /** Injected by the Google reCAPTCHA v3 script tag. */
  const grecaptcha: {
    ready(cb: () => void): void;
    execute(siteKey: string, options: { action: string }): Promise<string>;
  };
}

export {};
