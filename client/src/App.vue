<template>
  <div class="app" :class="{ 'rail-collapsed': railCollapsed }">
    <div class="mobile-bar">
      <button
        class="menu-btn"
        type="button"
        aria-label="Toggle navigation"
        :aria-expanded="sidebarOpen"
        @click="sidebarOpen = !sidebarOpen"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" stroke-width="1.75" stroke-linecap="round"/>
        </svg>
      </button>
      <span class="mobile-brand">{{ t('nav.companyName') }}</span>
    </div>

    <aside class="sidebar" :class="{ open: sidebarOpen, collapsed: railCollapsed }">
      <div class="logo">
        <div class="logo-brand">
          <span class="logo-mark" aria-hidden="true">{{ brandInitial }}</span>
          <div class="logo-text">
            <h1>{{ t('nav.companyName') }}</h1>
            <span class="subtitle">{{ t('nav.subtitle') }}</span>
          </div>
        </div>
        <button
          class="collapse-btn"
          type="button"
          :aria-label="sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
          :aria-expanded="!sidebarCollapsed"
          :title="sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
          @click="toggleCollapsed"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path v-if="sidebarCollapsed" d="M8 5L13 10L8 15"/>
            <path v-else d="M12 5L7 10L12 15"/>
          </svg>
        </button>
      </div>
      <nav class="nav-links">
        <router-link
          to="/"
          :class="{ active: $route.path === '/' }"
          :title="railCollapsed ? t('nav.overview') : null"
        >
          <svg class="nav-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="6" height="6" rx="1"/><rect x="11" y="3" width="6" height="6" rx="1"/><rect x="3" y="11" width="6" height="6" rx="1"/><rect x="11" y="11" width="6" height="6" rx="1"/></svg>
          <span class="nav-label">{{ t('nav.overview') }}</span>
        </router-link>
        <router-link
          to="/inventory"
          :class="{ active: $route.path === '/inventory' }"
          :title="railCollapsed ? t('nav.inventory') : null"
        >
          <svg class="nav-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6.5L10 3L17 6.5V13.5L10 17L3 13.5V6.5Z"/><path d="M3 6.5L10 10L17 6.5M10 10V17"/></svg>
          <span class="nav-label">{{ t('nav.inventory') }}</span>
        </router-link>
        <router-link
          to="/orders"
          :class="{ active: $route.path === '/orders' }"
          :title="railCollapsed ? t('nav.orders') : null"
        >
          <svg class="nav-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="3" width="12" height="14" rx="1.5"/><path d="M7 7H13M7 10H13M7 13H10"/></svg>
          <span class="nav-label">{{ t('nav.orders') }}</span>
        </router-link>
        <router-link
          to="/spending"
          :class="{ active: $route.path === '/spending' }"
          :title="railCollapsed ? t('nav.finance') : null"
        >
          <svg class="nav-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10" cy="10" r="7"/><path d="M12 7.5C11.5 7 10.8 6.8 10 6.8C8.8 6.8 8 7.400 8 8.200C8 9.200 9 9.500 10 9.800C11 10.100 12 10.400 12 11.400C12 12.200 11.200 12.800 10 12.800C9.200 12.800 8.500 12.500 8 12M10 5.500V6.800M10 12.800V14.500"/></svg>
          <span class="nav-label">{{ t('nav.finance') }}</span>
        </router-link>
        <router-link
          to="/demand"
          :class="{ active: $route.path === '/demand' }"
          :title="railCollapsed ? t('nav.demandForecast') : null"
        >
          <svg class="nav-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 16H17M3 16V4"/><path d="M5.500 13L9 9L11.500 11.500L16 6.500M13 6.500H16V9.500"/></svg>
          <span class="nav-label">{{ t('nav.demandForecast') }}</span>
        </router-link>
        <router-link
          to="/reports"
          :class="{ active: $route.path === '/reports' }"
          :title="railCollapsed ? 'Reports' : null"
        >
          <svg class="nav-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 3H12L16 7V16.500C16 16.800 15.800 17 15.500 17H5C4.700 17 4.500 16.800 4.500 16.500V3.500C4.500 3.200 4.700 3 5 3Z"/><path d="M12 3V7H16M7 11H13M7 14H11"/></svg>
          <span class="nav-label">Reports</span>
        </router-link>
      </nav>
      <div class="sidebar-footer">
        <LanguageSwitcher :collapsed="railCollapsed" />
        <ProfileMenu
          :collapsed="railCollapsed"
          @show-profile-details="showProfileDetails = true"
          @show-tasks="showTasks = true"
        />
      </div>
    </aside>
    <div v-if="sidebarOpen" class="sidebar-backdrop" @click="sidebarOpen = false"></div>

    <div class="content-column">
      <div class="topbar">
        <FilterBar />
      </div>
      <main class="main-content">
        <router-view />
      </main>
    </div>

    <ProfileDetailsModal
      :is-open="showProfileDetails"
      @close="showProfileDetails = false"
    />

    <TasksModal
      :is-open="showTasks"
      :tasks="tasks"
      @close="showTasks = false"
      @add-task="addTask"
      @delete-task="deleteTask"
      @toggle-task="toggleTask"
    />
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { api } from './api'
import { useAuth } from './composables/useAuth'
import { useI18n } from './composables/useI18n'
import FilterBar from './components/FilterBar.vue'
import ProfileMenu from './components/ProfileMenu.vue'
import ProfileDetailsModal from './components/ProfileDetailsModal.vue'
import TasksModal from './components/TasksModal.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'

export default {
  name: 'App',
  components: {
    FilterBar,
    ProfileMenu,
    ProfileDetailsModal,
    TasksModal,
    LanguageSwitcher
  },
  setup() {
    const { currentUser } = useAuth()
    const { t } = useI18n()
    const showProfileDetails = ref(false)
    const showTasks = ref(false)
    const sidebarOpen = ref(false)
    const route = useRoute()
    watch(() => route.path, () => { sidebarOpen.value = false })
    const apiTasks = ref([])

    // Sidebar collapse: persisted preference, else auto-collapse between 900px and 1200px
    const STORAGE_KEY = 'sidebarCollapsed'
    const readSaved = () => {
      try {
        const v = window.localStorage.getItem(STORAGE_KEY)
        return v === 'true' ? true : v === 'false' ? false : null
      } catch (e) {
        return null
      }
    }
    const hasSaved = ref(readSaved() !== null)
    const mobileMql = window.matchMedia('(max-width: 900px)')
    const midMql = window.matchMedia('(min-width: 901px) and (max-width: 1199px)')
    const isMobile = ref(mobileMql.matches)
    const sidebarCollapsed = ref(readSaved() ?? midMql.matches)
    // Drawer (mobile) always shows the full labelled sidebar
    const railCollapsed = computed(() => sidebarCollapsed.value && !isMobile.value)
    const brandInitial = computed(() => (t('nav.companyName') || '').trim().charAt(0).toUpperCase())

    const toggleCollapsed = () => {
      sidebarCollapsed.value = !sidebarCollapsed.value
      hasSaved.value = true
      try {
        window.localStorage.setItem(STORAGE_KEY, String(sidebarCollapsed.value))
      } catch (e) {
        // storage unavailable; keep in-memory state only
      }
    }
    const onMobileChange = (e) => { isMobile.value = e.matches }
    const onMidChange = (e) => {
      if (!hasSaved.value) sidebarCollapsed.value = e.matches
    }
    mobileMql.addEventListener('change', onMobileChange)
    midMql.addEventListener('change', onMidChange)
    onBeforeUnmount(() => {
      mobileMql.removeEventListener('change', onMobileChange)
      midMql.removeEventListener('change', onMidChange)
    })

    // Merge mock tasks from currentUser with API tasks
    const tasks = computed(() => {
      return [...currentUser.value.tasks, ...apiTasks.value]
    })

    const loadTasks = async () => {
      try {
        apiTasks.value = await api.getTasks()
      } catch (err) {
        console.error('Failed to load tasks:', err)
      }
    }

    const addTask = async (taskData) => {
      try {
        const newTask = await api.createTask(taskData)
        // Add new task to the beginning of the array
        apiTasks.value.unshift(newTask)
      } catch (err) {
        console.error('Failed to add task:', err)
      }
    }

    const deleteTask = async (taskId) => {
      try {
        // Check if it's a mock task (from currentUser)
        const isMockTask = currentUser.value.tasks.some(t => t.id === taskId)

        if (isMockTask) {
          // Remove from mock tasks
          const index = currentUser.value.tasks.findIndex(t => t.id === taskId)
          if (index !== -1) {
            currentUser.value.tasks.splice(index, 1)
          }
        } else {
          // Remove from API tasks
          await api.deleteTask(taskId)
          apiTasks.value = apiTasks.value.filter(t => t.id !== taskId)
        }
      } catch (err) {
        console.error('Failed to delete task:', err)
      }
    }

    const toggleTask = async (taskId) => {
      try {
        // Check if it's a mock task (from currentUser)
        const mockTask = currentUser.value.tasks.find(t => t.id === taskId)

        if (mockTask) {
          // Toggle mock task status
          mockTask.status = mockTask.status === 'pending' ? 'completed' : 'pending'
        } else {
          // Toggle API task
          const updatedTask = await api.toggleTask(taskId)
          const index = apiTasks.value.findIndex(t => t.id === taskId)
          if (index !== -1) {
            apiTasks.value[index] = updatedTask
          }
        }
      } catch (err) {
        console.error('Failed to toggle task:', err)
      }
    }

    onMounted(loadTasks)

    return {
      t,
      showProfileDetails,
      showTasks,
      sidebarOpen,
      sidebarCollapsed,
      railCollapsed,
      brandInitial,
      toggleCollapsed,
      tasks,
      addTask,
      deleteTask,
      toggleTask
    }
  }
}
</script>

<style>
:root {
  /* Spacing: 4px scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;

  /* Shape and depth */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.06);
  --shadow-md: 0 4px 12px rgba(15, 23, 42, 0.08);
  --shadow-lg: 0 10px 25px rgba(15, 23, 42, 0.12);

  /* Inset chevron shared by every custom select (see .select-chevron) */
  --select-chevron: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");

  /* Color */
  --color-bg: #f8fafc;
  --color-surface: #ffffff;
  --color-surface-muted: #f1f5f9;
  --color-border: #e2e8f0;
  --color-border-strong: #cbd5e1;
  --color-text: #0f172a;
  --color-text-body: #334155;
  --color-text-muted: #64748b;
  --color-accent: #2563eb;
  --color-accent-soft: #eff6ff;
  --color-sidebar-bg: #0f172a;
  --color-sidebar-text: #cbd5e1;
  --color-sidebar-muted: #94a3b8;
  --color-sidebar-hover: rgba(148, 163, 184, 0.12);
  --color-sidebar-border: #1e293b;
  --focus-ring: 0 0 0 3px rgba(37, 99, 235, 0.35);

  /* Motion */
  --transition: 150ms ease;

  /* Layout */
  --sidebar-width: 240px;
  --sidebar-width-collapsed: 64px;
  --content-max-width: 1440px;
  --mobile-bar-height: 56px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: var(--color-bg);
  color: var(--color-text-body);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}

/* ---------- Shell ---------- */
.app {
  display: grid;
  grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
  min-height: 100vh;
  transition: grid-template-columns 180ms ease;
}

.app.rail-collapsed {
  --sidebar-width: var(--sidebar-width-collapsed);
}

.sidebar {
  position: sticky;
  top: 0;
  align-self: start;
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  padding: var(--space-5) var(--space-4);
  background: var(--color-sidebar-bg);
  color: var(--color-sidebar-text);
  z-index: 200;
  transition: padding 180ms ease;
}

.logo {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-2);
  padding: 0 var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-sidebar-border);
}

.logo-brand {
  display: flex;
  min-width: 0;
}

.logo-text {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  min-width: 0;
}

.logo-mark {
  display: none;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: var(--radius-md);
  background: var(--color-accent);
  color: #ffffff;
  font-weight: 700;
  font-size: 1rem;
}

.collapse-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background: transparent;
  border: 1px solid var(--color-sidebar-border);
  border-radius: var(--radius-md);
  color: var(--color-sidebar-muted);
  cursor: pointer;
  transition: background-color var(--transition), color var(--transition);
}

.collapse-btn:hover {
  background: var(--color-sidebar-hover);
  color: #ffffff;
}

.logo h1 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #f8fafc;
  letter-spacing: -0.025em;
}

.subtitle {
  font-size: 0.813rem;
  color: var(--color-sidebar-muted);
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.nav-links a {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  position: relative;
  padding: var(--space-2) var(--space-3);
  color: var(--color-sidebar-text);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.938rem;
  border-radius: var(--radius-md);
  transition: background-color var(--transition), color var(--transition);
}

.nav-links a:hover {
  color: #ffffff;
  background: var(--color-sidebar-hover);
}

.nav-links a.active {
  color: #ffffff;
  background: var(--color-accent);
}

.nav-links a:focus-visible {
  box-shadow: var(--focus-ring);
}

.nav-icon {
  flex-shrink: 0;
}

.nav-label {
  white-space: nowrap;
  overflow: hidden;
}

/* ---------- Collapsed (icons-only) rail; desktop only, never applied in drawer ---------- */
.sidebar.collapsed {
  padding-left: var(--space-3);
  padding-right: var(--space-3);
}

.sidebar.collapsed .logo {
  flex-direction: column;
  align-items: center;
  padding-left: 0;
  padding-right: 0;
}

.sidebar.collapsed .logo-mark {
  display: inline-flex;
}

.sidebar.collapsed .logo-text {
  display: none;
}

.sidebar.collapsed .nav-links a {
  justify-content: center;
  padding-left: 0;
  padding-right: 0;
  height: 40px;
}

.sidebar.collapsed .nav-label {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sidebar-footer {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-sidebar-border);
}

.content-column {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 100vh;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
}

.main-content {
  flex: 1;
  width: 100%;
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--space-5) var(--space-5) var(--space-6);
}

.mobile-bar,
.sidebar-backdrop {
  display: none;
}

.menu-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  color: var(--color-text);
  cursor: pointer;
  transition: background-color var(--transition), border-color var(--transition);
}

.menu-btn:hover {
  background: var(--color-surface-muted);
  border-color: var(--color-border-strong);
}

.mobile-brand {
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.025em;
}

@media (max-width: 900px) {
  .app {
    grid-template-columns: minmax(0, 1fr);
  }

  .mobile-bar {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    position: sticky;
    top: 0;
    z-index: 150;
    height: var(--mobile-bar-height);
    padding: 0 var(--space-4);
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: var(--sidebar-width);
    transform: translateX(-100%);
    transition: transform 200ms ease;
    box-shadow: none;
    z-index: 300;
  }

  .collapse-btn {
    display: none;
  }

  .sidebar.open {
    transform: translateX(0);
    box-shadow: var(--shadow-lg);
  }

  .sidebar-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.5);
    z-index: 250;
  }

  .content-column {
    min-height: calc(100vh - var(--mobile-bar-height));
  }

  .topbar {
    position: static;
  }

  .main-content {
    padding: var(--space-4);
  }
}

/* ---------- Page header ---------- */
.page-header {
  margin-bottom: var(--space-5);
}

.page-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: var(--space-1);
  letter-spacing: -0.025em;
}

.page-header p {
  color: var(--color-text-muted);
  font-size: 0.938rem;
}

/* ---------- Stats ---------- */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-5);
}

.stat-card {
  background: var(--color-surface);
  padding: var(--space-5);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: border-color var(--transition), box-shadow var(--transition);
}

.stat-card:hover {
  border-color: var(--color-border-strong);
  box-shadow: var(--shadow-md);
}

.stat-label {
  color: var(--color-text-muted);
  font-size: 0.813rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-2);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.025em;
}

.stat-card.warning .stat-value {
  color: #ea580c;
}

.stat-card.success .stat-value {
  color: #059669;
}

.stat-card.danger .stat-value {
  color: #dc2626;
}

.stat-card.info .stat-value {
  color: var(--color-accent);
}

/* ---------- Cards ---------- */
.card {
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  margin-bottom: var(--space-5);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-border);
}

.card-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: -0.025em;
}

/* ---------- Tables ---------- */
.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

th {
  text-align: left;
  padding: var(--space-3);
  font-weight: 600;
  color: var(--color-text-muted);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

td {
  padding: var(--space-3);
  border-top: 1px solid var(--color-surface-muted);
  color: var(--color-text-body);
  font-size: 0.875rem;
}

tbody tr {
  transition: background-color var(--transition);
}

tbody tr:hover {
  background: var(--color-bg);
}

/* ---------- Badges ---------- */
.badge {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.badge.success,
.badge.increasing {
  background: #d1fae5;
  color: #065f46;
}

.badge.warning,
.badge.medium {
  background: #fed7aa;
  color: #92400e;
}

.badge.danger,
.badge.decreasing,
.badge.high {
  background: #fecaca;
  color: #991b1b;
}

.badge.info,
.badge.low {
  background: #dbeafe;
  color: #1e40af;
}

.badge.stable {
  background: #e0e7ff;
  color: #3730a3;
}

/* ---------- States ---------- */
.loading {
  text-align: center;
  padding: var(--space-7);
  color: var(--color-text-muted);
  font-size: 0.938rem;
}

.error {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  padding: var(--space-4);
  border-radius: var(--radius-md);
  margin: var(--space-4) 0;
  font-size: 0.938rem;
}

/*
 * Shared select styling. The native arrow hugs the right border, so hide it and
 * draw an inset chevron. Components using this class must set a background-color
 * (not the `background` shorthand, which would wipe the chevron) and keep at
 * least 2rem of right padding so text never runs under the arrow.
 */
.select-chevron {
  appearance: none;
  -webkit-appearance: none;
  background-image: var(--select-chevron);
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
}
</style>
