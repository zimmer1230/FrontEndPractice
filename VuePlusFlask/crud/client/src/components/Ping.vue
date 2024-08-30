<template>
    <div>
      <p>{{ msg }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Ping',
    data() {
      return {
        msg: '',
      };
    },
    methods: {
      getMessage() {
        const path = 'http://localhost:5001/ping';
        fetch(path)
          .then((res) => {
            return res.json();
          }).then((res_json)=>{
            this.msg = res_json;
          })
          .catch((error) => {
            
            console.error(error);
          });
      },
    },
    created() {
      this.getMessage();
    },
  };
  </script>