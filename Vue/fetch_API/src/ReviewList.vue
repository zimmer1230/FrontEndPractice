<script setup>
defineProps(['reviews']);

</script>


<template>

<div v-for="review in reviews">
      <br>
      <li>name: {{ review.name }}</li> 
      <li>comment: {{ review.message }} </li>
      <li>score: {{ review.star }} </li>
      <br>
      <hr style="color: azure;">
</div>

</template>

