<template>
  <section class="intro-card">
    <!-- 背景微弱渐变光晕点缀 -->
    <div class="glow-bg"></div>

    <div class="card-body">
      <!-- 顶部小徽章 -->
      <div class="badge"> Personal Space</div>

      <!-- 主标题：使用渐变文字 (Gradient Text) -->
      <h1 class="title">
        Code, Design & <span class="gradient-text">Explore</span>
      </h1>

      <!-- 打字机效果呈现的副标题/介绍 -->
      <p class="description">
        <span class="typewriter-text">{{ currentText }}</span>
        <span class="cursor">|</span>
      </p>

      <!-- 对应官方主题色的彩色技术栈标签 -->
      <div class="tags">
        <span class="tag tag-vue">
          <i class="dot"></i> Vue 3
        </span>
        <span class="tag tag-js">
          <i class="dot"></i> JavaScript
        </span>
        <span class="tag tag-vite">
          <i class="dot"></i> Vite
        </span>
        <span class="tag tag-web">
          <i class="dot"></i> Web Dev
        </span>
      </div>
    </div>

    <!-- 右下角落款（后排配合完整 Footer 时会更自然） -->
    <div class="card-footer">
      <span class="signature">— by Lan</span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// 打字机显示的文案列表
const phrases = [
  '专注现代前端开发与 Web 技术实践。',
  '用代码构建简洁有力的 Web 体验。',
  '记录学习历程、技术思考与有趣的小项目。'
]

const currentText = ref('')
let phraseIndex = 0
let charIndex = 0
let isDeleting = false
let timer = null

// 打字机核心逻辑
const typeEffect = () => {
  const currentPhrase = phrases[phraseIndex]

  if (isDeleting) {
    currentText.value = currentPhrase.substring(0, charIndex - 1)
    charIndex--
  } else {
    currentText.value = currentPhrase.substring(0, charIndex + 1)
    charIndex++
  }

  let typeSpeed = isDeleting ? 40 : 80

  if (!isDeleting && charIndex === currentPhrase.length) {
    typeSpeed = 2000 // 完成打字后停顿 2 秒
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    phraseIndex = (phraseIndex + 1) % phrases.length
    typeSpeed = 500 // 删除完后停顿 0.5 秒开始打印下一句
  }

  timer = setTimeout(typeEffect, typeSpeed)
}

onMounted(() => {
  typeEffect()
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>

<style scoped>
.intro-card {
  position: relative;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 3.5rem 2rem 2.5rem;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden; /* 防止背景光晕溢出 */
}

/* 1. 背景微弱渐变光晕 (Glow Effect) */
.glow-bg {
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 150px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.12) 0%, rgba(255, 255, 255, 0) 70%);
  pointer-events: none;
}

.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 650px;
  width: 100%;
  z-index: 1;
}

.badge {
  display: inline-block;
  padding: 0.3rem 0.9rem;
  background-color: #eff6ff;
  color: #2563eb;
  font-size: 0.85rem;
  font-weight: 600;
  border-radius: 9999px;
  margin-bottom: 1.2rem;
}

/* 2. 标题与渐变文字 (Gradient Text) */
.title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
}

.gradient-text {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* 3. 打字机文案与光标 */
.description {
  color: #475569;
  font-size: 1.05rem;
  line-height: 1.8;
  margin-bottom: 1.8rem;
  min-height: 2rem; /* 固定高度防止换行时跳动 */
}

.cursor {
  display: inline-block;
  color: #2563eb;
  font-weight: 700;
  animation: blink 0.8s infinite;
  margin-left: 2px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* 4. 彩色技术栈标签 (Official Theme Colors) */
.tags {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.9rem;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.tag:hover {
  transform: translateY(-2px);
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

/* Vue 绿 */
.tag-vue {
  background-color: #ecfdf5;
  color: #059669;
  border: 1px solid #a7f3d0;
}
.tag-vue .dot { background-color: #10b981; }

/* JS 黄 */
.tag-js {
  background-color: #fefce8;
  color: #ca8a04;
  border: 1px solid #fef08a;
}
.tag-js .dot { background-color: #eab308; }

/* Vite 紫 */
.tag-vite {
  background-color: #faf5ff;
  color: #9333ea;
  border: 1px solid #e9d5ff;
}
.tag-vite .dot { background-color: #a855f7; }

/* Web 蓝 */
.tag-web {
  background-color: #eff6ff;
  color: #2563eb;
  border: 1px solid #bfdbfe;
}
.tag-web .dot { background-color: #3b82f6; }

/* 5. 底部落款 */
.card-footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed #f1f5f9;
}

.signature {
  font-size: 0.9rem;
  font-weight: 600;
  font-style: italic;
  color: #94a3b8;
}
</style>