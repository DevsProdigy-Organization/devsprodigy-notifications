import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    build: {
        lib:{
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'devsprodigy-notifications',
            fileName: (format) => `devsprodigy-notifications.${format}.js`,
            formats: ['es', 'umd'],
        },
        rollupOptions: {
            external: ['tailwindcss'],
            output: {
                globals: {
                    tailwindcss: 'tailwindcss',
                },
            },
        },
    },
});