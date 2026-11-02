<script lang="ts">
  import { getLibraryLabels } from "../../utils/labels.js";
  import { marked } from "marked";
  import type { Action } from "svelte/action";
  import { fly } from "svelte/transition";
  import CopyIcon from "@lucide/svelte/icons/copy";
  import DownArrowIcon from "@lucide/svelte/icons/arrow-down";
  import UpArrowIcon from "@lucide/svelte/icons/arrow-up";
  import ExitChatIcon from "@lucide/svelte/icons/circle-x";
  import ChatBubbleIcon from "@lucide/svelte/icons/message-circle";
  import BrandLogoSpinner from "../animations/BrandLogoSpinner.svelte";
  import { onMount, type Snippet } from "svelte";

  interface Props {
    /**
     * The chat state the component reads. It never writes to it;
     * Recommended: pass an AI SDK `Chat` instance, which matches this shape as is.
     *
     * messages[].metadata: Only `messageLoadingLabel?: string` is read; shown beside the loading spinner. Typed `unknown` so AI SDK messages fit.
     *
     * messages[].parts[].type: Only `"text"` parts are rendered.
     *
     * Example:
     *
     * import { Chat } from "@ai-sdk/svelte";
     * import { DefaultChatTransport } from "ai";
     *
     * const chat = new Chat({ transport: new DefaultChatTransport({ api: "/api/chat" }) });
     *
     * Without the AI SDK, any reactive object with these fields works.
     */
    chat: {
      status: "submitted" | "streaming" | "ready" | "error" | (string & {});
      messages: {
        id?: string;
        role: "assistant" | "user" | (string & {});
        metadata?: unknown;
        parts: {
          type: "text" | (string & {});
          text?: string;
        }[];
      }[];
    };
    /** Sends the message to the api. If using the AI SDK `Chat` instance, use chat.sendMessage here. */
    sendMessage: (message: { text: string }) => void;
    /** Whether the chat panel is open. Bindable; the toggle button and greeting also set it. */
    openChat?: boolean;
    /** Logo image URL, shown beside each assistant message and in the loading spinner. */
    logo: string;
    /** Company name, used in the header, the message labels and the input placeholder. */
    company: string;
    /** Prompts shown as buttons above the input. Each one disappears once it has been sent. */
    chatSuggestions?: string[];
    /** First rendered message in the chatbot, also used as the text of the greeting popup. */
    assistantGreetingMsg?: string;
    /** Name shown above each message, keyed by the message's role. Defaults to `"You"` for `user` and `"{company} AI Assistant"` for `assistant`. */
    speakerLabels?: Record<"assistant" | "user" | (string & {}), string>;
    /** Text shown when a request fails. */
    errorMessage?: string;
    /** Placeholder text shown in the empty message input. Defaults to `"Ask me anything about {company}"`. */
    placeholder?: string;
    /** Height of the floating toggle button. Sets `--ai-chatbot-toggle-height`. */
    toggleHeight?: string;
    /** Distance from the toggle button to the bottom of the viewport. Sets `--ai-chatbot-toggle-bottom`. */
    toggleBottom?: string;
    /** Distance from the toggle button to the right of the viewport. Sets `--ai-chatbot-toggle-right`. */
    toggleRight?: string;
    /** Whether the panel floats over the page, anchored to the toggle button. When `false`, it fills the container instead. */
    float?: boolean;
    /** Class applied to the send button alongside its own, e.g. a button CSS module from `@skywalklab/lib/css-modules`. */
    buttonClass?: string;
    /** Class applied to each suggested-prompt button alongside its own, e.g. a button CSS module from `@skywalklab/lib/css-modules`. */
    suggestionButtonClass?: string;
    /** Rendered inside the root element, behind the panel, greeting and toggle button, e.g. an absolutely positioned element sitting alongside the chatbot for decoration or extra info. */
    children?: Snippet;
    /** Rendered in the header after the title and before the close control, e.g. a logo, an icon or a status badge. Use it in place of `title` for a header of the caller's own. */
    headerSnippet?: Snippet;
    /** Inline CSS applied to the root element. */
    style?: string;
  }

  type AiMessage = Omit<Props["chat"]["messages"][number], "metadata"> & {
    metadata?: { messageLoadingLabel?: string; index?: number };
  };

  let {
    chat,
    sendMessage,
    openChat = $bindable(false),
    logo,
    company,
    chatSuggestions = [],
    assistantGreetingMsg = "👋 Welcome to the chat",
    errorMessage = "Error calling the AI",
    placeholder = `Ask me anything about ${company}`,
    speakerLabels = { user: "You", assistant: `${company} AI Assistant` },
    toggleHeight,
    toggleBottom,
    toggleRight,
    float = false,
    buttonClass,
    suggestionButtonClass,
    children,
    headerSnippet,
    style
  }: Props = $props();

  let lastMessage = $state<AiMessage | undefined>(undefined);
  let messagesContainer = $state<HTMLDivElement | undefined>(undefined);
  let assistantCTA = $state<boolean>(true);
  let input = $state<string>("");
  let suggestedPrompts = $derived<string[]>(chatSuggestions);
  let isScrolledUp = $state<boolean>(false);
  const isLoading = $derived<boolean>(
    chat.status === "submitted" || (chat.status === "streaming" && !isStreamingText())
  );
  const isReady = $derived<boolean>(chat.status === "ready");
  const hasError = $derived<boolean>(chat.status === "error");
  const canSubmit = $derived<boolean>(isReady || hasError);
  const uid: string = $props.id();
  const labels = getLibraryLabels();

  const clearInput = () => (input = "");

  function handleSubmit(text: string): boolean {
    if (!text || text.trim() == "" || !canSubmit) return false;

    sendMessage({ text });
    return true;
  }

  function handleForm(event: SubmitEvent) {
    event.preventDefault();
    const submitted = handleSubmit(input);
    if (submitted) clearInput();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key !== "Enter" || event.shiftKey) return;
    event.preventDefault();
    const submitted = handleSubmit(input);
    if (submitted) clearInput();
  }

  function handlePromptSuggestion(message: string) {
    const submitted = handleSubmit(message);
    if (!submitted) return;

    suggestedPrompts = suggestedPrompts.filter((suggestedPrompt) => suggestedPrompt != message);
  }

  function isStreamingText() {
    const lastPart = lastMessage?.parts[lastMessage.parts.length - 1];
    return lastPart && lastPart.type === "text" && lastPart.text && lastPart.text.length > 1;
  }

  const copyToTheClipboard = (e: Event, message: AiMessage) => {
    const text = message.parts
      .filter((part: { type: string }) => part.type == "text")
      .map((part: { text?: string }) => part.text ?? "")
      .join(" ");
    const btn = e.currentTarget as HTMLButtonElement;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        btn.classList.add("copied");
        setTimeout(function () {
          btn.classList.remove("copied");
        }, 1000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleScrollDownBtn = (e: Event) => {
    const node = e.currentTarget as HTMLDivElement;
    const messageElements = [...node.querySelectorAll(".ai-chatbot--message")];
    const lastMessageBox = messageElements.at(-1)?.getBoundingClientRect();
    if (!lastMessageBox) return;

    isScrolledUp = lastMessageBox.y > node.clientHeight * 1.5;
  };

  const handleScrollDown: Action<HTMLElement> = (node) => {
    node.addEventListener("scroll", handleScrollDownBtn);

    $effect(() => {
      return () => node.removeEventListener("scroll", handleScrollDownBtn);
    });
  };

  const scrollToLastMessage = () => {
    messagesContainer?.scrollTo({ top: messagesContainer.scrollHeight, behavior: "smooth" });
  };

  $effect(() => {
    if (!chat.messages) return;

    const messagesCount = chat.messages.length;
    const mostRecentMessage = chat.messages[messagesCount - 1] as AiMessage;
    lastMessage = undefined;
    if (!mostRecentMessage) return;

    lastMessage = {
      ...mostRecentMessage,
      metadata: { ...mostRecentMessage.metadata, index: messagesCount - 1 }
    };

    if (chat.status === "submitted") {
      requestAnimationFrame(() => {
        scrollToLastMessage();
      });
    }
  });

  onMount(() => {
    import("github-markdown-css" as any);
  });
</script>

{#snippet MessageSnippet(message: Props["chat"]["messages"][number])}
  <li class="ai-chatbot--message" class:user={message.role === "user"} class:not-ready={!canSubmit}>
    <div class="ai-chatbot--role" style:--ai-chatbot-background-image="url('{logo.replaceAll("'", '%27')}')">
      {speakerLabels[message.role]}:
    </div>
    <div class="ai-chatbot--message-parts">
      {#each message.parts as part, partIndex (partIndex)}
        {#if part.type === "text" && "text" in part && part.text}
          <!-- eslint-disable-next-line svelte/no-at-html-tags -->
          <div class="markdown-body">{@html marked(part.text)}</div>
        {/if}
      {/each}
      {#if message.role === "assistant"}
        <div class="ai-chatbot--message-tools">
          <button
            class="ai-chatbot--copy-message-button"
            aria-label={labels.copyMessage}
            onclick={(e) => copyToTheClipboard(e, message as AiMessage)}>
            <CopyIcon style="height: 100%; width: 100%; transition: color 0.15s linear; color: currentColor;" />
          </button>
        </div>
      {/if}
    </div>
  </li>
{/snippet}
<div
  id="ai-chatbot-{uid}"
  class="ai-chatbot"
  class:open-chat={openChat}
  class:float
  style:--ai-chatbot-toggle-height={toggleHeight}
  style:--ai-chatbot-toggle-bottom={toggleBottom}
  style:--ai-chatbot-toggle-right={toggleRight}
  {style}>
  {@render children?.()}
  {#if openChat}
    <div
      class="ai-chatbot--panel"
      class:float
      transition:fly={{ y: "25px" }}
      id="ai-chatbot-panel-{uid}"
      role="region"
      aria-label={labels.aiChat(company)}>
      <div class="ai-chatbot--heading">
        {#if headerSnippet}
          {@render headerSnippet()}
        {/if}
        <div class="ai-chatbot--status-indicator"></div>
      </div>
      <div class="ai-chatbot--messages-container" bind:this={messagesContainer} use:handleScrollDown>
        <ul class="ai-chatbot--messages" aria-live="polite" aria-atomic="false">
          {@render MessageSnippet({
            id: "1",
            role: "assistant",
            parts: [{ type: "text", text: assistantGreetingMsg }]
          })}
          {#each chat.messages as message, messageIndex (messageIndex)}
            {@render MessageSnippet(message)}
          {/each}
          {#if canSubmit && suggestedPrompts.length > 0}
            <li class="ai-chatbot--suggestion">
              {#each suggestedPrompts as suggestion, i (i)}
                <button
                  class="{suggestionButtonClass} ai-chatbot--suggestion-button"
                  onclick={() => handlePromptSuggestion(suggestion)}>
                  {suggestion}
                </button>
              {/each}
            </li>
          {/if}
          {#if isLoading}
            <li class="ai-chatbot--loading" role="status" aria-live="polite">
              <BrandLogoSpinner
                style="position: relative; width: fit-content;"
                icon={logo}
                iconProps={{ alt: "" }}
                size={22} />
              {#if lastMessage?.metadata?.messageLoadingLabel}
                <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                <div class="markdown-body">{@html marked(lastMessage.metadata.messageLoadingLabel)}</div>
              {/if}
            </li>
          {/if}
          {#if hasError}
            <li class="ai-chatbot--error" role="alert">
              <div class="ai-chatbot--error-message">{errorMessage}</div>
            </li>
          {/if}
        </ul>
        {#if isScrolledUp}
          <button
            class="ai-chatbot--scroll-down-button"
            aria-label={labels.scrollToBottom}
            onclick={scrollToLastMessage}>
            <DownArrowIcon style="display: block; width: fit-content; margin: 0 auto; height: 1rem;" />
          </button>
        {/if}
      </div>
      <form class="ai-chatbot--form" onsubmit={handleForm}>
        <textarea autocomplete="off" rows="2" {placeholder} onkeydown={handleKeydown} bind:value={input}></textarea>
        <button
          class="{buttonClass} ai-chatbot--button"
          aria-label={labels.sendMessage}
          disabled={!canSubmit}
          type="submit">
          <UpArrowIcon style="width: 100%;" />
        </button>
      </form>
    </div>
  {/if}
  {#if assistantCTA}
    <div class="ai-chatbot--greeting">
      <button
        class="ai-chatbot--greeting-close"
        aria-label={labels.removeMessage}
        onclick={() => (assistantCTA = false)}>
        <ExitChatIcon style="color: var(--error, red); width: 100%;" />
      </button>
      <button
        class="ai-chatbot--greeting-open"
        onclick={() => {
          openChat = true;
          assistantCTA = false;
        }}>{assistantGreetingMsg}</button>
    </div>
  {/if}
  <div class="ai-chatbot--toggle">
    <button
      onclick={() => {
        openChat = !openChat;
        assistantCTA = false;
      }}
      aria-label={labels.openChatbot(company)}
      aria-controls="ai-chatbot-panel-{uid}"
      aria-expanded={openChat}>
      {#if openChat}
        <ExitChatIcon style="height: 75%; width: auto; color: #fff;" />
      {:else}
        <ChatBubbleIcon style="height: 75%; width: auto; color: #fff;" />
      {/if}
    </button>
  </div>
</div>

<style>
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
</style>
