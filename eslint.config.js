import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import js from "@eslint/js";
import { globalIgnores } from "eslint/config";
import pluginCypress from 'eslint-plugin-cypress';

export default [
  // add more generic rulesets here, such as:
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  pluginCypress.configs.recommended,
  // ...pluginVue.configs['flat/vue2-recommended'], // Use this if you are using Vue.js 2.x.
  {
    rules: {
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
    },
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  globalIgnores(["**/cypress/*", "**/node_modules/*", "**/dist/*", "**/build/*", "**/public/*", "**/coverage/*"]),
];
