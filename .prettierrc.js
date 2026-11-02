import baseConfig from "../../.prettierrc.json" with { type: "json" };

export default {
  ...baseConfig,
  plugins: ["prettier-plugin-svelte"],
  overrides: [
    {
      files: "*.svelte",
      options: {
        parser: "svelte"
      }
    }
  ]
};
