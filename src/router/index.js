// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

// Importer les vues
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import DebtDashboardView from '@/views/DebtDashboardView.vue'
import CompanyDebtsView from '@/views/CompanyDebtsView.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'
import AddressBookView from '@/views/AddressBookView.vue'
import ProfileView from '@/views/ProfileView.vue'
import CompanyAdminDashboardView from '@/views/company/CompanyAdminDashboard.vue'
import SignupFromInvite from '@/views/SignupFromInvite.vue'
import SignupRequestView from '@/views/company/SignupRequestView.vue'
import AdminDashboardView from '@/views/admin/AdminDashboardView.vue'
import AdminLayout from '@/views/admin/AdminLayouts.vue'
// import AdminDashboardView from '@/views/admin/AdminDashboardView.vue'
import AdminCompaniesView from '@/views/admin/Companies.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/dashboard', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/debts', name: 'debts', component: DebtDashboardView, meta: { requiresAuth: true } }, // Liste globale des entreprises et dettes
  {
    path: '/company/:id',
    name: 'company-details',
    component: CompanyDebtsView,
    meta: { requiresAuth: true },
  }, // Détail dettes d'une entreprise
  { path: '/about', name: 'about', component: AboutView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/address-book', name: 'address-book', component: AddressBookView },
  {
    path: '/signup-from-invite',
    name: 'signup-from-invite',
    component: SignupFromInvite,
    meta: { public: true },
  },
  { path: '/profile', name: 'profile', component: ProfileView, meta: { requiresAuth: true } },
  {
    path: '/company/admin',
    name: 'company-admin',
    component: CompanyAdminDashboardView,
    meta: { requiresAuth: true, companyAdmin: true },
  },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   component: AdminDashboardView,
  //   meta: { requiresSuperAdmin: true },
  // },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresSuperAdmin: true },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: AdminDashboardView,
      },
      {
        path: 'companies',
        name: 'admin-companies',
        component: AdminCompaniesView,
      },
    ],
  },
  {
    path: '/signup-request',
    name: 'signup-request',
    component: SignupRequestView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Vérification de l'authentification
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // fetchUser si userStore vide et route requiert auth
  if (to.meta.requiresAuth && !userStore.user && !userStore.loading) {
    try {
      await userStore.fetchUser()
    } catch {
      return next({ name: 'login' })
    }
  }

  // si route requiert auth mais utilisateur non connecté
  if (to.meta.requiresAuth && !userStore.user) {
    return next({ name: 'login' })
  }

  // Super Admin
  if (to.meta.requiresSuperAdmin && (!userStore.user || !userStore.user.super_admin)) {
    return next({ name: 'dashboard' })
  }

  // Company Admin
  if (to.meta.companyAdmin && (!userStore.user || userStore.user.role !== 'admin')) {
    return next({ name: 'dashboard' })
  }

  next()
})

export default router
