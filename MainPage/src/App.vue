<script setup>
import { ref, computed } from 'vue'

import Header from './components/Header.vue';
import HomeView from './views/HomeView.vue'
import PortfolioView from './views/PortfolioView.vue'
import ContactView from './views/ContactView.vue'

const routes = {
  '/': HomeView,
  '/portfolio': PortfolioView,
  '/contact': ContactView
};

const currentPath = ref(window.location.hash);
window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})
const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})


</script>



<template>
  <Header></Header>
  <component :is="currentView"></component>
</template>

<style scoped>


/* header{
  position: fixed;
  top: 0;
  justify-content: center;
  width: 100%;
  display: flex;
  background-color: rgb(30, 30, 30);
} */



/* header nav{
  text-align: center;
  color:aliceblue;
  width: 200px;
  padding: 20px;
  transition: 0.4s;
} */

/* header nav:hover{
  cursor: pointer;
  background-color: rgb(83, 83, 83);
} */


@media(max-width: 600px){
  #annoying_dog{
    display: none;
  }
}
</style>