import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue"
import pet from "../views/pet.vue"
import organ from "../views/organ.vue"
import create from "../components/petCreateForm.vue"
import { getToken } from "@/utils/auth"
import { Message } from 'element-ui'
Vue.use(VueRouter);

const routes = [{
  path: "/home",
  name: "Home",
  component: Home,
  meta: {
    title: '首页'
  }
},
{
  path: "/",
  name: 'Login',
  component: Login,
  meta: {
    title: '登录'
  }
},
{
  path: "/pet",
  name: 'pet',
  component: pet,
  meta: {
    title: '宠物管理'
  }
},
{
  path: "/create",
  name: 'create',
  component: create,
  meta: {
    title: '新增宠物'
  }
},
{
  path: "/organ",
  name: 'organ',
  component: organ,
  meta: {
    title: '机构管理'
  }
}
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// title自定义
router.beforeEach((to, form, next) => {
  if (to.meta.title) { //判断是否有标题
    console.log(to.meta.title)
    document.title = to.meta.title
  }
  const hasToken = getToken()
  console.log(hasToken);
  //检测token

  if (hasToken) {
    if (to.path === '/') {
      next({ path: '/home' })
    }
  } else {
    if (to.path !== '/') {
      Message.error({
        showClose: true,
        message: '请登录后访问'
      });
      next({ path: '/' })
    }
  }
  //   if (hasToken) {
  //     if (to.path === '/login') {
  //       next({ path: '/' })
  //     } else {
  //       const hasGetUserInfo = store.getters.id
  //       if (hasGetUserInfo) {
  //         next()
  //       } else {
  //         try {
  //           await store.dispatch('user/getData')
  //           const accessRoutes = await store.dispatch('permission/generateRoutes')
  //           router.addRoutes(accessRoutes)
  //           next({ ...to, replace: true })
  //         } catch (error) {
  //           await store.dispatch('user/resetToken')
  //           Message.error(error || '验证失败，请重新登录！')
  //           next(`/login?redirect=${to.path}`)
  //         }
  //       }
  //     }
  //   } else {
  //     //无token
  //     if (whiteList.indexOf(to.path) !== -1) {
  //       next()
  //     } else {
  //       next(`/login?redirect=${to.path}`)
  //       Message.error('请先登录系统！')
  //     }
  //   }
  next()
})


export default router;