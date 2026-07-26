import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Blog from '../views/Blog.vue'
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
        }
    ]
})
export default router