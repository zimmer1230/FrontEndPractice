<script setup>
</script>

<template>
  <div id="self-intro">
    <img class="circle-img"  src="../assets/portrait.jpg" alt="">
    <div class="text-container">
      <h1>Hello</h1>
      <h2>About me</h2>
      <p>I'm a junior front-end developer. I enjoy designing website like this one.<br>
        If you are interested in my portfolio, please click the button "Portfolio" above.
      </p>
    </div>
  </div>

  <div id="timeline">
    <div id="education" class="description">
      <h1>Education</h1>
      <ul>
        <li>2020~2024 CCU</li>
      </ul>
    </div>
    <div id="experience" class="description">
      <h1>Experience</h1>
    </div>
  </div>


</template>

<style scoped>
  h1{
    font-size: 90px;
  }
  #self-intro{
    display: flex;
    min-height: 100vh;
    background-color: #F3F3F3;
    justify-content: center;
    align-items: center;
    padding-top: 0.1px;
  }
  #timeline{
    display: flex;
    min-height: 100vh;
    background-color: #004FA0;
    justify-content: center;
    align-items: center;
  }
  .circle-img{
    width: 480px; /* Define the width */
    height: 480px; /* Define the height */
    border-radius: 50%; /* Make the image circular */
    margin: 100px;
  }
  .text-container{
    padding: 0 10px;
  }
  .description{
    margin: 100px;
  }
  .description h1{
    color: #F3F3F3;
  }
  .description ul{
    color: #F3F3F3;
  }
  @media(max-width: 960px){
    .circle-img{
      width: 240px;
      height: 240px;
      margin: 50px;
    }
  }

  @media(max-width: 400px){
    #self-intro{
      display: block;
    }
    .circle-img{
      display: block;
      margin: 80px auto;
    }

  }



</style>