import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import LoginView from '../views/Auth/Login.vue'
import Registration from '../views/Auth/Registration.vue'
import Dashboard from '../views/Admin/Dashboard.vue'
import TicketView from '../views/Customer/Tickets/View.vue'
import TicketCreate from '../views/Customer/Tickets/Create.vue'
import TicketEdit from '../views/Customer/Tickets/Edit.vue'
import AdminTicketView from '../views/Admin/Tickets/View.vue'
import AdminTicketEdit from '../views/Admin/Tickets/Edit.vue'
import AdminTicketAssign from '../views/Admin/Tickets/Assign.vue'
import UserView from '../views/Admin/Staff/View.vue'
import StaffEdit from '../views/Admin/Staff/Edit.vue'
import StaffCreate from '../views/Admin/Staff/Create.vue'
import StaffView from '../views/Admin/Staff/Staff.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { guestOnly: true }
    },
    {
      path: '/register',
      name: 'registration',
      component: Registration,
      meta: { guestOnly: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { authOnly: true }
    },
    {
      path: '/customer/tickets',
      name: 'tickets',
      component: TicketView,
      meta: { authOnly: true }
    },
    {
      path: '/customer/ticket/create',
      name: 'ticketCreate',
      component: TicketCreate,
      meta: { authOnly: true }
    },
    {
      path: '/customer/tickets/:id/edit',
      name: 'ticketEdit',
      component: TicketEdit,
      meta: { authOnly: true }
    },
    {
      path: '/admin/tickets',
      name: 'adminTickets',
      component: AdminTicketView,
      meta: { authOnly: true }
    },
    {
      path: '/admin/tickets/:id/edit',
      name: 'adminTicketEdit',
      component: AdminTicketEdit,
      meta: { authOnly: true }
    },
    {
      path: '/admin/tickets/:id/assign',
      name: 'adminTicketAssign',
      component: AdminTicketAssign
    },
    {
      path: '/staffs',
      name: 'staffView',
      component: StaffView,
      meta: { authOnly: true }
    },
    {
      path: '/users',
      name: 'userView',
      component: UserView,
      meta: { authOnly: true }
    },
    {
      path: '/user/create',
      name: 'userCreate',
      component: StaffCreate,
      meta: { authOnly: true }
    },
    {
      path: '/users/:id/edit',
      name: 'staffEdit',
      component: StaffEdit,
      meta: { authOnly: true }
    }
  ]
});

function isLoggedIn() {
  return localStorage.getItem("token");
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: "/",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isLoggedIn()) {
      next({
        path: "/dashboard",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router
