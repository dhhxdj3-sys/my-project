<script setup>

import avatar from '../assets/avatar.png'

</script>

<template>
  <div class="profile-section">
    <!-- 1. 标题区 -->
    <div class="section-header">
      <h2 class="section-title"> 精选实践项目</h2>
      <router-link to="/project" class="more-link">查看全部 →</router-link>
    </div>

    <!-- 2. 精选项目网格 -->
    <div class="projects-grid">
      <!-- 项目卡片 1 -->
      <div class="project-card">
        <div class="card-header">
          <span class="project-icon"></span>
          <span class="project-tag">Vue 3 / JS</span>
        </div>
        <h3 class="project-title">猜数字小游戏</h3>
        <p class="project-desc">
          基于 Vue 3 响应式状态管理构建的互动小游戏，包含完整的输入校验、重置逻辑与历史记录提示。
        </p>
        <div class="card-footer">
          <span class="status-dot"></span> 线上可玩
        </div>
      </div>

      <!-- 项目卡片 2 -->
      <div class="project-card">
        <div class="card-header">
          <span class="project-icon"></span>
          <span class="project-tag">Vue 3 / Computed</span>
        </div>
        <h3 class="project-title">学生成绩管理系统</h3>
        <p class="project-desc">
          使用 Vue 3 计算属性（Computed）动态计算班级平均分，支持学员信息的响应式增删改查。
        </p>
        <div class="card-footer">
          <span class="status-dot"></span> 练习组件
        </div>
      </div>
    </div>

   
    <div class="stats-card">
      <div class="stats-header">
        <img :src="avatar" alt="小头像" class="mini-avatar" />
        <div>
          <h3 class="stats-title">前端开发萌新 · 持续成长中</h3>
          <p class="stats-sub">保持热爱，代码打卡不间断...</p>
        </div>
      </div>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-number">Vue 3</span>
          <span class="stat-label">主修核心框架</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">Git</span>
          <span class="stat-label">版本控制管理</span>
        </div>
        <div class="stat-item">
          <span class="stat-number">Vite</span>
          <span class="stat-label">现代构建工具</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-section {
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  width: 100%;
}

/* 标题栏 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #0f172a;
}

.more-link {
  font-size: 0.9rem;
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s;
}

.more-link:hover {
  opacity: 0.8;
}

/* 项目网格布局 */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.project-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

/* 悬停上浮与阴影强化 */
.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.08);
  border-color: #cbd5e1;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.project-icon {
  font-size: 1.5rem;
}

.project-tag {
  font-size: 0.75rem;
  font-weight: 600;
  background-color: #f1f5f9;
  color: #475569;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
}

.project-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
}

.project-desc {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.2rem;
}

.card-footer {
  font-size: 0.8rem;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.status-dot {
  width: 6px;
  height: 6px;
  background-color: #10b981;
  border-radius: 50%;
}

/* 学习状态卡片 */
.stats-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem 2rem;
}

.stats-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.2rem;
}

.mini-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #2563eb;
}

.stats-title {
  font-size: 1.05rem;
  font-weight: 700;
  color: #0f172a;
}

.stats-sub {
  font-size: 0.85rem;
  color: #64748b;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  border-top: 1px dashed #e2e8f0;
  padding-top: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
}

.stat-number {
  font-size: 1.1rem;
  font-weight: 800;
  color: #2563eb;
}

.stat-label {
  font-size: 0.8rem;
  color: #64748b;
  margin-top: 0.2rem;
}

@media (max-width: 640px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
}
</style>