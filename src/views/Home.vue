<script setup>
import Footer from '../components/Footer.vue'
import Homeintro from '../components/HomeIntro.vue'
import Navbar from '../components/Navbar.vue'
import Profile from '../components/Profile.vue'


</script>
<template>
    <div class="home">
    <Navbar />
    <Homeintro />
    <Profile />
    
   
    <Footer />
    </div>
    </template>
    <style scooed>
    .home{
        min-height:100vh
    }
    </style>