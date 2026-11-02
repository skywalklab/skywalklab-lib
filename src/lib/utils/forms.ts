import type {} from "./globals.js";

type ActionResult<
  Success extends Record<string, unknown> | undefined = Record<string, any>,
  Failure extends Record<string, unknown> | undefined = Record<string, any>
> =
  | { type: "success"; status: number; data?: Success }
  | { type: "failure"; status: number; data?: Failure }
  | { type: "redirect"; status: number; location: string }
  | { type: "error"; status?: number; error: any };

export function addRecaptchaToEnchanceForm(
  RECAPTCHA_SITE: string,
  loadingCb?: (success: boolean | null) => void | undefined,
  clientCb?: (formData: FormData) => Promise<{ success: boolean }> | null
) {
  return async ({ formData, cancel }: { formData: FormData; cancel: () => void }) => {
    try {
      loadingCb?.(null);
      await new Promise<void>((resolve, reject) => {
        grecaptcha.ready(function () {
          grecaptcha.execute(RECAPTCHA_SITE, { action: "submit" }).then(async function (token: string) {
            if (token) {
              formData.set("g-recaptcha-response", token);
              resolve();
            } else {
              reject(new Error("No reCAPTCHA token"));
            }
          });
        });
      });
      return async ({ result, update }: { result: ActionResult; update: () => void }) => {
        if (clientCb) {
          const clientSideResponse = await clientCb?.(formData);
          loadingCb?.(clientSideResponse?.success ?? false);
        } else {
          loadingCb?.(result.type === "success");
        }
        update();
      };
    } catch (error) {
      console.error("reCAPTCHA error:", error);
      loadingCb?.(false);
      cancel();
    }
  };
}

export const renderRecaptcha = (recaptcha_public: string) => {
  const id = "g-recaptcha-api-script";
  if (!document.querySelector(`#${id}`)) {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=${recaptcha_public}`;
    script.id = id;
    script.async = true;
    document.head.appendChild(script);
  }
};
