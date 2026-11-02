import { sequence } from "@sveltejs/kit/hooks";
import type { Handle } from "@sveltejs/kit";
import { paraglideMiddleware } from "$lib/paraglide/server.js";
import { handleErrorWithSentry, init } from "@sentry/sveltekit";
import { dev } from "$app/environment";
import { env } from "$env/dynamic/private";

init({
  dsn: env.SENTRY_DSN,
  enabled: !dev
});

const handleParaglide: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request, locale }) => {
    event.request = request;

    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace("%paraglide.lang%", locale)
    });
  });

export const handle: Handle = sequence(handleParaglide);
export const handleError = handleErrorWithSentry();
