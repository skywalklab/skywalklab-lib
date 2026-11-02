export type ChoiceOptions = "necessary" | "tracking" | "analytics" | "marketing";
export type ChoiceValues = {
  label: string;
  description: string;
  value: boolean;
  disabled?: boolean;
};
export type ChoiceValuesWithId = ChoiceValues & { id: ChoiceOptions };
export type Choices = Record<ChoiceOptions, ChoiceValues>;
export type PartialChoices = Partial<Record<ChoiceOptions, Partial<ChoiceValues>>>;
export type Chosen = Record<ChoiceOptions, boolean>;

export type ChoiceProps = {
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
};

export function validate(choice: Chosen, cookieChoices: Chosen) {
  const choices = Object.keys(choice);
  const chosen = Object.keys(cookieChoices);

  if (chosen.length !== choices.length) {
    return false;
  }

  return chosen.every((c) => choices.includes(c));
}

export const gdprLabelsEN: ChoiceProps & { choices: Choices } = {
  heading: "Cookie Preferences",
  description:
    'We use cookies to improve your experience and understand how our website is used. Essential cookies are required for the site to function, while analytics cookies help us improve our services. Please review our <a href="/privacy">privacy policy</a> for more details. You can manage your preferences below.',
  acceptAllLabel: "Accept all",
  acceptSelectedLabel: "Accept selected",
  rejectLabel: "Reject all",
  settingsLabel: "Preferences",
  closeLabel: "Close window",
  editLabel: "Edit settings",
  choices: {
    necessary: {
      label: "Essential cookies: ",
      description: "Required for website functionality including user authentication and security.",
      value: true,
      disabled: true
    },
    tracking: {
      label: "Tracking cookies: ",
      description: "Used for advertising purposes. Currently not used on this site.",
      value: false,
      disabled: true
    },
    analytics: {
      label: "Analytics cookies: ",
      description:
        "Used to control Google Analytics, a 3rd party tool offered by Google to track user behavior. Currently not used on this site.",
      value: false,
      disabled: true
    },
    marketing: {
      label: "Marketing cookies: ",
      description: "Used for marketing data. Currently not used on this site.",
      value: false,
      disabled: true
    }
  }
};

export const gdprLabelsFR: ChoiceProps & { choices: Choices } = {
  heading: "Préférences des cookies",
  description:
    'Nous utilisons des cookies pour offrir une meilleure expérience de navigation, analyser le trafic du site, personnaliser le contenu et diffuser des publicités ciblées. Veuillez consulter notre <a href="/privacy-policy">page de politique de confidentialité</a>. En cliquant sur accepter, vous consentez à notre politique de confidentialité et à l\'utilisation de cookies.',
  acceptAllLabel: "Tout accepter",
  acceptSelectedLabel: "Accepter la sélection",
  rejectLabel: "Tout refuser",
  settingsLabel: "Préférences",
  closeLabel: "Fermer la fenêtre",
  editLabel: "Modifier les paramètres",
  choices: {
    necessary: {
      label: "Cookies nécessaires: ",
      description: "Utilisés pour le contrôle des cookies. Ne peuvent pas être désactivés.",
      value: true,
      disabled: true
    },
    tracking: {
      label: "Cookies de suivi: ",
      description: "Utilisés à des fins publicitaires.",
      value: false,
      disabled: true
    },
    analytics: {
      label: "Cookies d'analyse: ",
      description:
        "Utilisés pour contrôler Google Analytics, un outil tiers proposé par Google pour suivre le comportement des utilisateurs.",
      value: false,
      disabled: true
    },
    marketing: {
      label: "Cookies marketing: ",
      description: "Utilisés pour les données marketing.",
      value: false,
      disabled: true
    }
  }
};

export const gdprLabelsIt: ChoiceProps & { choices: Choices } = {
  heading: "Preferenze sui cookie",
  description:
    'Utilizziamo i cookie per migliorare la tua esperienza e capire come viene utilizzato il nostro sito web. I cookie essenziali sono necessari per il funzionamento del sito, mentre i cookie di analisi ci aiutano a migliorare i nostri servizi. Consulta la nostra <a href="/privacy">informativa sulla privacy</a> per maggiori dettagli. Puoi gestire le tue preferenze qui sotto.',
  acceptAllLabel: "Accetta tutti",
  acceptSelectedLabel: "Accetta selezionati",
  rejectLabel: "Rifiuta tutti",
  settingsLabel: "Preferenze",
  closeLabel: "Chiudi finestra",
  editLabel: "Modifica impostazioni",
  choices: {
    necessary: {
      label: "Cookie essenziali: ",
      description: "Necessari per il funzionamento del sito web, inclusa l'autenticazione e la sicurezza.",
      value: true,
      disabled: true
    },
    tracking: {
      label: "Cookie di tracciamento: ",
      description: "Utilizzati per scopi pubblicitari. Attualmente non utilizzati su questo sito.",
      value: false,
      disabled: true
    },
    analytics: {
      label: "Cookie di analisi: ",
      description:
        "Utilizzati per controllare Google Analytics, uno strumento di terze parti offerto da Google per monitorare il comportamento degli utenti. Attualmente non utilizzati su questo sito.",
      value: false,
      disabled: true
    },
    marketing: {
      label: "Cookie di marketing: ",
      description: "Utilizzati per dati di marketing. Attualmente non utilizzati su questo sito.",
      value: false,
      disabled: true
    }
  }
};

export const getLocaleLabels: (locale: string) => ChoiceProps & { choices: Choices } = (locale) => {
  switch (locale) {
    case "en":
      return gdprLabelsEN;
    case "fr":
      return gdprLabelsFR;
    case "it":
      return gdprLabelsIt;
    default:
      return gdprLabelsEN;
  }
};
