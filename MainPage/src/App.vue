<script setup>
import { RouterView } from 'vue-router';
</script>



<template>
    <nav
      class="navbar navbar-expand-sm navbar-dark bg-dark"
    >
      <div class="container-lg">
        <img src="./assets/Annoying_Dog_sprite.gif" class="img-fluid" alt="Yi" style="max-height: 40px;">
        <button
          class="navbar-toggler d-sm-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
          <ul class="navbar-nav me-auto mt-2 mt-lg-0 ">
            <li class="nav-item">
              <a class="nav-link active" href="/" aria-current="page"
                >Home
                <span class="visually-hidden">(current)</span></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/portfolio">Portfolio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/contact">Contact</a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="dropdownId"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                >Dropdown</a
              >
              <div
                class="dropdown-menu"
                aria-labelledby="dropdownId"
              >
                <a class="dropdown-item" href="#"
                  >Action 1</a
                >
                <a class="dropdown-item" href="#"
                  >Action 2</a
                >
              </div>
            </li>
          </ul>

        </div>
      </div>
    </nav>
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