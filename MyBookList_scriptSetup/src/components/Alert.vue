<script setup>

defineProps( ["message", "type"] );


</script>

<template>
    <div>
        <div :class="type" role="alert">{{ message }}</div>
        <br>
    </div>
</template>