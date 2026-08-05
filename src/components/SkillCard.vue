<script setup>

const skills = [
  {
    name: 'HTML5',
    level: 4,
    percent: 85,
    desc: '熟练掌握语义化标签、Flexbox / Grid 布局与响应式排版。'
  },
  {
    name: 'CSS3',
    level: 1,
    percent: 25,
    desc: '掌握 CSS 动画、过渡效果、Flex 弹性盒与毛玻璃质感设计。'
  },
  {
    name: 'JavaScript',
    level: 3,
    percent: 75,
    desc: '熟悉 ES6+ 语法、异步编程、DOM 操作与核心事件循环机制。'
  },
  {
    name: 'Vue.js 3',
    level: 3,
    percent: 80,
    desc: '熟练运用 Composition API、响应式原理与组件化构建。'
  },
  {
    name: '二游高手',
    level: 5,
    percent: 100,
    desc: '精通二次元手游逻辑与剧情体验，具备极高的角色理解与资源规划能力。'
  }
]
</script>

<template>
  <div class="skill-container">
    <div class="header-area">
      <div class="badge">🛠️ Tech Stack</div>
      <h2>我的 <span class="highlight">技术栈</span></h2>
      <p class="subtitle">用代码构建脚踏实地的能力，不断探索前端工程化实践。</p>
    </div>

    <!-- 卡片网格区域 -->
    <div class="skills-grid">
      <div v-for="skill in skills" :key="skill.name" class="card">
        <div class="card-header">
          <h3 class="skill-title">{{ skill.name }}</h3>
        </div>

        <p class="skill-desc">{{ skill.desc }}</p>

        <!-- 星星评价 + 进度条 -->
        <div class="card-footer">
          <div class="dots-rating">
  <span 
    v-for="i in 5" 
    :key="i" 
    class="dot" 
    :class="{ 'is-active': i <= skill.level }"
  ></span>
</div>
          <div class="progress-bar">
            <div class="progress" :style="{ width: skill.percent + '%' }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skill-container {
  max-width: 1000px;
  margin: 20px auto 40px;
  padding: 0 20px;
}

/* 头部样式 */
.header-area {
  text-align: center;
  margin-bottom: 30px;
}

.badge {
  display: inline-block;
  padding: 4px 12px;
  background-color: #eff6ff;
  color: #2563eb;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 9999px;
  margin-bottom: 8px;
}

.header-area h2 {
  font-size: 2rem;
  color: #0f172a;
  font-weight: 800;
  margin-bottom: 8px;
}

.highlight {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  color: #64748b;
  font-size: 0.95rem;
}

/* 网格布局 */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

/* 卡片主体 */
.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px rgba(37, 99, 235, 0.12);
  border-color: #bfdbfe;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.skill-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.skill-desc {
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.5;
  margin-bottom: 16px;
}

/* 底部评价与进度条 */
.card-footer {
  margin-top: auto;
}

.dots-rating {
  display: flex;
  gap: 6px;
  margin-bottom: 8px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background-color: #e2e8f0; /* 未激活浅灰 */
  transition: all 0.3s ease;
}

.dot.is-active {
  background-color: #2563eb; /* 激活高亮蓝 */
  box-shadow: 0 0 6px rgba(37, 99, 235, 0.4);
}

.progress-bar {
  width: 100%;
  height: 6px;
  background-color: #f1f5f9;
  border-radius: 9999px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #2563eb, #3b82f6);
  border-radius: 9999px;
  transition: width 0.6s ease;
}
</style>