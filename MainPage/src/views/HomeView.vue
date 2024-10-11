<script setup>
  import Accordion from '@/components/Accordion.vue';
  import Footer from '@/components/Footer.vue';

  const MyCollegeDeg = ['資訊工程學系 學士','金融科技學程'];
  const MyHighschoolDeg = ['普通科 自然組畢業'];
  const MyClub = ['校園網路策進會 副會長','校園網路策進會 活動部長','鋼琴社 社長', '喜劇社 副社長'];
  const MyJob = ['資訊處 宿網網管', '課外活動組 靜態網頁撰寫接案'];

  const MyFrontEndSkills = [
    {skill: 'HTML', style: 'text-bg-secondary'},
    {skill: 'CSS', style: 'text-bg-primary'},
    {skill: 'Javascript', style: 'text-bg-warning'},
    {skill: 'Vue3', style: 'text-bg-success'},
    {skill: 'Bootstrap', style: 'text-bg-primary'},
    ];
  const MyProgrammingSkills = [
    {skill: 'Python', style: 'text-bg-warning'},
    {skill: 'C/C++', style: 'text-bg-primary'},
    {skill: 'Node.js', style: 'text-bg-success'}
  ];
  const MyLanguageSkills = [
    {skill: 'English', style: 'text-bg-warning'},
    {skill: '台語', style: 'text-bg-secondary'}  
  ];



  window.addEventListener('scroll', function() {
      const containerB = document.getElementById('skill-col');
      const titleB = document.getElementById('skill-title');
      const containerBPosition = containerB.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // Calculate the scroll percentage relative to container B
      const scrollProgress = Math.min(Math.max((windowHeight - containerBPosition) / windowHeight, 0), 1);

      // Smoothly adjust the title's vertical position
      // When `scrollProgress` is 0, the title is at the top, and when it is 1, the title is centered
      const startOffset = 20;  // Start 20px from the top of container B
      const centerOffset = (containerB.offsetHeight / 2) - (titleB.offsetHeight / 2);  // Calculate the center position
      const topPosition = startOffset + (centerOffset - startOffset) * scrollProgress;

      titleB.style.top = `${topPosition}px`; // Apply the calculated position
    });


</script>

<template>
  <div class="row align-items-center" id="self-intro" style="align-content: center;">
    <div class="col-lg-6 col-sm-12 d-flex justify-content-center">
      <span class="d-flex align-items-center">
        <img class="circle-img img-fluid"  src="../assets/portrait.jpg" alt="" style="height: auto;">
      </span>
    </div>

    <div class="col-lg-6 col-sm-12 d-flex">
      <div class="container">
        <h1 class="fw-bold d-none d-lg-block col display-1">Hello</h1>
        <p class="fw-semibold lead">About me</p>
        <p>I'm a junior front-end developer. I enjoy designing website like this one.<br>
        If you are interested in my portfolio, please click the button "Portfolio" above.
        </p>
      </div>
    </div>
    
  </div>

  <!-- timeline -->
  <div class="row justify-content-center" id="timeline">
    <!-- Education -->
    <div class="col-lg-5 col-sm-12 p-5" id="education">
      <span class="d-flex justify-content-center">
        <img src="../assets/educate.png" alt="" style="max-width: 60px;">
      </span>
      <h2 class="text-center mb-5">Education</h2>
      <Accordion title="國立中正大學(2021~2024)" :content="MyCollegeDeg" id="CCU"></Accordion>
      <Accordion title="國立屏東高級中學(2018~2020)" :content="MyHighschoolDeg" id="PTHS"></Accordion>
    </div>

    <!-- Experience -->
    <div class="col-lg-5 col-sm-12 p-5" id="experience" >
      <span class="d-flex justify-content-center">
        <img src="../assets/experience.png" alt="" style="max-width: 60px;">
      </span>
      <h2 class="text-center mb-5">Experience</h2>
      <Accordion title="社團活動經歷" :content="MyClub" id="CLUB"></Accordion>
      <Accordion title="校內工讀經歷" :content="MyJob" id="JOB"></Accordion>
    </div>

  </div>

  <!-- skill -->
  <div class="row justify-content-center align-items-center bg-light" id="skill">

    <div class="col-lg-4 col-sm-12 d-none d-lg-flex" id="skill-col" style="min-height: 100vh; position: relative;">
      <h2 class="p-5 text-center display-2" id="skill-title">Skills</h2>
    </div>

    <h2 class="p-5 text-center display-2 d-lg-none">Skills</h2>

    <div class="row col-lg-6 col-sm-10 text-light justify-content-center bg-light">

      <div class="card my-5 p-2">
        <div class="card-body">
          <h4 class="card-title">網頁前端</h4>
          <p class="card-text">
            <span class="badge me-1" :class="skill.style"  v-for="(skill, idx) in MyFrontEndSkills" :key="idx">{{ skill.skill }}</span>
          </p>
        </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">能使用 <span class="badge text-bg-warning">Javascript</span> Ajax 串接API，開發簡單前端 CRUD APP。</li>
            <li class="list-group-item">能根據需求調整 <span class="badge bg-primary">CSS</span> <span class="badge bg-primary">Bootstraps</span> 外觀。 </li>
            <li class="list-group-item">能使用 <span class="badge bg-success">Vue3</span> 撰寫元件，並開發SPA(Single Page Application)。 </li>
          </ul>
      </div>


      
      

      <div class="card my-5 p-2">
        <div class="card-body">
          <h4 class="card-title">程式語言</h4>
          <p class="card-text">
            <span class="badge me-1" :class="skill.style"  v-for="(skill, idx) in MyProgrammingSkills" :key="idx">{{ skill.skill }}</span>
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">能使用 <span class="badge text-bg-warning">Python</span> 常用套件開發爬蟲程式、機器學習。</li>
          <li class="list-group-item">能使用 <span class="badge text-bg-primary">C/C++</span> 開發 基本 console APP。</li>
          <li class="list-group-item">能使用 <span class="badge text-bg-success">Node.js</span> 串接 Fugle API 開發程式交易策略。</li>
        </ul>
      </div>

      <div class="card my-5 p-2">
        <div class="card-body">
          <h4 class="card-title">語言</h4>
          <p class="card-text">
            <span class="badge me-1" :class="skill.style"  v-for="(skill, idx) in MyLanguageSkills" :key="idx">{{ skill.skill }}</span>
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">TOEIC 805分</li>
          <li class="list-group-item">能使用台語進行日常對話。</li>
        </ul>
      </div>
    </div>
  </div>


  <Footer></Footer>
</template>

<style scoped>
  #self-intro{
    min-height: 100vh;
    background-color: #F3F3F3;
  }
  #timeline{
    min-height: 40vh;
    /* background-color: #004FA0; */
  }
  #skill{
    min-height: 100vh;
  }
  .circle-img{
    width: 480px; /* Define the width */
    height: 480px; /* Define the height */
    border-radius: 50%; /* Make the image circular */
  }

  #skill-title{
    position: absolute;
    left: 50%;
    transform: translateX(-50%); /* Center horizontally */
    transition: top 0.3s ease-out; /* Smooth transition for the position */
  }

  @media(max-width: 992px){
    .circle-img{
      width: 300px;
      height: 300px;
    }
  }





</style>