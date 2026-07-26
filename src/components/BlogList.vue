<script setup>
import BlogCard from '../components/BlogCard.vue'
const blogs = [{
    title:'vue3组件',
    date:'2026-06-18',
    desc:"学习props,emit"
},
{
    title:'vue3计算属性',
    date:'2026-06-21',
    desc:"学习computed"
}



]
</script>
<template>
    <BlogCard
    v-for="blog in blogs"
    :title="blog.title"
    :date="blog.date"
    :desc="blog.desc"
    
    
     />
    </template>