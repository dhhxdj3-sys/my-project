<script setup>
import BlogCard from '../components/BlogCard.vue'
import {ref} from 'vue'


const blogs =ref( [{
    title:'vue3组件',
    date:'2026-06-18',
    desc:"学习props,emit",
    like:0,
    collect:false,
    comments:[]
},
{
    title:'vue3计算属性',
    date:'2026-06-21',
    desc:"学习computed",
    like:0,
    collect:false,
    comments:[]
}

])
</script>
<template>
    <BlogCard
    v-for="(blog,index) in blogs"
    :key="index"
    :title="blog.title"
    :date="blog.date"
    :desc="blog.desc"
    :like="blog.like"
    :collect="blog.collect"
    :comments="blog.comments"
    @like="blog.like++"
    @collect="blog.collect=!blog.collect"
    @comment="blog.comments.push($event)"
    
    
     />
    </template>