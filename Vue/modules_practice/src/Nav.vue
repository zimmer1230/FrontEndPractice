<script setup>

    defineProps(["title"]);


</script>

<template>
    <h1 @click="change"> {{ title }} </h1>
    <nav> Basic navigation:  </nav>

</template>


<style scoped>
nav{
    background-color: blueviolet;
    text-align: center;
    padding: 20px;
    border-radius: 20px;
    
}


</style>