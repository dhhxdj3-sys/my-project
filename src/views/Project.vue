<script setup>
import ProjectCard from '@/components/ProjectCard.vue';

const projects = [
  {
    name: '学生成绩管理系统',
    tech: 'vue3 + reactive',
    desc: '学生成绩管理系统是一个基于 Vue 3 的前端项目，用于管理学生成绩信息与实时平均分计算。',
    path: '/project/student'
  },
  {
    name: '在线购物系统',
    tech: 'vue3 + pinia',
    desc: '实现了商品的列表展示、动态添加购物车以及价格总计自动计算。',
    path: '/project/shopping'
  },
  {
    name: '猜数字 Game',
    tech: 'vue3 + js',
    desc: '基于响应式状态开发的互动猜数字小游戏，具备输入校验与重置逻辑。',
    path: '/project/guess'
  }
]
</script>

<template>
  <div class="project-page">
    <!-- 1. 顶部 Header 提升质感 -->
    <div class="page-header">
      <div class="badge"> Portfolio</div>
      <h1 class="page-title">我的 <span class="gradient-text">实战项目</span></h1>
      <p class="page-desc">
        这里展示了我使用 Vue 3 核心技术栈构建的组件与小模块，点击“体验项目”可直达演示。
      </p>
    </div>

    <!-- 2. 网格容器：解决靠左与空旷问题 -->
    <div class="project-grid">
      <ProjectCard
        v-for="project in projects"
        :key="project.name"
        :name="project.name"
        :tech="project.tech"
        :desc="project.desc"
        :path="project.path"
      />
    </div>
  </div>
</template>

<style scoped>
/* 整个页面最大宽度居中 */
.project-page {
  max-width: 1100px;
  width: 90%;
  margin: 0 auto;
  padding: 2rem 0 4rem;
}

/* 页头样式 */
.page-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 2.5rem;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.8rem;
  background-color: #eff6ff;
  color: #2563eb;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 9999px;
  margin-bottom: 0.6rem;
}

.page-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.6rem;
}

.gradient-text {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-desc {
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* 核心：Grid 网格布局，卡片会自动并排并撑满自适应宽度 */
.project-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}
</style>