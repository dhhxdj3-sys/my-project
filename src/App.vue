<template>
  <div class="app-container">
    <!-- 1. 全局顶部导航栏（直接使用你 components 里的 Navbar 组件） -->
    <Navbar />

    <!-- 2. 主内容区域：路由页面（Home, Blog 等）在这里切换显示 -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
// 引入你现有的 Navbar 组件
import Navbar from './components/Navbar.vue'
</script>

<style>
/* 1. 清除浏览器默认边距，开启标准盒模型 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 2. 统一全局背景色与现代字体 */
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: #f8fafc; /* 换成柔和的浅灰背景，不再是死白 */
  color: #1e293b;           /* 舒适的深色文字 */
  line-height: 1.6;
}

/* 3. 布局容器：保证整体页面至少占满屏幕高度 */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1; /* 让内容区域自动撑开，把页脚（如果有的话）顶在最底部 */
}
</style>