import Vue from 'vue'
import VueRouter from 'vue-router'
import registerView from "@/views/RegisterView";
import loginView from "@/views/LoginView";
import actorView from "@/views/ActorView";
import movieView from "@/views/MovieView";
import MainView from "@/views/MainView";
import allMovieView from "@/views/AllMovieView";
import allActorView from "@/views/AllActorView";
import UserProfileView from "@/views/UserProfileView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: registerView
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: loginView
  },
  {
    path: '/actor',
    name: 'actor',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: actorView
  },
  {
    path: '/movie',
    name: 'movie',
    component: movieView
  },
  {
    path: '/allmovie',
    name: 'allmovie',
    component: allMovieView
  },
  {
    path: '/allactor',
    name: 'allactor',
    component: allActorView
  },
  {
    path: '/user',
    name: 'user',
    component: UserProfileView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
