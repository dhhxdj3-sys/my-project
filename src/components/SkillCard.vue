<script setup>
const skills = [
    {
        name: 'HTMl',
        level: '✨✨✨✨'
    },
    {
        name: 'CSS',
        level: '✨'
    },
    {
        name: 'JavaScript',
        level: '✨✨✨'
    },
   {
    name: 'vue3',
    level: '✨'

   }
    

]
</script>
<template>
    <div class = 'skill'>
        <h2>我的技能</h2>
        <div v-for="skill in skills"
        :key="skill.name"
        class="card"
        >
        <h3>
            {{ skill.name }}
            </h3>
            <p>
                {{ skill.level }}
                </p>
                </div>
                </div>
    </template>
    <style scoped>
    .skill{
        margin-top: 40px;
    }
    .card{
        display:inline-block;
        padding:20px;
        margin:10px;
        broder:1px solid #ddd;
        border-radiue:10px;
    }
    </style>