import Vue from 'vue'
import VueRouter from 'vue-router'
import registerView from "@/views/auth/RegisterView";
import loginView from "@/views/auth/LoginView";
import actorView from "@/views/actor/ActorView";
import movieView from "@/views/movie/MovieView";
import MainView from "@/views/MainView";
import UserProfileView from "@/views/user/UserProfileView";
import allMovieView from "@/views/movie/AllMovieView";
import allActorView from "@/views/actor/AllActorView";
import reviewHomeView from "@/views/review/ReviewHomeView";
import reviewMovieView from "@/views/movie/ReviewMovieView";
import reviewDetail from "@/views/review/ReviewDetail";
import allGroupView from "@/views/group/AllGroupView";
import groupDetailView from "@/views/group/GroupDetailView";
import groupDiscussionDetail from "@/views/group/GroupDiscussionDetail";
import commentMovieView from "@/views/movie/CommentMovieView";
import imagesMovieView from "@/views/movie/ImagesMovieView";
import videosMovieView from "@/views/movie/VideosMovieView";
import searchMovieView from "@/views/SearchMovieView";
import searchActorView from "@/views/SearchActorView";
import addReview from "@/views/review/AddReview";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'mainView',
    component: MainView
  },
  {
    path: '/register',
    name: 'register',
    component: registerView
  },
  {
    path: '/login',
    name: 'login',
    component: loginView
  },
  {
    path: '/actor',
    name: 'allActor',
    component: allActorView
  },
  {
    path: '/actor/:id',
    name: 'actor',
    component: actorView
  },
  {
    path: '/movie/:id',
    name: 'movie',
    component: movieView
  },
  {
    path: '/movie/:id/review',
    name: 'movieReview',
    component: reviewMovieView
  },
  {
    path: '/movie/:id/media/images',
    name: 'movieImages',
    component: imagesMovieView
  },
  {
    path: '/movie/:id/media/videos',
    name: 'movieMedia',
    component: videosMovieView
  },
  {
    path: '/movie/:id/comment',
    name: 'movieComment',
    component: commentMovieView
  },
  {
    path: '/movie',
    name: 'allMovie',
    component: allMovieView
  },
  {
    path: '/user/:id',
    name: 'userProfile',
    component: UserProfileView
  },
  {
    path: '/review',
    name: 'reviewHome',
    component: reviewHomeView
  },

  {
    path: '/review/:id',
    name: 'reviewDetail',
    component: reviewDetail
  },
  {
    path: '/group',
    name: 'allGroup',
    component: allGroupView
  },
  {
    path: '/group/:id',
    name: 'groupDetail',
    component: groupDetailView
  },
  {
    path: '/group/:id/discussion/:discussionId',
    name: 'groupDiscusssion',
    component: groupDiscussionDetail
  },
  {
    path: '/search/movie',
    name: 'searchMovieView',
    component: searchMovieView
  },
  {
    path: '/search/actor',
    name: 'searchActorView',
    component: searchActorView
  },
  {
    path: '/movie/:id/addreview',
    name: 'addReview',
    component: addReview
  },
    {
    path: '/404',
    name: 'NotFound',
    meta: {
      title: 'Page not found',
      isLogin: false
    },
    component: NotFound
  },
  // 所有未定义路由，全部重定向到404页
  {
    path: '*',
    redirect: '/404'
  }
]

import store from '@/store/index.js';
import NotFound from "@/views/NotFound.vue";

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let is_login = store.getters['user/islogin'];
  console.log(is_login);
  if (to.path === '/register') {
    next();
  } else if (to.path === '/login') {
    if (is_login === null || is_login === '') {
      next();
    } else {
      next('/');
    }
  } else {
    if (is_login === null || is_login === '') {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  }
});



export default router
