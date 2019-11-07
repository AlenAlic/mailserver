import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import("@/pages/Home.vue");
const Styleguide = () => import("@/pages/Styleguide.vue");
const PageNotFound = () => import("@/pages/PageNotFound.vue");
const Dashboard = () => import("@/pages/Dashboard.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/index.html",
    alias: "/home",
    component: Home
  },
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "sign-in",
    component: Home
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      auth: true
    }
  },
  {
    path: "/styleguide",
    name: "styleguide",
    component: Styleguide,
    meta: {
      auth: false,
      debugRoute: true
    }
  },
  {
    path: "**",
    name: "PageNotFound",
    component: PageNotFound
  }
];

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "is-active",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta !== undefined && to.meta.auth) {
    // Check if user is signed in. Route requires sign in.
    if (!Vue.prototype.$auth.isAuthenticated()) {
      next({
        name: "sign-in",
        query: {
          redirect: to.path
        }
      });
      return;
    }
  }
  next();
});

/**
 * Disable debug routes (stylesheet, etc) on production
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.debugRoute)) {
    if (!Vue.prototype.$config.debug) {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
