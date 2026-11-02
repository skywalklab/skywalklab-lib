<svelte:options
  customElement={{
    tag: "skywalk-ai-chatbot",
    shadow: {
      mode: "open",
      delegatesFocus: true
    },
    props: {
      chat: { type: "Object", attribute: "sw-chat" },
      sendMessage: { type: "Object" },
      openChat: { type: "Boolean", attribute: "sw-open-chat", reflect: true },
      logo: { type: "String", attribute: "sw-logo" },
      company: { type: "String", attribute: "sw-company" },
      chatSuggestions: { type: "Array", attribute: "sw-chat-suggestions" },
      assistantGreetingMsg: { type: "String", attribute: "sw-assistant-greeting-msg" },
      speakerLabels: { type: "Object", attribute: "sw-speaker-labels" },
      errorMessage: { type: "String", attribute: "sw-error-message" },
      placeholder: { type: "String", attribute: "sw-placeholder" },
      toggleHeight: { type: "String", attribute: "sw-toggle-height" },
      toggleBottom: { type: "String", attribute: "sw-toggle-bottom" },
      toggleRight: { type: "String", attribute: "sw-toggle-right" },
      float: { type: "Boolean", attribute: "sw-float" },
      buttonClass: { type: "String", attribute: "sw-button-class" },
      suggestionButtonClass: { type: "String", attribute: "sw-suggestion-button-class" },
      style: { type: "String", attribute: "sw-style" }
    },
    extend: (Base) =>
      class extends Base {
        // Re-run on every attribute change, not once on connect: a class prop naming a css-module
        // may be set after the element is in the DOM, and the sheet it names is found by that name.
        #adopt() {
          this.shadowRoot!.adoptedStyleSheets = shadowSheets(this, "chatbots/AiChatbot", false);
        }

        connectedCallback() {
          this.#adopt();
          return (Base.prototype as any).connectedCallback.call(this);
        }

        attributeChangedCallback(...args: any[]) {
          const result = (Base.prototype as any).attributeChangedCallback.apply(this, args);
          if (this.shadowRoot) this.#adopt();
          return result;
        }
      }
  }} />

<script module lang="ts">
  import { shadowSheets } from "../../utils/shadow-styles.js";
</script>

<script lang="ts">
  /* eslint-disable svelte/no-useless-children-snippet */
  import AiChatbot from "../../components/chatbots/AiChatbot.svelte";

  let { chat, sendMessage, openChat = $bindable(false), logo, company, chatSuggestions, assistantGreetingMsg, speakerLabels, errorMessage, placeholder, toggleHeight, toggleBottom, toggleRight, float, buttonClass, suggestionButtonClass, style }: any = $props();
</script>

<AiChatbot {chat} {sendMessage} bind:openChat={openChat} {logo} {company} {chatSuggestions} {assistantGreetingMsg} {speakerLabels} {errorMessage} {placeholder} {toggleHeight} {toggleBottom} {toggleRight} {float} {buttonClass} {suggestionButtonClass} {style} >
  {#snippet children()}
    <slot />
  {/snippet}
{#snippet headerSnippet()}
    <slot name="headerSnippet"/>
  {/snippet}
</AiChatbot>


<style>
  :host {
    display: block;
  }

  :global {
:where(.ai-chatbot) {
    --ai-chatbot-bottom: calc(var(--ai-chatbot-toggle-bottom, 0.75rem) + var(--ai-chatbot-toggle-height, 3rem) + 4px);
    width: 100%;
    height: 100%;
    position: relative;

    &.open-chat {
      .ai-chatbot--greeting {
        display: none;
      }

      .ai-chatbot--toggle {
        background-color: var(--error, red);
      }
    }

    &.float {
      position: unset;
    }

    .ai-chatbot--greeting {
      position: absolute;
      bottom: var(--ai-chatbot-bottom);
      padding-bottom: 0.5rem;
      right: var(--ai-chatbot-toggle-right, 0.5rem);
      z-index: 5;
      display: none;

      @media (min-width: 480px) {
        display: flex;
        flex-direction: column;
      }

      .ai-chatbot--greeting-close {
        border: none;
        background-color: transparent;
        cursor: pointer;
        align-self: flex-end;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary, black);

        &:hover {
          color: var(--error, red);
        }
      }

      .ai-chatbot--greeting-open {
        border: none;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        padding: 0.5rem 0.75rem;
        color: var(--primary, black);
      }
    }

    .ai-chatbot--toggle {
      position: absolute;
      bottom: var(--ai-chatbot-toggle-bottom, 0.75rem);
      right: var(--ai-chatbot-toggle-right, 0.5rem);
      border-radius: 50%;
      background-color: var(--accent, lightblue);
      height: var(--ai-chatbot-toggle-height, 3rem);
      width: var(--ai-chatbot-toggle-height, 3rem);
      z-index: 5;

      button {
        background-color: transparent;
        border: 0px;
        height: 100%;
        width: 100%;
        transform: rotate(-10deg);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .ai-chatbot--panel {
      position: relative;
      width: 100%;
      height: calc(100% - var(--ai-chatbot-bottom));
      border: 1px solid var(--accent, lightblue);
      color: var(--primary, black);
      border-radius: 8px;
      overflow: hidden;
      background-color: #fff;
      z-index: 900;
      display: flex;
      flex-direction: column;
      background-color: #fff;

      &.float {
        position: absolute;
        bottom: var(--ai-chatbot-bottom);
        right: 0.5rem;
        height: 100%;
        min-height: 40svh;
        max-height: calc(99svh - var(--ai-chatbot-bottom));
        max-width: 500px;
        min-width: 285px;
        width: calc(99vw - var(--ai-chatbot-toggle-right, 0.5rem));
      }

      @media (min-width: 480px) {
        margin: 0;
        right: var(--ai-chatbot-toggle-right, 0.5rem);
      }

      .ai-chatbot--heading {
        background-color: var(--primary, black);
        color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.25rem;
        font-size: 15px;
        padding: 0.5rem;
        position: relative;

        .ai-chatbot--status-indicator {
          position: absolute;
          top: 0.5rem;
          left: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.25rem;

          &::before {
            content: "";
            background-color: var(--accent-analogous-2, paleturquoise);
            width: 10px;
            height: 10px;
            border-radius: 8px;
          }
        }
      }

      .ai-chatbot--messages-container {
        flex: 1;
        overflow-y: auto;

        .ai-chatbot--messages {
          min-height: 100%;
          width: 100%;
          padding: 1rem clamp(0.25rem, 2vw, 1rem) 1rem;
          margin: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          color: var(--primary, black);

          .ai-chatbot--message {
            .ai-chatbot--role {
              font-size: 20px;
              display: flex;
              align-items: center;
              gap: 0.25rem;
              margin-bottom: 0.25rem;

              &::before {
                content: "";
                background-image: var(--ai-chatbot-background-image);
                background-size: contain;
                background-repeat: no-repeat;
                height: 1.5rem;
                width: 1.5rem;
                display: block;
              }
            }

            &:hover .ai-chatbot--message-parts .ai-chatbot--message-tools {
              display: flex;
            }

            .ai-chatbot--message-parts {
              background-color: rgb(241, 243, 245);
              padding: 8px;
              border-radius: 8px;
              position: relative;
              z-index: 2;

              .ai-chatbot--message-tools {
                position: absolute;
                left: 0;
                bottom: -0.5rem;
                margin-block: auto;
                background-color: rgba(255, 255, 255, 0.7);
                border-radius: 50%;
                display: none;
                align-items: center;
                height: 1.5rem;
                width: 1.5rem;
                padding: 2px;

                .ai-chatbot--copy-message-button {
                  border: none;
                  background: transparent;
                  cursor: pointer;
                  display: flex;
                  height: 100%;
                  width: 100%;
                  color: var(--primary, black);

                  &:hover {
                    color: var(--accent, lightblue);
                  }

                  :global {
                    &.copied::after {
                      content: "Copied";
                      color: var(--primary, black);
                      text-decoration: none;
                      font-size: 12px;
                      padding: 0 0.25rem;
                      border: 1px solid color-mix(in srgb, currentColor 40%, #fff);
                      border-radius: 6px;
                      background-color: white;
                      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
                      position: absolute;
                      top: -1rem;
                      left: 0;
                    }
                  }
                }
              }
            }

            &.user {
              .ai-chatbot--role {
                &::before {
                  display: none;
                }
              }

              .ai-chatbot--message-parts {
                background-color: var(--primary, black);
                color: #fff;
              }
            }
          }

          .ai-chatbot--suggestion {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            margin-top: auto;

            .ai-chatbot--suggestion-button {
              font-size: 14px;

              &:first-of-type {
                margin-top: 2rem;
              }
            }
          }

          .ai-chatbot--loading {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 14px;

            .markdown-body {
              background-color: inherit;
              color: inherit;

              :global {
                p {
                  flex: unset;
                  width: fit-content;
                  margin: 0;
                }

                ul {
                  padding: 0 0 0 1rem;
                  list-style-type: disclosure-closed;
                }

                li {
                  margin: 0;
                }
              }
            }
          }

          .ai-chatbot--error {
            .ai-chatbot--error-message {
              background-color: color-mix(in srgb, var(--error, red) 15%, #fff);
              border: 1px solid var(--error, red);
              border-radius: 8px;
              padding: 0.75rem;
              font-size: 14px;
              color: var(--primary, black);
            }
          }
        }

        .ai-chatbot--scroll-down-button {
          position: absolute;
          bottom: 6rem;
          left: 0;
          right: 0;
          margin: 0 auto;
          width: fit-content;
          border: none;
          border-radius: 50%;
          padding: 0.5rem;
          box-shadow: 2px 4px rgba(0, 0, 0, 0.3);
          background-color: #fff;
          z-index: 4;
          transition:
            background-color 0.15s linear,
            color 0.15s linear;

          &:hover,
          &:focus-visible {
            background-color: var(--primary, black);
            color: #fff;
          }
        }
      }

      :global {
        @media (prefers-color-scheme: dark) {
          .markdown-body {
            color-scheme: light;
            --fgColor-default: inherit;
            --fgColor-muted: inherit;
            --fgColor-accent: var(--accent-dark, slategray);
            --fgColor-success: var(--accent-dark-analogous-2, cadetblue);
            --fgColor-attention: inherit;
            --fgColor-danger: var(--error, red);
            --fgColor-done: var(--accent-dark-analogous-1, darkslateblue);
            --bgColor-default: inherit;
            --bgColor-muted: inherit;
            --bgColor-neutral-muted: inherit;
            --bgColor-attention-muted: inherit;
            --borderColor-default: #d1d9e0;
            --borderColor-muted: #d1d9e0b3;
            --borderColor-neutral-muted: #d1d9e0b3;
            --borderColor-accent-emphasis: #0969da;
            --borderColor-success-emphasis: #1a7f37;
            --borderColor-attention-emphasis: #9a6700;
            --borderColor-danger-emphasis: #cf222e;
            --borderColor-done-emphasis: #8250df;
          }
        }
      }

      .ai-chatbot--form {
        position: relative;
        z-index: 2;
        margin: 0 clamp(0.25rem, 2vw, 1rem) 0.5rem;
        padding: 0.5rem;
        display: flex;
        gap: 0.5rem;
        align-items: stretch;
        justify-content: center;
        border: 1px solid var(--primary, black);
        border-radius: 8px;

        &:focus-within,
        &:focus {
          outline: 2px solid var(--primary, black);
        }

        textarea {
          resize: none;
          border: none;
          flex: 1;
          min-width: 180px;
          outline: 0px;
          padding-left: 0.5rem;
          font-size: 15px;
        }

        .ai-chatbot--button {
          align-self: center;
          padding: 0.25rem;
          height: 2rem;
          width: 2rem;
        }
      }
    }
  }

.brand-logo-spinner {
    background-color: transparent;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    pointer-events: none;

    .brand-logo-spinner--img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      display: grid;
      place-items: center;
    }
  }

.svelte-spinner {
    color: inherit;
  }
  }
</style>
      