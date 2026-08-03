<script setup>
import { ref } from 'vue'

const answer = ref(Math.floor(Math.random() * 100) + 1)
const userNum = ref('')
const message = ref('')
const count = ref(0)
const isGameOver = ref(false)
const history = ref([])

function guess() {
  if (isGameOver.value) return

  if (userNum.value < 1 || userNum.value > 100 || !userNum.value) {
    message.value = "请输入 1 到 100 之间的有效数字"
    return
  }

  count.value++
  const num = userNum.value
  let status = ''

  if (num > answer.value) {
    message.value = "太大了，往小了猜"
    status = 'high'
  } else if (num < answer.value) {
    message.value = "太小了，往大了猜"
    status = 'low'
  } else {
    message.value = `恭喜答对！目标数字就是 ${answer.value}`
    status = 'correct'
    isGameOver.value = true
  }

  // 记录历史
  history.value.unshift({
    num,
    status,
    step: count.value
  })

  // 猜对时清空输入，没猜对保留或选定
  if (!isGameOver.value) {
    userNum.value = ''
  }
}

function restart() {
  answer.value = Math.floor(Math.random() * 100) + 1
  message.value = ''
  userNum.value = ''
  count.value = 0
  isGameOver.value = false
  history.value = []
}
</script>

<template>
  <div class="game-container">
    <!-- 标语区 -->
    <div class="page-header">
      <div class="badge">Mini Game</div>
      <h1 class="page-title">猜数字 <span class="gradient-text">小游戏</span></h1>
      <p class="page-desc">系统已随机生成 1~100 之间的数字，试试看几次能猜中！</p>
    </div>

    <!-- 主卡片 -->
    <div class="card">
      <!-- 游戏核心交互 -->
      <div class="input-area">
        <div class="input-group">
          <input
            v-model.number="userNum"
            type="number"
            min="1"
            max="100"
            placeholder="输入 1 ~ 100"
            :disabled="isGameOver"
            @keyup.enter="guess"
          />
          <button class="btn-primary" :disabled="isGameOver" @click="guess">
            猜一猜
          </button>
        </div>

        <!-- 动态提示面板 -->
        <div 
          class="message-box"
          :class="{
            'msg-correct': isGameOver,
            'msg-active': message && !isGameOver
          }"
        >
          {{ message || '等待输入数字开始游戏...' }}
        </div>
      </div>

      <!-- 统计数据 -->
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-label">尝试次数</span>
          <span class="stat-value">{{ count }} 次</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">游戏状态</span>
          <span class="stat-value" :class="isGameOver ? 'text-green' : 'text-blue'">
            {{ isGameOver ? '已通关' : '进行中' }}
          </span>
        </div>
      </div>

      <!-- 猜测历史轨迹 -->
      <div v-if="history.length > 0" class="history-section">
        <div class="history-title">猜测记录</div>
        <div class="history-tags">
          <span 
            v-for="item in history" 
            :key="item.step" 
            class="history-tag"
            :class="'tag-' + item.status"
          >
            第 {{ item.step }} 次: {{ item.num }} 
            ({{ item.status === 'high' ? '偏大' : item.status === 'low' ? '偏小' : '正确' }})
          </span>
        </div>
      </div>

      <!-- 重置按钮 -->
      <button class="btn-restart" @click="restart">
        {{ isGameOver ? '再玩一次' : '重新开始' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.game-container {
  max-width: 520px;
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

/* 核心卡片 */
.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  padding: 1.8rem;
  box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.04);
}

.input-area {
  margin-bottom: 1.5rem;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
}

.input-group input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  outline: none;
  font-size: 1rem;
  text-align: center;
  font-weight: 600;
  color: #0f172a;
  transition: all 0.2s ease;
}

.input-group input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.input-group input:disabled {
  background-color: #f8fafc;
  cursor: not-allowed;
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.btn-primary:hover:not(:disabled) {
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  transform: translateY(-1px);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 提示文本框 */
.message-box {
  padding: 0.8rem;
  border-radius: 10px;
  background-color: #f8fafc;
  color: #64748b;
  font-size: 0.9rem;
  text-align: center;
  border: 1px solid #f1f5f9;
  font-weight: 500;
  transition: all 0.3s ease;
}

.msg-active {
  background-color: #eff6ff;
  color: #1d4ed8;
  border-color: #bfdbfe;
}

.msg-correct {
  background-color: #f0fdf4;
  color: #15803d;
  border-color: #bbf7d0;
  font-weight: 700;
}

/* 统计区域 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
  font-size: 1.1rem;
  font-weight: 800;
  color: #0f172a;
}

.text-blue {
  color: #2563eb;
}

.text-green {
  color: #16a34a;
}

/* 猜测历史记录 */
.history-section {
  margin-bottom: 1.5rem;
  border-top: 1px dashed #e2e8f0;
  padding-top: 1rem;
}

.history-title {
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 0.6rem;
}

.history-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  max-height: 120px;
  overflow-y: auto;
}

.history-tag {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 6px;
  font-weight: 500;
}

.tag-high {
  background-color: #f1f5f9;
  color: #475569;
}

.tag-low {
  background-color: #eff6ff;
  color: #2563eb;
}

.tag-correct {
  background-color: #f0fdf4;
  color: #16a34a;
  font-weight: 700;
}

/* 重置按钮 */
.btn-restart {
  width: 100%;
  padding: 0.7rem;
  background-color: #ffffff;
  color: #475569;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-restart:hover {
  background-color: #f8fafc;
  color: #0f172a;
  border-color: #94a3b8;
}
</style>