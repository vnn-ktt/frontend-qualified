import {defineStore} from "pinia"
import {ref, onMounted} from "vue"

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

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