import { defineStore } from "pinia"
import { ref } from "vue"
import { TTheme } from "@/types/theme";

export const useGuiSettingsStore = defineStore('gui-settings', () => {
    const GUI_SETTINGS_THEME = ref<TTheme>('dark')

    return {
        GUI_SETTINGS_THEME
    }
})