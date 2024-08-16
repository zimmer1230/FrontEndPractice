<script setup>
    let hello_world = "<a href='https://yihua0x44f.us.kg'> hello_world </a>";
    let my_class  = "trustable";
    let my_id = "yi";
    let trusted = false;
</script>

<template>


<div v-html="hello_world"></div>
<div :class="my_class">This is my class</div>
<div :id="my_id">This is my id</div>
<div :class="trusted?my_class:'lier'">This is me.</div>

<div>{{ my_class.toUpperCase() }}</div>


</template>

<style scoped>
    main{
        background-color: rgb(205, 55, 55);
    }

    .trustable{
        
        color: rgb(162, 162, 36);
    }

    .lier{
        color: red;
    }

    #yi{
        text-align: center;
        color:aqua
    }
</style>