<template>
<nav>
    <h2>我的空间</h2>
    <div>
<router-link to="/">
    首页</router-link>
    <router-link to="/blog">
        文章</router-link>
        <span>项目</span>
        <router-link to="/skill">
            技能</router-link>
        </div>
    </nav>
    </template>
    <style scoped>
    nav {
        display: flex;
        justify-content: space-between;
        padding: 20px;
    }
    span{
        margin:0 10px;
    }
    router-link{
    margin:0 10px;
    text-decoration:none;
    color:black;
}
nav a,
nav span{
    margin:0 10px;
}
    </style>