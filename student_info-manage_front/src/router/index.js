import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import UserProfile from '../views/UserProfile'
import StudentManage from '../views/StudentManage'
import FeedBack from '../views/FeedBack'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:{name:'login'},
    // name: 'login',
    component: Login
  },
  {
    path:'/home',
    name:'home',
    component:Home,
    meta:{
      title:"主页",
      needLogin:true
    },
    children:[
      {
        path:'userProfile',
        name:'userProfile',
        component:UserProfile,
        meta:{
          title:"个人中心"
        }
      },
      {
        path:'studentManage',
        name:'studentManage',
        component:StudentManage,
        meta:{
          title:"学生管理"
        }
      },
      {
        path:'feedBack',
        name:'feedBack',
        component:FeedBack,
        meta:{
          title:"信息反馈"
        }
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:Login,
    meta:{
      title:"登录"
    }
  },
  {
    path:'/register',
    name:'register',
    component:Register
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(function(to,from,next){
  let require = to.matched.some(function(item){
    return item.meta.needLogin
  })
  if(!sessionStorage.isLogin && require){
    
    next({
      name:"login",
      params:{redirect:to}
    })
    alert("请先登录！");
    // console.log(sessionStorage.isLogin,1)
  }else{
    next()
  }
})
router.afterEach(function(to){
  document.title = to.meta.title
})
export default router
