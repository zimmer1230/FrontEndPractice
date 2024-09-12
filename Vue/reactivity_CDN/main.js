import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'


createApp({
  setup() {
    let state = ref({
        title: "Reactivity Practice!",
        className: "default"
      });
      function handler(){
        console.log('clicked!');
        state.value.title = "You clicked me.";
        state.value.className = "clicked";
      };
    return {
        state, handler
    }
  },
  template:`
    <div v-bind:class="state.className">{{ state.title }}</div>
    <button @click="handler" class="circle-button">Push me!</button>
  `,
}).mount('#app')

