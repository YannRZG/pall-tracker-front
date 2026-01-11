import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

// Importer les vues
import HomeView from '@/views/HomeView.vue';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import DashboardView from '@/views/DashboardView.vue';
import DebtDashboardView from '@/views/DebtDashboardView.vue';
import CompanyDebtsView from '@/views/CompanyDebtsView.vue';
import AboutView from '@/views/AboutView.vue';
import ContactView from '@/views/ContactView.vue';
import AddressBookView from '@/views/AddressBookView.vue';
import ProfileView from '@/views/ProfileView.vue';
import CompanyAdminDashboardView from '@/views/company/CompanyAdminDashboard.vue';
import SignupFromInvite from '@/views/SignupFromInvite.vue';
import AdminDashboardView from '@/views/admin/AdminDashboardView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/dashboard', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/debts', name: 'debts', component: DebtDashboardView, meta: { requiresAuth: true } },       // Liste globale des entreprises et dettes
  { path: '/company/:id', name: 'company-details', component: CompanyDebtsView, meta: { requiresAuth: true } }, // Détail dettes d'une entreprise
  { path: '/about', name: 'about', component: AboutView },
  { path: '/contact', name: 'contact', component: ContactView },
  { path: '/address-book', name: 'address-book', component: AddressBookView },
  { path: '/signup-from-invite', name: 'signup-from-invite', component: SignupFromInvite, meta: { public: true } },
  { path: '/profile', name: 'profile', component: ProfileView, meta: { requiresAuth: true } },
  { path: '/company/admin', name: 'company-admin', component: CompanyAdminDashboardView, meta: { requiresAuth: true, companyAdmin: true } },
  { path: '/admin', name: 'admin', component: AdminDashboardView, meta: { requiresSuperAdmin: true } },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Vérification de l'authentification
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const token = localStorage.getItem('token')

  // 🔐 Auth requise
  if (to.meta.requiresAuth && !token) {
    return next({ name: 'login' })
  }

  // 👑 Admin SaaS
  if (to.meta.requiresSuperAdmin) {
    if (!userStore.user || userStore.user.role !== 'super_admin') {
      return next({ name: 'admin-dashboard' })
    }
  }

  // 🏢 Admin Company
  if (to.meta.companyAdmin) {
    if (!userStore.user || userStore.user.role !== 'admin') {
      return next({ name: 'dashboard' })
    }
  }

  // ✅ OBLIGATOIRE
  next()
})



export default router;
