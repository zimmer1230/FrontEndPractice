<script setup>
    import {ref} from "vue";
    import { onMounted, onUnmounted, onUpdated } from "vue";
    let text = ref("Main content.");
    let counter = ref(0);
    let scheduleId;
    onMounted( ()=> {
        console.log("Mounted.");

        scheduleId = window.setInterval( ()=>{
        counter.value += 1;
        console.log("counting! ", counter.value)}, 1000 );

    });
    onUnmounted( ()=> {
        console.log("Unmounted.");
        window.clearInterval(scheduleId);
    } );
    onUpdated( ()=>console.log( "Updated." ) );
    
    let changne_text = ()=> text.value = "New main content."




</script>

<template>
    <div id="content">{{ text }}</div>
    <div id="counter">{{ counter }}</div>
    <button @click="changne_text()">Change content</button>
</template>