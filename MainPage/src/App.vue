<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <img id="annoying_dog" src="./assets/Annoying_Dog_sprite.gif" alt="" style="max-height: 60px; width: auto; height: auto; position: absolute; left: 20px;">
    <nav onclick="window.location.href=`/`;">Home</nav>
    <nav onclick="window.location.href=`portfolio`;">Portfolio</nav>
    <nav onclick="window.location.href=`contact`;">Contact</nav>
  </header>
  <RouterView></RouterView>
</template>

<style scoped>

html body{
  margin: 0;
}

header{
  position: fixed;
  top: 0;
  justify-content: center;
  width: 100%;
  display: flex;
  background-color: rgb(30, 30, 30);
}



header nav{
  text-align: center;
  color:aliceblue;
  width: 200px;
  padding: 20px;
  transition: 0.4s;
}

header nav:hover{
  cursor: pointer;
  background-color: rgb(83, 83, 83);
}


@media(max-width: 600px){
  #annoying_dog{
    display: none;
  }
}
</style>