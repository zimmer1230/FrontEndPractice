<script setup>
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
</script>



<template>
  <Header></Header>
  <RouterView></RouterView>
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