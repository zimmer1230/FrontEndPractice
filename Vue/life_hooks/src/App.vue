<script setup>
  import {onUpdated, ref} from "vue";
  import MainComponent from "./Main.vue";
  
  let visible = ref( true );
  let hide = ()=>{ visible.value = false; };
  let show = ()=>{ visible.value = true; };


</script>

<template>
  <MainComponent v-if="visible"></MainComponent>
  <br></br>
  <button @click="show()">Show main content</button>
  <button @click="hide()">Hide main content</button>


</template>

