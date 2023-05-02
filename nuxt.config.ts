// https://nuxt.com/docs/api/configuration/nuxt-config import { useStore } from
// './store'
import fs from 'fs'
import en from "./lang/en.ts";
import th from "./lang/th.ts";

export default defineNuxtConfig({
  // ssr: false,
  app: {
    head: {
      meta: [
        {
          charset: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "/style/scss/global.scss",
        },
        {
          rel: "stylesheet",
          href: "/adminlte/plugins/fontawesome-free/css/all.min.css",
        },
        {
          rel: "stylesheet",
          href: "/adminlte/dist/css/adminlte.min.css",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700",
        },
        {
          rel: "stylesheet",
          href: "/jquery.Thailand.js/dist/jquery.Thailand.min.css",
        },
      ],
      script: [
        {
          src: "/adminlte/plugins/jquery/jquery.min.js",
          body: true,
        },
        {
          src: "/adminlte/plugins/bootstrap/js/bootstrap.bundle.min.js",
          body: true,
        },
        {
          src: "/adminlte/dist/js/adminlte.min.js",
          body: true,
        },
        {
          src: "/jquery.Thailand.js/jquery-3.2.1.min.js",
          body: true,
        },
        {
          src: "/jquery.Thailand.js/dependencies/JQL.min.js",
          body: true,
        },
        {
          src: "/jquery.Thailand.js/dependencies/typeahead.bundle.js",
          body: true,
        },
        {
          src: "/jquery.Thailand.js/dist/jquery.Thailand.min.js",
          body: true,
        },
      ],
      bodyAttrs: {
        class: "hold-transition sidebar-mini layout-fixed",
      },
    },
  },
  modules: [
    "@pinia/nuxt",
    "~/modules/login/module",
    "~/modules/dashboard/module",
    "~/modules/sales/module",
    "~/modules/coordinate/module",
    "~/modules/account/module",
    "@nuxtjs/i18n",
    '@sidebase/nuxt-auth'
  ],
  i18n: {
    locales: ["th", "en"],
    strategy: "no_prefix",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root", // recommended
    },
    defaultLocale: "th",
    vueI18n: {
      fallbackLocale: "th",
      messages: {
        en,
        th,
      },
    },
  },
  auth: {
    // enableGlobalAppMiddleware: true,
    origin: process.env.NODE_ENV == "development" ? null : "https://localhost:3000",
  },
  components: {
    global: true,
    dirs: ["~/components"],
  },
  server: {
    https: {
      key: fs.readFileSync('./public/https/key.pem'),
      cert: fs.readFileSync('./public/https/cert.pem')
    }
  },
  runtimeConfig: {
    NUXT_PUBLIC_URL_API: process.env.NUXT_PUBLIC_URL_API,
    public: {
      NUXT_PUBLIC_URL_API: process.env.NUXT_PUBLIC_URL_API,
    }
  },
  build: { transpile: ['@vee-validate/rules'] }
  // generate: {
  //   crawler: false,
    // routes: [
    //   '/',
    //   '/login',
    //   '/dashboard',
    //   '/sales/create-ticket'
    // ]
  // }
  // nitro: {
  //   prerender: {
  //     routes: [
  //       '/',
  //       '/login',
  //       '/dashboard',
  //       '/sales/create-ticket'
  //     ]
  //   }
  // }
});
