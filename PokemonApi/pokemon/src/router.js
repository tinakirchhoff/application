import {createRouter, createWebHistory} from 'vue-router'

import start from "./pages/start.vue"
import compare from "./pages/compare.vue"

function createRoutes() {
    return [
        {path: '/', component: start},
        {path: '/compare', component: compare},
    ]
}

const router = createRouter({
    history: createWebHistory(),
    routes: createRoutes()
})

export default router
