import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Register from '../views/Register.vue'
import Comics from '../views/Comics.vue'
import Profile from '../views/Profile.vue'
import store from '../store/index'
import ComicsAPI from '../views/ComicsAPI.vue'

Vue.use(Router)

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    //THE HOME PAGE SHOULD BE SET TO TRUE FOR requiresAuth. IF IT IS SET TO FALSE, THAT MEANS WE WANT TO BE ABLE TO VIEW AND MAKE CHANGES TO IT WITHOUT SIGNING IN. IT SHOULD BE CHANGED BACK WHEN DONE
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    //this was added vvvv
    {
      path: "/comics",
      name: "comics",
      component: Comics,
      meta: {
        requiresAuth: false
      }
    },
    //leaving requuiresAuth as false for now so we can work on the project
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/comicsAPI",
      name: "comicsAPI",
      component: ComicsAPI,
      meta: {
        requiresAuth: false
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    next("/login");
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router;
