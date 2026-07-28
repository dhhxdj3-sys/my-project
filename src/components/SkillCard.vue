<script setup>
const skills = [
    {
        name: 'HTMl',
        level: 4
    },
    {
        name: 'CSS',
        level: 1
    },
    {
        name: 'JavaScript',
        level: 2
    },
   {
    name: 'vue3',
    level: 2

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
             {{ "✨".repeat(skill.level) }}
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