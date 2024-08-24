<script setup>
import {ref} from "vue";
defineProps(["bkg_color"]);
let emit = defineEmits(["myEvent"]);
let change = function(){
    emit("myEvent");
};


</script>

<template>
    <main :style="{backgroundColor: bkg_color}">
    <button @click="change">click me to change following content</button>
    <button @click="$emit('myEvent2')">click me, I  use another implement</button>
    
    </main>



</template>

<style scoped>
main{
    background-color: brown;
}


</style>