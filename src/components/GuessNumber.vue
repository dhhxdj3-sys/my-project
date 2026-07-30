<script setup>
import { ref } from 'vue'

const answer = ref(Math.floor(Math.random() * 100) + 1)
const userNum = ref('')
const message = ref('')
const count = ref(0)

function guess() {
  if (userNum.value < 1 || userNum.value > 100) {
    message.value = "请输入 1~100 之间的数字 !"
    return
  }
  count.value++
  if (userNum.value > answer.value) {
    message.value = "太大了"
  } else if (userNum.value < answer.value) {
    message.value = "太小了"
  } else {
    message.value = `答对了！共猜了 ${count.value} 次`
    userNum.value = ''
  }
}

function restart() {
  answer.value = Math.floor(Math.random() * 100) + 1
  message.value = ''
  userNum.value = ''
  count.value = 0
}
</script>

<template>
  <div class="container">
    <div class="card">
      <h2>猜数字 Game</h2>

      <div class="input-group">
        <input
          v-model.number="userNum"
          type="number"
          placeholder="请输入 1~100"
          @keyup.enter="guess"
        >
        <button @click="guess">猜一猜</button>
      </div>

      <div class="info">
        <p>提示：<span>{{ message || '暂无' }}</span></p>
        <p>次数：<span>{{ count }}</span></p>
      </div>

      <button class="reset-btn" @click="restart">重新开始</button>
    </div>
  </div>
</template>

<style scoped>
/* 全局居中与纯白背景 */
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  font-family: system-ui, -apple-system, sans-serif;
}

/* 卡片容器与间距控制 */
.card {
  text-align: center;
  padding: 2rem;
  width: 100%;
  max-width: 320px;
}

h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.input-group {
  display: flex;
  gap: 8px;
  justify-content: center;
  margin-bottom: 1rem;
}

input {
  width: 130px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  text-align: center;
}

input:focus {
  border-color: #409eff;
}

button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.2s;
}

button:hover {
  background-color: #eee;
}

.info {
  margin: 1.2rem 0;
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
}

.info span {
  font-weight: bold;
  color: #333;
}

.reset-btn {
  width: 100%;
  margin-top: 0.5rem;
}
</style>