import { createRouter, createWebHashHistory } from 'vue-router'



const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
          path: 'brandstory',
          component: () => import('@/views/front/BrandStory.vue')
        },
        {
          path: 'privacy',
          component: () => import('@/views/front/PrivacyPolicy.vue')
        },
        {
          path: 'contactus',
          component: () => import('@/views/front/ContactUs.vue')
        },
        {
          path: 'faq',
          component: () => import('@/views/front/FAQView.vue')
        },
        {
          path: 'products',
          component: () => import('@/views/front/ProductView.vue')
        },
        {
          path: 'product/:productId',
          component: () => import('@/views/front/ProductDetail.vue')
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
        {
          path: 'orders',
          component: () => import('@/views/front/OrderView.vue')
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('@/views/admin/AdminDashboard.vue'),
      children: [
        {
          path: 'login',
          component: () => import('@/views/admin/AdminLogin.vue'),
        },
        {
          path: 'order',
          component: () => import('@/views/admin/AdminOrder.vue'),
        },
        {
          path: 'product',
          component: () => import('@/views/admin/AdminProduct.vue'),
        },
        {
          path: 'article',
          component: () => import('@/views/admin/AdminArticle.vue'),
        },
        {
          path: 'coupon',
          component: () => import('@/views/admin/AdminCoupon.vue'),
        }
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/NotFound.vue'),
    }

  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        top: 0,
        behavior: 'smooth',
      }
    }
  }
})

export default router
