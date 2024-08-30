import { createRouter, createWebHistory } from 'vue-router'
import Hello from '../components/Hello.vue'
import Books from '../components/Books.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/hello',
      name: 'hello',
      component: Hello
    },
    {
      path: '/',
      name: 'Books',
      component: Books
    }
  ]
})
export default router
