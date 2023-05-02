import { defineNuxtModule } from "@nuxt/kit";
import path from "path";

export default defineNuxtModule({
  meta: {
    name: "sales-module",
    configKey: "sales-module",
  },
  defaults: {},
  hooks: {
    // ROUTES
    "pages:extend"(pages) {
      pages.push({
        name: "sales-page",
        path: "/sales",
        file: path.resolve(__dirname, "./pages/sales/index.vue"),
      });
      pages.push({
        name: "sales-page-create-ticket",
        path: "/sales/create-ticket",
        file: path.resolve(__dirname, "./pages/sales/create-ticket.vue"),
      });
      pages.push({
        name: "sales-page-ticket",
        path: "/sales/ticket/:id",
        file: path.resolve(__dirname, "./pages/sales/ticket/id.vue"),
      });
      pages.push({
        name: "sales-page-add-customer",
        path: "/sales/add-customer",
        file: path.resolve(__dirname, "./pages/sales/add-customer.vue"),
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
