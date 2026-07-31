<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  name: String,
  tech: String,
  desc: String,
  path: String
})

function goProject() {
  if (props.path) {
    router.push(props.path)
  }
}

// 自动把 "vue3+js" 或 "vue3" 这种文本按加号/空格切开，渲染成独立的小标签
const techList = computed(() => {
  if (!props.tech) return []
  return props.tech.split(/[\+\,\s]+/).map(item => item.trim())
})
</script>

<template>
  <div class="card">
    <div class="card-body">
      <!-- 标题 -->
      <h3 class="title">{{ name }}</h3>

      <!-- 技术栈标签区 -->
      <div class="tech-tags">
        <span v-for="(item, index) in techList" :key="index" class="tag">
          {{ item }}
        </span>
      </div>

      <!-- 项目描述 -->
      <p class="desc">{{ desc }}</p>
    </div>

    <!-- 底部体验按钮 -->
    <div class="card-footer">
      <button class="btn" @click="goProject">
        <span>体验项目</span>
        <span class="arrow">→</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
/* 单张卡片：卡片式阴影 + 过渡动效 */
.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.03);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 100%;
  box-sizing: border-box;
}

/* 鼠标悬停上升效果 */
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px -8px rgba(37, 99, 235, 0.12);
  border-color: #bfdbfe;
}

.title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.75rem 0;
}

/* 蓝色技术栈胶囊标签 */
.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  font-size: 0.75rem;
  font-weight: 600;
  color: #2563eb;
  background-color: #eff6ff;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  border: 1px solid #dbeafe;
  text-transform: uppercase;
}

.desc {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
}

/* 底部按钮区 */
.card-footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px dashed #f1f5f9;
}

.btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.65rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:hover {
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
}

.btn:hover .arrow {
  transform: translateX(4px);
}

.arrow {
  transition: transform 0.2s ease;
}
</style>