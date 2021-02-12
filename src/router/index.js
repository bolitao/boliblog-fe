import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import BlogDetail from '../views/BlogDetail.vue'
import BlogEdit from '../views/BlogEdit.vue'
import Blogs from '../views/Blogs.vue'

Vue.use(VueRouter)

const routes = [
    // {
    //     path: '/',
    //     name: 'index',
    //     redirect: {name: 'Blogs'}
    // },

    {
        path: '/',
        name: 'Blogs',
        component: Blogs
    },

    {
        path: '/login',
        name: 'Login',
        component: Login
    },

    {
        path: '/blog/:blogId/edit',
        name: 'BlogEdit',
        component: BlogEdit,
        meta: {
            requireAuth: true
        }
    },

    {
        path: '/blog/add',
        name: 'BlogAdd',
        component: BlogEdit,
        meta: {
            requireAuth: true
        }
    },

    {
        path: '/blog/:blogId',
        name: 'BlogDetail',
        component: BlogDetail
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
