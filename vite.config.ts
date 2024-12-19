import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { fileURLToPath, URL } from "node:url"
import { resolve } from "path";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
    plugins: [vue(), vueDevTools(), dts()],
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "vue-component-lib-template",
            fileName: "vue-component-lib-template"
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue"
                }
            }
        }
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    }
});
