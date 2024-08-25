<script setup>
defineProps(['products']);
</script>

<template>

<div v-for="product in products">
      <br>
      <li>number: {{ product.number }}</li> 
      <li>name: {{ product.name }} </li>
      <li>price: {{ product.price }} </li>
      <li>description: {{ product.description }}</li>
      <br>
      <hr style="color: azure;">
</div>

</template>