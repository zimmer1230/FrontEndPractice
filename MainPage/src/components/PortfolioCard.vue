<script setup>
import { onMounted } from 'vue';

defineProps({
    imgSrc: String,
    title: String,
    content: String,
    href: String
});
onMounted( ()=>{

} )

</script>

<template>
    <div class="col-xl-3 col-md-4 col-sm-6 col-12 mt-5 d-flex justify-content-center portfolio-card" >
        <div class="col-10">
            <div class="card flex-lg-fill  h-100 border border-2 border-black">
                <div class="image-container">
                    <img :src="imgSrc" class="card-img-top border-dark" alt="">
                </div>
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title fw-bold ">{{ title }}</h5>
                    <hr>
                    <p class="card-text mt-auto py-2">{{ content }}</p>
                    <div class="mt-auto d-flex justify-content-center" >
                        <a :href="href" class="btn btn-primary fw-semibold" >查看作品</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style scope>
.image-container {
    min-height: 200px;
    max-height: 200px;
    overflow: hidden; /* Hide the overflow */
    position: relative;
}
.image-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Black with 50% opacity */
  pointer-events: none; /* Prevent overlay from blocking interactions with the image */
}
.image-container img {
  object-fit: cover; /* Automatically crop the image */
  object-position: center; /* Center the image */
  filter: blur(2px);
}

</style>