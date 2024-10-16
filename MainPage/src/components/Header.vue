<script setup>
import { ref } from 'vue';
const activePage = ref(window.location.hash);

window.addEventListener('hashchange', ()=>{
    activePage.value = window.location.hash;
})

function disappear(event){
    event.target.classList.add('d-none');
};

function annoying(event){
    if (activePage.value === '#/'){
        event.target.classList.add('annoying');
        document.getElementById('invisible-dog').classList.remove('d-none');
    }
};
</script>

<template>
    <nav
      class="navbar navbar-expand-sm navbar-dark bg-dark"
    >
      <div class="container-lg">
        <img src="../assets/Annoying_Dog_sprite.gif" @click="annoying($event)" class="img-fluid dog" alt="Yi" >
        <img src="../assets/Annoying_Dog_sprite.gif" id="invisible-dog"                          class="img-fluid dog invisible d-none"  >

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
              <a class="nav-link" href="#/" :class="activePage==='#/'?'active':''"  :aria-current="activePage==='#/'?'page':''"
                >Home
                <span class="visually-hidden">(current)</span></a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#portfolio" :class="activePage==='#/portfolio'?'active':''"  :aria-current="activePage==='#/portfolio'?'page':''"
                >Portfolio</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#contact" :class="activePage==='#/contact'?'active':''"  :aria-current="activePage==='#/contact'?'page':''"
                >Contact</a>
            </li>

          </ul>

        </div>
      </div>
    </nav>
</template>

<style scoped>
    .dog{
        max-height: 40px;
    }
    .annoying{
        position: fixed;    
        animation-name: run-away;
        animation-duration: 7s;
        animation-fill-mode: forwards;
        animation-timing-function: steps(80,end);
    }
    @keyframes run-away{
        0% {
            transform: translate(0, 0) scale(1); /* Start at original position */
        }
        25%{
            transform: translate(25vw,50vh) scale(7);
        }
        50%{
            transform: translate(50vw, 40vh) scale(7);
        }
        100%{
            transform: translate(120vw, 120vh) scale(7);
        }

    }
</style>