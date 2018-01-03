import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
import Home from '../components/home/home.vue'
import Topic from '../components/topic/topic.vue'
import Carousel from '../components/carousel/carousel.vue'
import HotArticle from '../components/HotArticle/HotArticle.vue'
import Comment from '../components/comment/comment.vue'
import _Video from '../components/video/video.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: App,
    children: [
      {
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        component: Home,
        children: [
          {
            path: 'carousel',
            component: Carousel
          },
          {
            path: 'HotArticle',
            component: HotArticle
          },
          {
            path: 'Video',
            component: _Video
          }
        ]
      },
      {
        path: '/topic',
        component: Topic,
        children: [
          {
            path: 'carousel',
            component: Carousel
          },
          {
            path: 'HotArticle',
            component: HotArticle
          },
          {
            path: 'Video',
            component: _Video
          }
        ]
      },
      {
        path: '/comment',
        component: Comment
      }
    ]
  }
]

const router = new Router({
  routes: routes,
  mode: 'hash',
  strict: process.env.NODE_ENV !== 'production',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})
export default router
