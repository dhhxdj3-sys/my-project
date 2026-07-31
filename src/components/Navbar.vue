<template>
  <header class="navbar-header">
    <div class="navbar-container">
      <!-- 品牌/Logo 区域 -->
      <router-link to="/" class="brand-logo">
        
        <span class="logo-text">我的<span class="highlight">技术空间</span></span>
      </router-link>

      <!-- 导航菜单 -->
      <nav class="nav-menu">
        <router-link to="/" class="nav-item" exact-active-class="active">
          首页
        </router-link>
        <router-link to="/blog" class="nav-item" active-class="active">
          文章
        </router-link>
        <router-link to="/project" class="nav-item" active-class="active">
          项目
        </router-link>
        <router-link to="/skill" class="nav-item" active-class="active">
          技能
        </router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
/* 顶部导航栏卡片：毛玻璃 + 吸顶 */
.navbar-header {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background: rgba(255, 255, 255, 0.75); /* 半透明白色 */
  backdrop-filter: blur(12px); /* 核心：毛玻璃模糊效果 */
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  transition: all 0.3s ease;
}

/* 限制最大宽度与左右对齐 */
.navbar-container {
  max-width: 1200px;
  width: 90%;
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 品牌 Logo 样式 */
.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  transition: transform 0.2s ease;
}

.brand-logo:hover {
  transform: scale(1.02);
}

.logo-icon {
  font-size: 1.2rem;
}

.highlight {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 导航菜单样式 */
.nav-menu {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(241, 245, 249, 0.6); /* 浅灰色低调底色胶囊框 */
  padding: 0.3rem;
  border-radius: 9999px;
  border: 1px solid rgba(226, 232, 240, 0.6);
}

.nav-item {
  padding: 0.4rem 1.1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #64748b;
  text-decoration: none;
  border-radius: 9999px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 悬停态 */
.nav-item:hover {
  color: #0f172a;
  background-color: rgba(255, 255, 255, 0.6);
}

/* 当前激活高亮态 (Active Class) */
.nav-item.active {
  color: #2563eb;
  background-color: #ffffff;
  box-shadow: 0 2px 8px -2px rgba(37, 99, 235, 0.15);
}

@media (max-width: 640px) {
  .logo-text {
    font-size: 1rem;
  }
  .nav-item {
    padding: 0.35rem 0.75rem;
    font-size: 0.85rem;
  }
}
</style>