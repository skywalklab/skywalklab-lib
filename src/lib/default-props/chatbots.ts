import { component_descriptions } from "../stories/component-descriptions.js";
import { BRAND_LAB } from "../brand/data.js";
import { testCircleLogoInverse, testAiChatbot } from "../data/test-data.js";

export const chatbots_static_props = new Map<string, any>([
  [
    "AiChatbot",
    {
      storyDescription: component_descriptions.chatbots.get("AiChatbot"),
      props: {
        chat: {
          status: "ready",
          messages: []
        },
        sendMessage: (message: { text: string }) => {},
        openChat: true,
        logo: testCircleLogoInverse,
        company: BRAND_LAB.company,
        chatSuggestions: testAiChatbot.chatSuggestions,
        assistantGreetingMsg: testAiChatbot.assistantGreetingMsg,
        errorMessage: testAiChatbot.errorMessage,
        speakerLabels: testAiChatbot.speakerLabels,
        placeholder: testAiChatbot.placeholder,
        toggleHeight: "3rem",
        toggleBottom: "0.75rem",
        toggleRight: "0.5rem",
        float: false,
        buttonClass: "",
        suggestionButtonClass: "",
        style: "width: var(--full-width-min); height: 700px; margin: 0 auto; --default-outline-ui-color: #54575f;"
      }
    }
  ]
]);
