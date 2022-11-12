import Vue from 'vue'
import VueRouter from 'vue-router'
import registerView from "@/views/auth/RegisterView";
import loginView from "@/views/auth/LoginView";
import actorView from "@/views/actor/ActorView";
import movieView from "@/views/movie/MovieView";
import MainView from "@/views/MainView";
import allMovieView from "@/views/movie/AllMovieView";
import allActorView from "@/views/actor/AllActorView";

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
