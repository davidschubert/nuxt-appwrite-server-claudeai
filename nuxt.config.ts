// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
    compatibilityDate: "2024-07-22",

    // Basis-Konfiguration
    devtools: { enabled: false },

    // Neue Nuxt 4 Struktur unter app/
    srcDir: "app",

    experimental: {
        typedPages: true,
    },

    // Modules
    modules: ["@pinia/nuxt", "@nuxt/ui"],

    // CSS
    css: ['~/assets/css/main.css'],

    ui: {
        fonts: false
    },

    // Components auto-import
    components: [{ path: "~/components", pathPrefix: true }],

    pinia: {
        autoImports: ["defineStore"],
    } as any,

    // Auto-import für Stores (app/stores)
    imports: { dirs: ["stores"] },

    // Runtime Config
    runtimeConfig: {
        appwriteApiKeySecret: process.env.APPWRITE_API_KEY_SECRET,
        openaiApiKeySecret: process.env.OPENAI_API_KEY_SECRET,
        openaiModel: process.env.OPENAI_MODEL,
        public: {
            appwriteEndpoint: process.env.APPWRITE_ENDPOINT,
            appwriteProjectId: process.env.APPWRITE_PROJECT_ID,
            appwriteDatabaseId: process.env.APPWRITE_DATABASE_ID,
            appwriteCollectionOrders: process.env.APPWRITE_COLLECTION_ORDERS,
        },
    },

    router: {
        middleware: ["appwrite-auth-always"],
    } as any,

    // App Config (für öffentliche Konfigurationen)
    app: {
        /* pageTransition: { name: "page", mode: "out-in" }, */
    },

    /* plugins: ["~/plugins/auth.ts"], */

    // Nitro (Server) Konfiguration
    /* nitro: {
        routeRules: {
            "/api/**": {
                cors: true,
                headers: {
                    "Access-Control-Allow-Methods":
                        "GET,HEAD,PUT,PATCH,POST,DELETE",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Headers":
                        "Origin, X-Requested-With, Content-Type, Accept",
                },
            },
        },
    }, */

    // Typescript
    typescript: {
        strict: true,
    },
} as any);
