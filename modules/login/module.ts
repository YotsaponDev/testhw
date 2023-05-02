import { defineNuxtModule } from "@nuxt/kit";
import path from "path";

export default defineNuxtModule({
  meta: {
    name: "login-module",
    configKey: "login-module",
  },
  defaults: {},
  hooks: {
    // ROUTES
    "pages:extend"(pages) {
      pages.push({
        name: "login-page",
        path: "/login",
        file: path.resolve(__dirname, "./pages/login/index.vue"),
        meta: {
          layout: "login"
        }
      });
      pages.push({
        name: "login-page-callback",
        path: "/login/callback",
        file: path.resolve(__dirname, "./pages/login/callback.vue"),
        meta: {
          layout: "login"
        }
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