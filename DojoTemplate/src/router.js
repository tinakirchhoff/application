import { createRouter, createWebHistory} from 'vue-router'

import components from "./assets/json/components.json"
import DetailPages from "./pages/DetailPages.vue";
import KomponentenPage from "./pages/KomponentenPage.vue";
import HomePage from "./pages/HomePage.vue";
import HowToPage from "./pages/HowToPage.vue";


function createRoutes() {
  const routes = [
    {path: '/', component: HomePage},
    {path: '/komponenten', component: KomponentenPage},
    {path: '/howTo', component: HowToPage},
  ]
  for (const [key, value] of Object.entries(components)) {
    routes.push({path: `/${key}`, component: DetailPages, props: {component: value}})
  }
  return routes
}

const router = createRouter({
  history: createWebHistory(),
  routes: createRoutes()
})

export default router
