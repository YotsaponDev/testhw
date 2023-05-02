import { defineNuxtModule } from "@nuxt/kit";
import path from "path";

export default defineNuxtModule({
  meta: {
    name: "blog-module",
    configKey: "blog-module",
  },
  defaults: {},
  hooks: {
    // ROUTES
    "pages:extend"(pages) {
      pages.push({
        name: "blog-page",
        path: "/blog/:id",
        file: path.resolve(__dirname, "./pages/blog/[id].vue"),
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
