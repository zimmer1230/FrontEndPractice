<template>
    <input type="text" :value="name" @input="setName">
  </template>
  <script>
  import { useVuelidate } from '@vuelidate/core'
  import { required } from '@vuelidate/validators'
  
  export default {
    setup: () => ({ v$: useVuelidate() }),
    data: () => ({ name: '' }),
    validations () {
      return {
        name: { required }
      }
    },
    methods: {
      setName ($event) {
        // do some silly transformation
        this.name = $event.target.value.toUpperCase()
        this.v$.name.$touch()
      }
    }
  }
  </script>