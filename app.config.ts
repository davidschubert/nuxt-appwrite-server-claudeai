// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - defineAppConfig wird von Nuxt als global bereitgestellt
export default defineAppConfig({
    ui: {
        colors: {
            primary: "green",
            secondary: "purple",
            success: "green",
            info: "blue",
            warning: "amber",
            error: "red",
            neutral: "slate",
        },
        icons: {
            arrowLeft: "i-heroicons-arrow-left-20-solid",
            arrowRight: "i-heroicons-arrow-right-20-solid",
            check: "i-heroicons-check-20-solid",
            chevronDoubleLeft: "i-heroicons-chevron-double-left-20-solid",
            chevronDoubleRight: "i-heroicons-chevron-double-right-20-solid",
            chevronDown: "i-heroicons-chevron-down-20-solid",
            chevronLeft: "i-heroicons-chevron-left-20-solid",
            chevronRight: "i-heroicons-chevron-right-20-solid",
            chevronUp: "i-heroicons-chevron-up-20-solid",
            close: "i-heroicons-x-mark-20-solid",
            danger: "i-heroicons-exclamation-triangle-20-solid",
            external: "i-heroicons-arrow-top-right-on-square-20-solid",
            info: "i-heroicons-information-circle-20-solid",
            minus: "i-heroicons-minus-20-solid",
            plus: "i-heroicons-plus-20-solid",
            search: "i-heroicons-magnifying-glass-20-solid",
            success: "i-heroicons-check-circle-20-solid",
            warning: "i-heroicons-exclamation-circle-20-solid",
            upload: "i-heroicons-arrow-up-tray-20-solid",
        },
        button: {
            rounded: "rounded-full",
            slots: {
                base: 'font-medium'
            },
            defaultVariants: {
                size: 'md',
                color: 'primary'
            }
        },
    },
});
