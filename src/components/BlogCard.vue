<script setup>
import { ref } from 'vue'

const commentText = ref('')

// 控制评论输入框与评论列表的折叠状态
const showComment = ref(false)

const emit = defineEmits([
  "like",
  "collect",
  "comment"
])

const props = defineProps({
  title: String,
  date: String,
  desc: String,
  like: Number,
  collect: Boolean,
  comments: Array
})

function addLike() {
  emit("like")
}

function addCollect() {
  emit("collect")
}

function addComment() {
  if (!commentText.value.trim()) {
    return
  }
  emit("comment", commentText.value)
  commentText.value = ""
}

function toggleComment() {
  showComment.value = !showComment.value
}
</script>

<template>
  <div class="card">
    <!-- 日期：浅灰 -->
    <div class="card-meta">
      <span class="card-date">{{ date }}</span>
    </div>

    <!-- 标题：深色，悬停蓝 -->
    <h2 class="card-title">
      <a href="#" @click.prevent>{{ title }}</a>
    </h2>

    <!-- 简介：中灰 -->
    <p class="card-desc">
      {{ desc }}
    </p>

    <!-- 底部扁平化操作栏 -->
    <div class="card-actions">
      <div class="left-actions">
        <!-- 点赞图标按钮 -->
        <button 
          class="icon-btn" 
          :class="{ 'is-active': like > 0 }" 
          title="点赞" 
          @click="addLike"
        >
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
          </svg>
          <span class="count">{{ like }}</span>
        </button>

        <!-- 收藏图标按钮 -->
        <button 
          class="icon-btn" 
          :class="{ 'is-active': collect }" 
          title="收藏" 
          @click="addCollect"
        >
          <svg class="icon" viewBox="0 0 24 24" :fill="collect ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
          </svg>
          <span class="text">{{ collect ? '已收藏' : '收藏' }}</span>
        </button>

        <!-- 评论折叠开关图标按钮 -->
        <button 
          class="icon-btn" 
          :class="{ 'is-active': showComment }" 
          title="评论" 
          @click="toggleComment"
        >
          <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          <span class="count">{{ comments ? comments.length : 0 }}</span>
        </button>
      </div>

      <span class="read-more">阅读全文</span>
    </div>

    <!-- 收起的评论互动区 -->
    <transition name="fade">
      <div v-if="showComment" class="comment-drawer">
        <!-- 评论输入框容器 -->
        <div class="comment-input-box">
          <input 
            v-model="commentText" 
            type="text" 
            placeholder="请输入你的评论..." 
            @keyup.enter="addComment"
          />
          <button class="send-btn" :disabled="!commentText.trim()" @click="addComment">
            发送
          </button>
        </div>

        <!-- 评论列表 -->
        <div v-if="comments && comments.length > 0" class="comment-list">
          <div v-for="(item, index) in comments" :key="index" class="comment-item">
            {{ item }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* 1. 圆角卡片、微弱边框、平滑过渡 */
.card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.2rem;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

/* 悬停视觉反馈 */
.card:hover {
  transform: translateY(-2px);
  border-color: #cbd5e1;
  box-shadow: 0 10px 24px -4px rgba(0, 0, 0, 0.05);
}

/* 2. 主次分明：日期用浅灰 */
.card-meta {
  margin-bottom: 0.5rem;
}

.card-date {
  font-size: 0.85rem;
  color: #94a3b8;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

/* 2. 主次分明：标题用深色，悬停变蓝 */
.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
  margin-bottom: 0.6rem;
}

.card-title a {
  color: #0f172a;
  text-decoration: none;
  transition: color 0.2s ease;
}

.card-title a:hover {
  color: #2563eb;
}

/* 2. 主次分明：简介用中灰 */
.card-desc {
  font-size: 0.925rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 1.2rem;
}

/* 3. 底部操作栏（去除原生控件，改为扁平化按钮） */
.card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.8rem;
  border-top: 1px solid #f1f5f9;
}

.left-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: transparent;
  border: none;
  padding: 5px 8px;
  border-radius: 8px;
  color: #64748b;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-btn:hover {
  background-color: #f1f5f9;
  color: #0f172a;
}

.icon-btn.is-active {
  color: #2563eb;
  background-color: #eff6ff;
}

.icon {
  width: 17px;
  height: 17px;
}

.read-more {
  font-size: 0.85rem;
  font-weight: 600;
  color: #2563eb;
  cursor: pointer;
}

/* 4. 评论收起/展开抽屉 */
.comment-drawer {
  margin-top: 1rem;
  padding-top: 0.8rem;
  border-top: 1px dashed #e2e8f0;
}

.comment-input-box {
  display: flex;
  gap: 8px;
  margin-bottom: 0.8rem;
}

.comment-input-box input {
  flex: 1;
  padding: 0.5rem 0.8rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  outline: none;
  font-size: 0.85rem;
  color: #0f172a;
  background-color: #f8fafc;
  transition: all 0.2s ease;
}

.comment-input-box input:focus {
  background-color: #ffffff;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.08);
}

.send-btn {
  padding: 0.5rem 0.9rem;
  border: none;
  background-color: #2563eb;
  color: #ffffff;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.send-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.comment-item {
  background-color: #f8fafc;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #334155;
}

/* 展开过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>