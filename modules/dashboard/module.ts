import { defineNuxtModule } from "@nuxt/kit";
import path from "path";

export default defineNuxtModule({
  meta: {
    name: "dashboard-module",
    configKey: "dashboard-module",
  },
  defaults: {},
  hooks: {
    // ROUTES
    "pages:extend"(pages) {
      pages.push({
        name: "dashboard-page",
        path: "/dashboard",
        file: path.resolve(__dirname, "./pages/dashboard/index.vue"),
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
