import { configure, defineRule } from "vee-validate";
import * as rules from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";
import en from "@vee-validate/i18n/dist/locale/en.json";
import th from "@vee-validate/i18n/dist/locale/th.json";

export default defineNuxtPlugin((nuxtApp) => {
  Object.keys(rules)
    .filter((k) => k !== "default")
    .forEach((rule) => {
      defineRule(rule, rules[rule]);
      // console.log(rule);
    });
  // // Configure Vee-Validate
  configure({
    generateMessage: localize({
      en,
      th,
    }),
  });
  // // Set the locale
  localize(
    nuxtApp.$i18n.getLocaleCookie() ? nuxtApp.$i18n.getLocaleCookie() : "th"
  );
});
