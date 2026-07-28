import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Blog from '../views/Blog.vue'
import Skill from '../views/Skill.vue'
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
        }
    ]
})
export default router