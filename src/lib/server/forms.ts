import { fail } from "@sveltejs/kit";

export async function verifyRecaptcha(request: any, recaptchaSecret: string) {
  const data = await request.formData();

  const formData = Object.fromEntries(data.entries());

  if (!formData["g-recaptcha-response"] || data.get("pass-input")) {
    return fail(400, {
      error: "Error submitting form",
      ...formData
    });
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        secret: recaptchaSecret,
        response: formData["g-recaptcha-response"]
      }),
      credentials: "include"
    });

    const recaptchaResponse: {
      success: boolean;
      challenge_ts: string;
      hostname: string;
      "error-codes": string[];
    } = await response.json();

    if (!recaptchaResponse || !recaptchaResponse.success) {
      return fail(401, {
        error: "Error submitting form",
        ...formData
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Email send error:", error);

    return fail(500, {
      error: "Error submitting form",
      ...formData
    });
  }
}
