import { ref, computed } from 'vue'

const STORAGE_KEY = 'app-theme'

// localStorage can throw (private mode, blocked storage); never let that break the app
const readStored = () => {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY)
    return v === 'light' || v === 'dark' ? v : null
  } catch (e) {
    return null
  }
}

const systemPrefersDark = () =>
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches

// Stored choice wins; otherwise follow the OS preference
const theme = ref(readStored() ?? (systemPrefersDark() ? 'dark' : 'light'))

const apply = (value) => {
  document.documentElement.setAttribute('data-theme', value)
}

// Apply immediately on module load so the first paint uses the right theme
apply(theme.value)

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark')

  const setTheme = (value) => {
    theme.value = value === 'dark' ? 'dark' : 'light'
    apply(theme.value)
    try {
      window.localStorage.setItem(STORAGE_KEY, theme.value)
    } catch (e) {
      // storage unavailable; keep in-memory choice only
    }
  }

  const toggleTheme = () => setTheme(isDark.value ? 'light' : 'dark')

  return { theme, isDark, setTheme, toggleTheme }
}
