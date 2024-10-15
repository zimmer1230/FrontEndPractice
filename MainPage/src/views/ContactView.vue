<script setup>
    import Footer from '@/components/Footer.vue';
</script>

<template>
    <div id="contact-page" style="padding-top: 0.1px;">
        <h1 class="text-center mt-5 display-1">聯繫方式</h1>
        <div class="d-flex justify-content-center">
            <ul class="display-6">
                <li>
                    Email
                    <ul>
                        <li>yi0x44f@gmail</li>
                    </ul>
                </li>
                <li>
                    Telephone
                    <ul>
                        <li>+886 909618043</li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <Footer></Footer>
</template>

<style scoped>
    #contact-page{
        min-height: 100vh;
        background-color: #f3f3f3;
    }
</style>