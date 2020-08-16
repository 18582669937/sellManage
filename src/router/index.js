import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from "@/views/Login"
import Home from "@/views/Home"
import { checktoken } from "@/api/apis"
// import { component } from 'vue/types/umd'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    // redirect: '/login',
    component: Login
  },


  /* 首页 */
  {
    path: '/home',
    name: 'home',
    redirect: '/homecontent',
    component: Home,
    children: [
      {
        path: '/homecontent',
        component: () => import('@/views/main/HomeContent'),
        meta: { breadlist: ['首页'] }
      },


    ]
  },

  /* 订单管理 */
  {
    path: '/order',
    name: 'order',
    redirect: '/order/order-list',
    component: Home,
    children: [
      {
        path: '/order/order-list',
        component: () => import('@/views/main/Order/OrderList'),
        meta: { breadlist: ['订单管理', '订单列表'] }
      },
      {
        path: '/order/order-edit',
        component: () => import('@/views/main/Order/OrderEdit'),
        meta: { breadlist: ['订单管理', '订单编辑'] }
      }
    ]
  },

  /* 商品管理 */
  {
    path: '/goods',
    name: 'goods',
    redirect: '/goods/goods-list',
    component: Home,
    children: [
      {
        path: '/goods/goods-list',
        component: () => import('@/views/main/Goods/GoodsList'),
        meta: { breadlist: ['商品管理', '商品列表'] }
      },
      {
        path: '/goods/goods-add',
        component: () => import('@/views/main/Goods/GoodsAdd'),
        meta: { breadlist: ['商品管理', '商品添加'] }
      },
      {
        path: '/goods/goods-classify',
        component: () => import('@/views/main/Goods/GoodsClassify'),
        meta: { breadlist: ['商品管理', '商品分类'] }
      }
    ]
  },

  /* 店铺管理 */
  {
    path: '/store',
    name: 'store',
    component: Home,
    children: [
      {
        path: '/store',
        component: () => import('@/views/main/Store'),
        meta: { breadlist: ['店铺管理'] }
      }
    ]
  },

  /* 账号管理 */
  {
    path: '/account',
    name: 'account',
    redirect: '/account/account-list',
    component: Home,
    children: [
      {
        path: '/account/account-list',
        component: () => import('@/views/main/Account/AccList'),
        meta: { breadlist: ['账号管理', '账号列表'] }
      },
      {
        path: '/account/account-add',
        component: () => import('@/views/main/Account/AccAdd'),
        meta: { breadlist: ['账号管理', '添加账号'] }
      },
      {
        path: '/account/alter-pwd',
        component: () => import('@/views/main/Account/AlterPwd'),
        meta: { breadlist: ['账号管理', '修改密码'] }
      },
      {
        path: '/account/Personal',
        component: () => import('@/views/main/Account/Personal'),
        meta: { breadlist: ['账号管理', '个人中心'] }
      },
    ]
  },


  /* 销售统计 */
  {
    path: '/sell',
    name: 'sell',
    component: Home,
    children: [
      {
        path: '/sell/shop-stat',
        component: () => import('@/views/main/Sell/ShopStat'),
        meta: { breadlist: ['销售统计', '商品统计'] }
      },
      {
        path: '/sell/order-stat',
        component: () => import('@/views/main/Sell/OrderStat'),
        meta: { breadlist: ['销售统计', '订单统计'] }
      }
    ]
  },


  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  // mode: '',
  base: process.env.BASE_URL,
  routes
})

/* 导航守卫 */
router.beforeEach((to, from, next) => {
  if (to.path != '/') {
    checktoken(localStorage.token).then(res => {
      if (res.data.code == 0)//token有效
        next()
      else
        next('/')//token无效跳转到登录页面
    })
  } else {
    next()
  }
})

export default router
