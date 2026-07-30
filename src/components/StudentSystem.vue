<script setup>
import { ref, computed } from 'vue'

let id = 1

const students = ref([
  { id: id++, name: '张伟', score: 88 },
  { id: id++, name: '李娜', score: 95 },
  { id: id++, name: '王强', score: 72 },
  { id: id++, name: '刘洋', score: 60 },
  { id: id++, name: '陈晨', score: 84 }
])

const newName = ref('')
const newScore = ref('')

function add() {
  if (!newName.value.trim() || newScore.value === '') {
    
    return
  }
  
  students.value.push({
    id: id++,
    name: newName.value.trim(),
    score: Number(newScore.value)
  })

  // 清空输入框
  newName.value = ''
  newScore.value = ''
}

function remove(item) {
  students.value = students.value.filter((t) => t.id !== item.id)
}

const average = computed(() => {
  if (students.value.length === 0) return 0
  const total = students.value.reduce((sum, item) => {
    return sum + Number(item.score)
  }, 0)
  return total / students.value.length
})
</script>

<template>
  <div class="container">
    <div class="card">
      <h2>学生成绩管理</h2>

      <!-- 添加表单 -->
      <form class="add-form" @submit.prevent="add">
        <input v-model="newName" placeholder="请输入姓名" />
        <input v-model="newScore" type="number" placeholder="请输入成绩" />
        <button class="btn-add">添加</button>
      </form>

      <!-- 成绩列表 -->
      <div class="student-list">
        <div v-for="item in students" :key="item.id" class="student-item">
          <span class="name">{{ item.name }}</span>
          <span class="score">{{ item.score }} 分</span>
          
          <span
            class="tag"
            :class="{
              'tag-excellent': item.score >= 90,
              'tag-pass': item.score >= 60 && item.score < 90,
              'tag-fail': item.score < 60
            }"
          >
            {{ item.score >= 90 ? '优秀' : item.score >= 60 ? '及格' : '不及格' }}
          </span>

          <button class="btn-del" @click="remove(item)">删除</button>
        </div>

        <div v-if="students.length === 0" class="empty-tip">
          暂无学生成绩记录
        </div>
      </div>

      <!-- 底部统计 -->
      <div class="summary">
        平均分：<span class="avg-num">{{ average.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 居中 & 洁白背景 */
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  font-family: system-ui, -apple-system, sans-serif;
  color: #333;
}

.card {
  width: 100%;
  max-width: 420px;
  padding: 2rem;
  box-sizing: border-box;
}

h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.3rem;
}

/* 输入表单 */
.add-form {
  display: flex;
  gap: 8px;
  margin-bottom: 1.2rem;
}

.add-form input {
  flex: 1;
  padding: 6px 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
  font-size: 0.9rem;
}

.add-form input:focus {
  border-color: #409eff;
}

.btn-add {
  padding: 6px 14px;
  background-color: #f4f4f5;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

.btn-add:hover {
  background-color: #e9e9eb;
}

/* 列表展示 */
.student-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.student-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 0.95rem;
}

.name {
  width: 80px;
  font-weight: 500;
}

.score {
  width: 70px;
  color: #666;
}

/* 状态标签 */
.tag {
  font-size: 0.8rem;
  padding: 2px 6px;
  border-radius: 3px;
}

.tag-excellent {
  background-color: #f0f9eb;
  color: #67c23a;
}

.tag-pass {
  background-color: #e6f7ff;
  color: #1890ff;
}

.tag-fail {
  background-color: #fff0f0;
  color: #f56c6c;
}

/* 删除按钮 */
.btn-del {
  padding: 2px 8px;
  font-size: 0.8rem;
  border: 1px solid #fde2e2;
  background-color: #fef0f0;
  color: #f56c6c;
  border-radius: 4px;
  cursor: pointer;
}

.btn-del:hover {
  background-color: #f56c6c;
  color: #fff;
}

.empty-tip {
  text-align: center;
  color: #909399;
  padding: 15px 0;
}

/* 底部统计 */
.summary {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px dashed #e0e0e0;
  text-align: right;
  font-size: 1rem;
}

.avg-num {
  font-weight: bold;
  color: #409eff;
}
</style>