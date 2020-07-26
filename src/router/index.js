import Vue from 'vue'
import VueRouter from 'vue-router'



import Login from '../views/Login.vue'
import Layout from '../views/Layout/Layout.vue'
Vue.use(VueRouter)

const VueRouterPush = VueRouter.prototype.push 
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

const routes = [
  {
    path: '/login',
    component: Login
  },

  //默认加载首页
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        meta:{title:'后台首页'},
        path: 'home',
        component: () => import('@/views/Home.vue')
      }

    ]
  },
 


  // 订单管理
  {
    path: '/order',
    component: Layout,
    meta:{title:'订单管理'},
    redirect:'/order/order-list',
    children: [
      {
        meta:{title:'订单列表'},
        path: 'order-list',
        component: () => import('@/views/Order/OrderList')
      },
      {
        meta:{title:'订单详情'},
        path: 'order-all',
        component: () => import('@/views/Order/OrderAll')
      }

    ]
  },

  // 商品管理
  {
    path: '/goods',
    component: Layout,
    meta:{title:'商品管理'},
    redirect:'/goods/goods-list',
    children: [
      {
        meta:{title:'商品添加'},
        path: 'goods-add',
        component: () => import('@/views/Goods/GoodsAdd')
      },
      {
        meta:{title:'商品分类'},
        path: 'goods-cate',
        component: () => import('@/views/Goods/GoodsCate')
      },
      {
        meta:{title:'商品列表'},
        path: 'goods-list',
        component: () => import('@/views/Goods/GoodsList')
      }
    ]
  },


  //店铺管理
  {
    path: '/shop',
    component: Layout,
    children: [
      {
        meta:{title:'店铺管理'},
        path: '',
        component: () => import('../views/Shop/Shop.vue')
      },

    ]
  },


  // 账号管理
  {
    path: '/account',
    component: Layout,
    meta:{title:'账号管理'},
    redirect:'/account/account-list',
    children: [
      {
        meta:{title:'添加商品'},
        path: 'account-add',
        component: () => import('@/views/Account/AccountAdd')
      },
      {
        meta:{title:'修改密码'},
        path: 'account-pwd',
        component: () => import('@/views/Account/AccountPwd')
      },
      {
        meta:{title:'账号列表'},
        path: 'account-list',
        component: () => import('@/views/Account/AccountList')
      },
      {
        meta:{title:'个人中心'},
        path: 'admin',
        component: () => import('@/views/Account/admin.vue')
      }
    ]
  },
  // 销售统计

  {
    path: '/total',
    component: Layout,
    meta:{title:'销售统计'},
    redirect:"/total/total-goods",
    children: [
      {
        meta:{title:'商品统计'},
        path: 'total-goods',
        component: () => import('@/views/Total/TotalGoods')
      },
      {
        meta:{title:'订单统计'},
        path: 'total-order',
        component: () => import('@/views/Total/TotalOrder')
      },
    ]
  },




]




const router = new VueRouter({
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {




  let istk = localStorage.getItem('token') ? true : false;

  if (to.path === "/login") {
    next()
  } else {
    if (istk) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router



