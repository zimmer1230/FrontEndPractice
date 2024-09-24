<script setup>
defineProps( {
    label: {
        type: String,
        default: ''
    },
    modelValue: {
        type: String,
        default: ''
    }
} );


</script>

<template>
    <div class="input-wrap">
        <label>{{ label }}</label>
        <input 
            type="text"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            v-bind="$attrs">
    </div>

</template>

<style scoped>
.input-wrap{
    display: flex;
    flex-direction: column;
}

.input-wrap > input{
    font-size: 16px;
    padding: 8px 12px;
}

</style>