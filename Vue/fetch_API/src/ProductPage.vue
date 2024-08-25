<script setup>
/*PRODUCTS = "https://cwpeng.github.io/live-records-samples/data/products.json"*/
/*REVIEWS = "https://cwpeng.github.io/live-records-samples/data/reviews.json" */
import List from "./ProductList.vue"

import {ref} from "vue";
let products = ref(null);
import {onMounted} from "vue";
onMounted( async function(){
  setTimeout( async ()=>{
    let res = await fetch('https://cwpeng.github.io/live-records-samples/data/products.json');
    products.value = await res.json();
  }, 2000 );
});



</script>

<template>
  <div class="info">
    <div class="headline">Products list  </div>
    <div v-if="products===null">資料載入中</div>
    <List v-else v-bind:products="products"></List>

  </div>

</template>

<style scoped>
.info{
  display: block;
  align-content: center;
}

</style>