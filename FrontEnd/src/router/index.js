import { createRouter, createWebHistory } from 'vue-router';
import VueJwtDecode from 'vue-jwt-decode';
import { setlocalstorage } from '@/scripts/common';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: false, requiresAdmin: false, requiresEmployee: false } 
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('../views/BooksView.vue'),
      meta: { requiresAuth: false, requiresAdmin: false, requiresEmployee: false } 
    },
    {
      path: '/detail/:bookId',
      name: 'detail',
      component: () => import('../views/BookDetail.vue'),
      meta: { requiresAuth: false, requiresAdmin: false, requiresEmployee: false } 
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: false, requiresAdmin: false, requiresEmployee: false} 
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: { requiresAuth: false, requiresAdmin: false, requiresEmployee: false } 
    },
    // Admin Routes
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminDashboardView.vue'),
      meta: { requiresAuth: true, requiresAdmin: false, requiresEmployee: true } 
    },
    {
      path: '/admin/books',
      name: 'adminBooks',
      component: () => import('../views/AdminBooksView.vue'),
      meta: { requiresAuth: true, requiresAdmin: false, requiresEmployee: true } 
    },
    {
      path: '/admin/users',
      name: 'adminUsers',
      component: () => import('../views/AdminUsersView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true, requiresEmployee: false } 
    },
    {
      path: '/admin/company',
      name: 'adminCompany',
      component: () => import('../views/AdminCompanyView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true, requiresEmployee: false } 
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('user')) {
    const userRole = VueJwtDecode.decode(localStorage.getItem('user')).role;
    const isAuthenticated = localStorage.getItem('user');
    const isAdmin = isAuthenticated && userRole === 0;
    const isEmployee = isAuthenticated && userRole === 1;

    if (isAdmin) { 
      next();
    }
    else {
      if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'home' }); // Kullanıcı oturum açmamışsa ve sayfa oturum gerektiriyorsa ana sayfaya yönlendir
        setlocalstorage('errMsg' , 'Bu sayfayı görüntülemek için yönetici veya personel olarak oturum açmalısınız.');
      } else if (to.meta.requiresAdmin) {
        next({ name: 'home' }); // Kullanıcı yönetici değilse ve sayfa yönetici yetkisi gerektiriyorsa ana sayfaya yönlendir
        setlocalstorage('errMsg' , 'Bu sayfayı görüntülemek için yönetici olarak oturum açmalısınız.');
      } else if (to.meta.requiresEmployee && !isEmployee) {
        next({ name: 'home' }); // Kullanıcı personel değilse ve sayfa personel yetkisi gerektiriyorsa ana sayfaya yönlendir
        setlocalstorage('errMsg' , 'Bu sayfayı görüntülemek için yönetici veya personel olarak oturum açmalısınız.');
      } else {
        next();
      }
    }
  }
  else {
    if (to.meta.requiresAuth) {
      next({ name: 'home' });
      setlocalstorage('errMsg' , 'Bu sayfayı görüntülemek için yönetici olarak oturum açmalısınız.');
    }
    else {
      next();
    }
  }
});

export default router;