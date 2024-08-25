<script setup>
/*PRODUCTS = "https://cwpeng.github.io/live-records-samples/data/products.json"*/
/*REVIEWS = "https://cwpeng.github.io/live-records-samples/data/reviews.json" */
import ReviewList from "./ReviewList.vue";

import {ref} from "vue";
let reviews = ref(null);
import {onMounted} from "vue";
onMounted( async function(){
  setTimeout( async ()=>{
    let res = await fetch('https://cwpeng.github.io/live-records-samples/data/reviews.json');
    reviews.value = await res.json();
  }, 2000 );
});



</script>

<template>
  <div class="info">
    <div class="headline">Reviews list  </div>
    <div v-if="reviews===null">資料載入中</div>
    <ReviewList v-else :reviews="reviews"></ReviewList>

  </div>

</template>

<style scoped>
.info{
  display: block;
  align-content: center;
}

</style>