<script setup>
import { ref, computed } from 'vue'

let id = 1

const students = ref([
  { id: id++, name: '张伟', score: 88 },
  { id: id++, name: '李娜', score: 95 },
  { id: id++, name: '王强', score: 72 },
  { id: id++, name: '刘洋', score: 58 },
  { id: id++, name: '陈晨', score: 84 }
])

const newName = ref('')
const newScore = ref('')

function add() {
  if (!newName.value.trim() || newScore.value === '') return


  const scoreNum = Math.min(100, Math.max(0, Number(newScore.value)))

  students.value.push({
    id: id++,
    name: newName.value.trim(),
    score: scoreNum
  })

  // 清空输入框
  newName.value = ''
  newScore.value = ''
}

function remove(item) {
  students.value = students.value.filter((t) => t.id !== item.id)
}

// 平均分计算
const average = computed(() => {
  if (students.value.length === 0) return 0
  const total = students.value.reduce((sum, item) => sum + Number(item.score), 0)
  return total / students.value.length
})

// 额外扩展：最高分计算
const maxScore = computed(() => {
  if (students.value.length === 0) return 0
  return Math.max(...students.value.map(s => s.score))
})
</script>

<template>
  <div class="score-container">
    <!-- 页头标语 -->
    <div class="page-header">
      <div class="badge"> Score System</div>
      <h1 class="page-title">学生成绩 <span class="gradient-text">管理系统</span></h1>
      <p class="page-desc">基于 Vue 3 响应式数组与计算属性构建的交互面板。</p>
    </div>

    <!-- 主卡片 -->
    <div class="card">
      <!-- 录入表单 -->
      <form class="add-form" @submit.prevent="add">
        <div class="input-group">
          <input v-model="newName" placeholder="学生姓名..." required />
          <input v-model="newScore" type="number" min="0" max="100" placeholder="分数 (0-100)" required />
        </div>
        <button class="btn-add">
          <span>+ 添加记录</span>
        </button>
      </form>

      <!-- 顶部统计栏 -->
      <div class="stats-bar">
        <div class="stat-item">
          <span class="stat-label">总人数</span>
          <span class="stat-value">{{ students.length }} 人</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">平均分</span>
          <span class="stat-value highlight-blue">{{ average.toFixed(1) }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">最高分</span>
          <span class="stat-value highlight-green">{{ maxScore }}</span>
        </div>
      </div>

      <!-- 学生成绩列表 -->
      <div class="student-list">
        <div v-for="item in students" :key="item.id" class="student-item">
          <div class="user-info">
            <span class="avatar">{{ item.name.charAt(0) }}</span>
            <span class="name">{{ item.name }}</span>
          </div>

          <div class="score-area">
            <span class="score-num">{{ item.score }} <small>分</small></span>
            <span
              class="tag"
              :class="{
                'tag-excellent': item.score >= 90,
                'tag-pass': item.score >= 60 && item.score < 90,
                'tag-fail': item.score < 60
              }"
            >
              {{ item.score >= 90 ? ' 优秀' : item.score >= 60 ? ' 及格' : ' 不及格' }}
            </span>
          </div>

          <button class="btn-del" title="删除记录" @click="remove(item)">
            X
          </button>
        </div>

        <!-- 列表空状态 -->
        <div v-if="students.length === 0" class="empty-tip">
         
          <p>暂无成绩记录，请在上方录入学生信息</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.score-container {
  max-width: 680px;
  width: 90%;
  margin: 0 auto;
  padding: 2rem 0 4rem;
}

/* 页头样式 */
.page-header {
  text-align: center;
  margin-bottom: 2rem;
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
  font-size: 2rem;
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
}

/* 主卡片容器 */
.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 1.8rem;
  box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.04);
}

/* 表单区 */
.add-form {
  display: flex;
  gap: 12px;
  margin-bottom: 1.5rem;
}

@media (max-width: 480px) {
  .add-form {
    flex-direction: column;
  }
}

.input-group {
  display: flex;
  gap: 8px;
  flex: 1;
}

.input-group input {
  flex: 1;
  padding: 0.65rem 0.9rem;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  outline: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.input-group input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.btn-add {
  padding: 0.65rem 1.2rem;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.btn-add:hover {
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  transform: translateY(-1px);
}

/* 顶部统计卡片 */
.stats-bar {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  background-color: #f8fafc;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-label {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
}

.highlight-blue {
  color: #2563eb;
}

.highlight-green {
  color: #16a34a;
}

/* 成绩列表 */
.student-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.student-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1rem;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.student-item:hover {
  background-color: #f8fafc;
  border-color: #e2e8f0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* 首字头像 */
.avatar {
  width: 32px;
  height: 32px;
  background-color: #eff6ff;
  color: #2563eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
}

.name {
  font-weight: 600;
  color: #1e293b;
  font-size: 0.95rem;
}

.score-area {
  display: flex;
  align-items: center;
  gap: 12px;
}

.score-num {
  font-weight: 700;
  font-size: 1rem;
  color: #0f172a;
}

.score-num small {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: normal;
}

/* 标签样式 */
.tag {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
}

.tag-excellent {
  background-color: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

.tag-pass {
  background-color: #eff6ff;
  color: #2563eb;
  border: 1px solid #bfdbfe;
}

.tag-fail {
  background-color: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

/* 删除按钮 */
.btn-del {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  opacity: 0.6;
  transition: all 0.2s ease;
}

.btn-del:hover {
  opacity: 1;
  background-color: #fef2f2;
}

/* 空状态 */
.empty-tip {
  text-align: center;
  padding: 2rem 0;
  color: #94a3b8;
}

.empty-icon {
  font-size: 2.5rem;
  display: block;
  margin-bottom: 0.4rem;
}
</style>