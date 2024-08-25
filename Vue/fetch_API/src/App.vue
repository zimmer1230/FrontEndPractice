<script setup>
import ProductPage from "./ProductPage.vue";
import ReviewPage from "./ReviewPage.vue";
import {ref} from "vue";
let page = ref("product"); // product or review to show
let change = (nav_name)=>{
    page.value = nav_name;
};


</script>


<template>
    <nav>
        <span :class="page==='product'?'current':''" @click="change('product');">Products</span>
        <span :class="page==='review'?'current':''" @click="change('review')">Reviews</span>
    </nav>
    <ProductPage v-if="page==='product'"></ProductPage>
    <ReviewPage v-if="page==='review'"></ReviewPage>
</template>


<style scoped>
nav>span{
    margin-right: 10px;
}
nav>span.current{
    font-weight: bold;
}


</style>