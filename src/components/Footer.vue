<template>
  <footer class="site-footer">
    <div class="footer-container">
      <!-- 上半部分：品牌与社交链接 -->
      <div class="footer-content">
        <div class="footer-brand">
          <span class="brand-logo"> 我的空间</span>
          <p class="brand-desc">用代码记录成长，构建简洁有力的 Web 体验。</p>
        </div>

        <div class="footer-links">
          <!-- GitHub 链接 -->
          <a
            href="https://github.com/dhhxdj3-sys/my-project"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
          >
            <svg class="icon" viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="currentColor"
                d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.1-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
              />
            </svg>
            <span>GitHub 仓库</span>
          </a>
        </div>
      </div>

      <!-- 下半部分：版权与署名 -->
      <div class="footer-bottom">
        <p class="copyright">
          © {{ currentYear }} Lan的技术空间. Built with Vue 3 & Vite.
        </p>
        <span class="footer-signature"></span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

// 动态获取当前年份
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.site-footer {
  width: 100%;
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
  margin-top: 4rem;
  padding: 2.5rem 0 1.5rem;
}

.footer-container {
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.brand-logo {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
}

.brand-desc {
  font-size: 0.85rem;
  color: #64748b;
  margin-top: 0.3rem;
}

.social-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.9rem;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #334155;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.social-link:hover {
  background-color: #0f172a;
  color: #ffffff;
  border-color: #0f172a;
  transform: translateY(-2px);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px dashed #f1f5f9;
  padding-top: 1.2rem;
  font-size: 0.85rem;
  color: #94a3b8;
}

.footer-signature {
  font-weight: 600;
  font-style: italic;
  color: #64748b;
}

@media (max-width: 640px) {
  .footer-content,
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
  }
}
</style>