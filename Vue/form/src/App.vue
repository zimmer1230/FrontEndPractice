<script setup>
import {ref} from "vue";
let color = ref("default");
let games_type = ref([]);
let my_text = ref("");
function clear(){
  my_text.value = "";
}

</script>

<template>
  <main :class="color">
    <h1>Select list!</h1>
    <select name="list" id="1" v-model="color">
      <option value="">Please roll and select a color</option>
      <option value="red">red</option>
      <option value="blue">blue</option>
      <option value="yellow">yellow</option>
  </select>  

  <h1>Checkbox</h1>

  RPG game <input type="checkbox" value="RPG game" v-model="games_type"> 
  Strategy <input type="checkbox" value="Strategy" v-model="games_type"> 
  Adventure <input type="checkbox" value="Adventure" v-model="games_type">
  <div>Your games:</div>
  <ul v-for="game in games_type">{{ game }}</ul>

  <h1>Input text</h1>
  <input type="text" v-model="my_text">
  <div>You entered: {{ my_text }}</div>
  <button @click="clear">clear</button>
  </main>


</template>

<style scoped>

main{
  background-color: rgb(74, 74, 74);
}

.red{
  background-color: red;
}

.blue{
  background-color: blue;
}

.yellow{
  background-color: rgb(178, 178, 0);
}

</style>
