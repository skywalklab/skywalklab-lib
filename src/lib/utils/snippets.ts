const setProp = (el: HTMLElement, key: string, value: unknown) => {
  if (key === "class" || key === "className") {
    el.className = String(value ?? "");
  } else if (key === "classList") {
    for (const [name, on] of Object.entries(value as Record<string, boolean>)) {
      el.classList.toggle(name, !!on);
    }
  } else if (key === "style" && typeof value === "object") {
    Object.assign(el.style, value);
  } else if (key === "dataset" && typeof value === "object") {
    Object.assign(el.dataset, value);
  } else if (value == null) {
    el.removeAttribute(key);
  } else if (key in el) {
    (el as any)[key] = value;
  } else {
    el.setAttribute(key, String(value));
  }
};

export const snippetWrap = (snippet: any) => {
  if (!snippet) return;

  let callback = snippet;
  callback = function (this: any, ...args: any) {
    const result = snippet.apply(this, args);
    const anchor = args[0];

    queueMicrotask(() => {
      if (typeof ShadowRoot === "undefined") return;

      const root = anchor?.getRootNode?.();
      if (!(root instanceof ShadowRoot)) return;

      const snippetArgs: Record<string, any> = args[1]?.();
      if (snippetArgs == undefined) return;

      const host = root.host;
      const elements = [...anchor.parentElement.querySelectorAll("*")].flatMap((el) => {
        if (!(el instanceof HTMLSlotElement)) return [el];

        const selector = el.name ? `[slot="${el.name}"]` : ":not([slot])";
        const template = [...host.children].filter((node) => node.matches(selector));
        if (!template.length) return [];

        const clones = template.map((node) => node.cloneNode(true) as HTMLElement);
        el.replaceWith(...clones);
        return clones.flatMap((node) => [node, ...node.querySelectorAll("*")]);
      });

      elements.forEach((el: any) => {
        Object.entries({ ...el.dataset }).forEach(([domProp, dataProp]) => {
          if (!dataProp) return;

          const [dataKey, dataVal] = (dataProp as string).split(".") as string[];
          const snippetArg = snippetArgs[dataKey];

          let value;
          switch (typeof snippetArg) {
            case "object":
              if (dataVal in snippetArg) {
                value = snippetArg[dataVal];
              }
              break;
            case "boolean":
              value = { [dataVal]: snippetArg };
              break;
            default:
              value = snippetArg;
          }

          if (value !== undefined) setProp(el, domProp, value);
        });
      });
    });

    return result;
  };

  return callback;
};
