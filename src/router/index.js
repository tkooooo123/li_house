import { createRouter, createWebHistory } from 'vue-router'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: () => import('@/views/front/LayoutView.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/front/HomeView.vue')
        },
        {
          path: 'products',
          component: () => import('@/views/front/ProductView.vue')
        },
        {
          path: 'articles',
          component: () => import('@/views/front/ArticleList.vue')
        },
        {
          path: 'article/:articleId',
          component: () => import('@/views/front/ArticleDetail.vue')
        },
        {
          path: 'search',
          component: () => import('@/views/front/ProductSearch.vue')
        },
        {
          path: 'cart',
          component: () => import('@/views/front/CartView.vue'),
        },
        {
          path: 'cart/checkout',
          component: () => import('@/views/front/CartCheckout.vue'),
        },
        {
          path: 'cart/success/:orderId',
          component: () => import('@/views/front/CartSuccess.vue'),
        },
      ]
    },
   
  ]
})

export default router
