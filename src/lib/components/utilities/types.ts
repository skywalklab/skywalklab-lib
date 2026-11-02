import type { Action } from "svelte/action";
import type { Readable, Writable } from "svelte/store";

export interface FormBinding {
  enhance: Action<HTMLFormElement>;
  form: Writable<Record<string, any>>;
  errors: Readable<Record<string, any>>;
  constraints?: Readable<Record<string, any>>;
  message?: Readable<string | undefined>;
  submitting?: Readable<boolean>;
}
