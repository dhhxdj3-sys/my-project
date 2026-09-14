import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Blog from '../views/Blog.vue'
import Skill from '../views/Skill.vue'
import Project from '../views/Project.vue'
import StudentSystem from '../components/StudentSystem.vue'
import ShooppingList from '../components/ShooppingList.vue'
import GuessNumber from '@/components/GuessNumber.vue'
import BlogDetail from '@/components/BlogDetail.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:"/",
            component:Home
        },
        {
            path:"/Blog",
            component:Blog
        },
        {
            path:"/skill",
            component:Skill
        },
        {
            path:"/Project",
            component:Project
        },
       {
        path:"/project/student",
        component:StudentSystem
       },
       {
        path:"/project/shopping",
        component:ShooppingList
      },
      {
        path:"/project/guess",
        component:GuessNumber
      },
      {
        path:"/articles/:id",
        component:BlogDetail
      },
      {
        path:'/register',
        component:Register
      },
      {
        path:'/login',
        component:Login
      }

      
       
    ]
})
export default router