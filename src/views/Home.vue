<script setup>
import Footer from '../components/Footer.vue'
import Homeintro from '../components/HomeIntro.vue'
import Navbar from '../components/Navbar.vue'
</script>
<template>
    <div class="home">
    <Navbar />
    <Homeintro />
    <Footer />
    </div>
    </template>
    <style scooed>
    .home{
        min-height:100vh
    }
    </style>