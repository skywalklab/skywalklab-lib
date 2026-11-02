import { component_descriptions } from "../stories/component-descriptions.js";
import { testCookieBanner } from "../data/test-data.js";
import { getLocaleLabels } from "../utils/gdpr.js";

const localLabel = getLocaleLabels("en");

export const legal_static_props = new Map<string, any>([
  [
    "CookieBanner",
    {
      storyDescription: component_descriptions.legal.get("CookieBanner"),
      props: {
        ...localLabel,
        choices: {
          necessary: {
            ...testCookieBanner.choices.necessary,
            value: true,
            disabled: true
          },
          tracking: { ...testCookieBanner.choices.tracking, value: false, disabled: false },
          analytics: {
            ...testCookieBanner.choices.analytics,
            value: false,
            disabled: false
          },
          marketing: {
            ...testCookieBanner.choices.marketing,
            value: false,
            disabled: true
          }
        },
        locale: "en",
        requiresOptIn: true,
        cookieName: "skywalklab_consent",
        cookieConfig: { domain: "", path: "/", sameSite: "strict" },
        showCookieBanner: true,
        showEditIcon: true,
        showSettings: true,
        ignoreCookiesOnLoad: true,
        canRejectCookies: false,
        buttonClass: "",
        style: "position: relative; inset: unset; box-shadow: none;"
      }
    }
  ]
]);
