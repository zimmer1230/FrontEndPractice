<script setup>
import { RouterView } from 'vue-router';
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg bg ">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>


    <!-- <img id="annoying_dog" src="./assets/Annoying_Dog_sprite.gif" alt="" style="max-height: 60px; width: auto; height: auto; position: absolute; left: 20px;">
    <nav onclick="window.location.href=`/`;">Home</nav>
    <nav onclick="window.location.href=`portfolio`;">Portfolio</nav>
    <nav onclick="window.location.href=`contact`;">Contact</nav> -->
  </header>
  <RouterView></RouterView>
</template>

<style scoped>

html body{
  margin: 0;
}

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