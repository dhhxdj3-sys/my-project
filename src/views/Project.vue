<script setup>
import ProjectCard  from '@/components/ProjectCard.vue';
const projects = [
    {
        name:'学生成绩管理系统',
        tech:'vue3',
        desc:'学生成绩管理系统是一个基于vue3的前端项目,用于管理学生成绩信息',
        path:'/project/student'
    },
    {
        name:'在线购物系统',
        tech:'vue3',
        desc:'实现商品添加和价格计算',
        path:'/project/shopping'
    },
    {
        name:'猜数字Game',
        tech:'vue+js',
        desc:'进行数字猜测',
        path:'/project/guess'
    } 
]
</script>
<template>
    <h1>我的项目</h1>
    <ProjectCard
    v-for="project in projects"
    :key="project.name"
    :name="project.name"
    :tech="project.tech"
    :desc="project.desc"
    :path="project.path"
    
    />
    </template>