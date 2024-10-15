<script setup>
import PortfolioCard from '@/components/PortfolioCard.vue';
import Footer from '@/components/Footer.vue';


</script>

<template>
    <div class="row" id="portfolio-intro">
        <div class="col-7">

        </div>
        <div class="col-5 d-flex align-items-center justify-content-center">
            <h1 class="display-1 text-light fw-bold">作品集</h1>
        </div>
    </div>

    <div class="d-md-flex" id="portfolio-menu">
        <div class="my-auto row justify-content-start">
        <PortfolioCard imgSrc="../src/assets/club-website.png" title="課外活動組 社團網頁" content=
            "2020年，Covid-19肆虐緣故，該年度學校的新生社團博覽會無法實體舉行，故臨時架設靜態網頁，供新生參閱。" 
            href="https://www2.cs.ccu.edu.tw/~cyh109u/"></PortfolioCard>
        <PortfolioCard imgSrc="../src/assets/mybooklist.png" title="To-do list 練習" content=
            "本作品使用Vue3開發，以Google Sheet作為資料庫串接。" 
            href="#"></PortfolioCard>
        <PortfolioCard imgSrc="../src/assets/educate.png" title="其他Vue3練習" content=
            "集合所有學習使用之元件與技術。" 
            href="#"></PortfolioCard>
        <PortfolioCard imgSrc="../src/assets/educate.png" title="個人履歷網頁" content=
            "現在這個網頁。" 
            href="#"></PortfolioCard>
        </div>
    </div>

    <Footer></Footer>
</template>

<style scoped>
    #portfolio-intro{
        min-height: 100vh;
        background-image: url('../assets/coding-bg.jpg');
        background-size: contain;
        background-repeat: no-repeat;
        background-color: black;
    }
    #portfolio-menu{
        min-height: 80vh;
        background-color: #eeeeee;
    }
    @media(max-width: 1200px){
        #portfolio-intro{
            min-height: 30vh;
        }
    }

</style>