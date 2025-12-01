import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { TTheme } from "@/types/theme";
import {useQuasar} from "quasar";

export const useThemeStore = defineStore('gui', () => {
    const GUI_THEME = ref<TTheme>('auto')
    const systemDark = ref(true)

    const currentTheme = computed(() => {
        if (GUI_THEME.value === 'auto') {
            return systemDark.value ? 'dark' : 'light'
        }
        return GUI_THEME.value
    })

    const isDark = computed((theme: TTheme) => {
        GUI_THEME.value = theme
        localStorage.setItem('GUI_THEME', theme)
        applyTheme()
    })

    const applyTheme = () => {
        const dark = isDark.value
        document.documentElement.classList.toggle('dark', dark)
        useQuasar().dark.set(dark)
    }

    const setTheme = (theme: 'dark' | 'light') => {
        isDark.value = theme === 'dark'
        document.documentElement.classList.toggle('dark', isDark.value)
        localStorage.setItem('theme', theme)
    }

    const toggleTheme = () => {
        const newTheme = isDark.value ? 'light' : 'dark'
        setTheme(newTheme)
    }

    const initTheme = () => {
        const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null

        if (savedTheme) {
            setTheme(savedTheme)
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            setTheme(prefersDark ? 'dark' : 'light')
        }
    }

    onMounted(() => {
        initTheme()
    })

    return {
        isDark,
        setTheme,
        toggleTheme,
        initTheme
    }
})