import { defineNuxtModule } from "@nuxt/kit";
import path from "path";

export default defineNuxtModule({
  meta: {
    name: "account-module",
    configKey: "account-module",
  },
  defaults: {},
  hooks: {
    // ROUTES
    "pages:extend"(pages) {
      pages.push({
        name: "account-page-ticket",
        path: "/account/ticket/:id",
        file: path.resolve(__dirname, "./pages/account/ticket/id.vue"),
      });
    },

    // COMPONENTS
    "components:dirs"(dirs) {
      // Add ./components dir to the list
      dirs.push({
        path: path.resolve(__dirname, "./components"),
        pathPrefix: false,
      });
    },
  },
  async setup(moduleOptions, nuxt) {
    // -- Add your module logic here --
  },
});
