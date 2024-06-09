import { createRouter, createWebHistory } from 'vue-router';
import VueJwtDecode from 'vue-jwt-decode';
import { setlocalstorage } from '@/scripts/common';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('../views/BooksView.vue')
    },
    {
      path: '/detail/:bookId',
      name: 'detail',
      component: () => import('../views/BookDetail.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    // Admin Routes
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminDashboardView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true } 
    },
    {
      path: '/admin/books',
      name: 'adminBooks',
      component: () => import('../views/AdminBooksView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true } 
    },
    {
      path: '/admin/users',
      name: 'adminUsers',
      component: () => import('../views/AdminUsersView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true } 
    },
    {
      path: '/admin/company',
      name: 'adminCompany',
      component: () => import('../views/AdminCompanyView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true } 
    }
  ]
});

router.beforeEach((to, from, next) => {
  console.log(VueJwtDecode.decode(localStorage.getItem('user')));
  const isAuthenticated = localStorage.getItem('user');
  const isAdmin = isAuthenticated && VueJwtDecode.decode(localStorage.getItem('user')).role === 0;
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'home' }); // Kullanıcı oturum açmamışsa ve sayfa oturum gerektiriyorsa ana sayfaya yönlendir
    setlocalstorage('errMsg' , 'Bu sayfayı görüntülemek için yönetici olarak oturum açmalısınız.');
  } else if (to.meta.requiresAdmin && (!isAuthenticated || !isAdmin)) {
    next({ name: 'home' }); // Kullanıcı yönetici değilse ve sayfa yönetici yetkisi gerektiriyorsa ana sayfaya yönlendir
    setlocalstorage('errMsg' , 'Bu sayfayı görüntülemek için yönetici olmalısınız.');
  } else {
    next();
  }
});

export default router;