<script setup>
import BlogList from '../components/BlogList.vue'
</script>

<template>
  <div class="blog-page">
    <!-- 统一的页头头部 -->
    <header class="page-header">
      <h1 class="page-title">我的<span class="highlight">文章</span></h1>
      <p class="page-subtitle">记录前端技术探索、Vue 3 组件实践与日常学习思考。</p>
    </header>

    <!-- 文章列表组件 -->
    <main class="page-content">
      <BlogList />
    </main>
  </div>
</template>

<style scoped>
/* 页面主容器：居中与宽度控制 */
.blog-page {
  max-width: 780px;
  width: 90%;
  margin: 0 auto;
  padding: 2.5rem 0 5rem;
}

/* 页头布局与分割线 */
.page-header {
  margin-bottom: 2rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid #f1f5f9;
}

/* 标题：深色 + 蓝色高亮 */
.page-title {
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.5px;
  margin-bottom: 0.4rem;
}

.page-title .highlight {
  color: #2563eb;
}

/* 副标题：中灰 */
.page-subtitle {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.5;
}
</style>