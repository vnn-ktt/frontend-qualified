import {ref, onMounted} from 'vue'

export function useTheme() {
    const isDark = ref(false)

    const setTheme = (theme: 'dark' | 'light') => {
        isDark.value = theme === 'dark'
        document.documentElement.classList.toggle('dark', isDark.value)
    }

    const toggleTheme = () => {
        setTheme(isDark.value ? 'dark' : 'light')
    }

    onMounted(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        setTheme(prefersDark ? 'dark' : 'light')
    })

    return { isDark, toggleTheme, setTheme }
}