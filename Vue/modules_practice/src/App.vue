<script setup>
import Nav from "./Nav.vue";
import Main from "./Main.vue";
import {ref} from "vue";

let text = ref("This is old one.");
function change(){
    text.value = "New website content";
};
</script>

<template>

  <Nav :title="text"></Nav>
  <Main bkg_color="#ffff00" @myEvent="change" @myEvent2="change"></Main>

</template>

<style scoped>


</style>
