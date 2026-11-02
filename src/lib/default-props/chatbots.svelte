<script module lang="ts">
  import { testAiChatbotHeader } from "../data/test-data.js";
  import default_ui from "../css-modules/default-ui.module.css";
  import default_outline_ui from "../css-modules/default-outline-ui.module.css";
  import { chatbots_static_props } from "./chatbots.js";
  import { withDynamicProps } from "./utils.js";
  import { Chat } from "@ai-sdk/svelte";
  import { DefaultChatTransport } from "ai";
  import { testLogoWhite } from "$lib/data/test-data.js";

  export const createChat = () =>
    new Chat({
      transport: new DefaultChatTransport({})
    });
  export const chatbots_default_props = withDynamicProps(chatbots_static_props, {
    AiChatbot: {
      props: {
        buttonClass: default_ui["default-ui"],
        suggestionButtonClass: default_outline_ui["default-outline-ui"],
        headerSnippet: AiChatbotHeaderSnippet
      }
    }
  });
</script>

{#snippet AiChatbotHeaderSnippet()}
  <div>
    <img src={testLogoWhite} alt="logo" width={60} height={60} />
  </div>
  <div>
    {testAiChatbotHeader.text} <a href="/">{testAiChatbotHeader.linkText}</a>.
  </div>
{/snippet}
