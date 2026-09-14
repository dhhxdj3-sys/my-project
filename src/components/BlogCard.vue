<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  id: Number,
  title: String,
  date: String,
  desc: String,
  like: Number,
  collect: Boolean,
  comments: Array,
  content: String
})

const emit = defineEmits([
  'read'
])

// ====================
// 点赞
// ====================

// 点赞总数
const likeCount = ref(props.like || 0)

// 当前用户有没有点赞
const isLiked = ref(false)


// ====================
// 收藏
// ====================

// 当前用户有没有收藏
const isCollected = ref(props.collect || false)


// ====================
// 评论
// ====================

// 控制评论区域显示/隐藏
const showComment = ref(false)

// 评论输入框
const commentText = ref('')

// 从数据库获取的评论
const commentList = ref([])


// 获取 Token
function getToken() {
  return localStorage.getItem('token')
}


// ====================
// 点赞 / 取消点赞
// ====================

async function addLike() {

  const token = getToken()

  // 没登录不能点赞
  if (!token) {
    alert('请先登录')
    return
  }

  try {

    const res = await fetch(
      `http://localhost:3000/api/articles/${props.id}/like`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await res.json()

    if (data.code === 200) {

      // 更新自己的点赞状态
      isLiked.value = data.data.liked

      // 更新点赞数量
      if (isLiked.value) {
        likeCount.value++
      } else {
        likeCount.value--
      }

    } else {

      alert(data.message)

    }

  } catch (error) {

    console.error(error)
    alert('点赞失败')

  }
}


// ====================
// 收藏 / 取消收藏
// ====================

async function addCollect() {

  const token = getToken()

  // 没登录不能收藏
  if (!token) {
    alert('请先登录')
    return
  }

  try {

    const res = await fetch(
      `http://localhost:3000/api/articles/${props.id}/favorite`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    const data = await res.json()

    if (data.code === 200) {

      // 更新收藏状态
      isCollected.value = data.data.favorited

    } else {

      alert(data.message)

    }

  } catch (error) {

    console.error(error)
    alert('收藏失败')

  }
}


// ====================
// 打开 / 关闭评论
// ====================

async function toggleComment() {

  showComment.value = !showComment.value

  // 打开评论区域时获取评论
  if (showComment.value) {
    await getComments()
  }
}


// ====================
// 获取评论
// ====================

async function getComments() {

  try {

    const res = await fetch(
      `http://localhost:3000/api/articles/${props.id}/comments`
    )

    const data = await res.json()

    if (data.code === 200) {

      commentList.value = data.data

    }

  } catch (error) {

    console.error(error)

  }
}


// ====================
// 发布评论
// ====================

async function addComment() {

  const token = getToken()

  // 没登录不能评论
  if (!token) {
    alert('请先登录')
    return
  }

  // 空评论直接结束
  if (!commentText.value.trim()) {
    return
  }

  try {

    const res = await fetch(
      `http://localhost:3000/api/articles/${props.id}/comments`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',

          // 把 JWT 发送给后端
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
          content: commentText.value
        })
      }
    )

    const data = await res.json()

    if (data.code === 201) {

      // 清空输入框
      commentText.value = ''

      // 重新获取评论
      await getComments()

    } else {

      alert(data.message)

    }

  } catch (error) {

    console.error(error)
    alert('评论失败')

  }
}


// ====================
// 阅读全文
// ====================

function readArticle() {
  emit('read', props.id)
}


// ====================
// 页面加载时获取点赞状态
// ====================

onMounted(async () => {

  const token = getToken()

  // ====================
  // 获取点赞状态
  // ====================

  try {

    const headers = {}

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const res = await fetch(
      `http://localhost:3000/api/articles/${props.id}/like`,
      {
        headers
      }
    )

    const data = await res.json()

    if (data.code === 200) {
      likeCount.value = data.data.count
      isLiked.value = data.data.liked
    }

  } catch (error) {

    console.error('获取点赞状态失败：', error)

  }


  // ====================
  // 获取收藏状态
  // ====================

  if (token) {

    try {

      const res = await fetch(
        `http://localhost:3000/api/articles/${props.id}/favorite`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await res.json()

      if (data.code === 200) {
        isCollected.value = data.data.favorited
      }

    } catch (error) {

      console.error('获取收藏状态失败：', error)

    }

  }


  // ====================
  // 获取评论
  // ====================

  try {

    await getComments()

  } catch (error) {

    console.error('获取评论失败：', error)

  }

})
</script>


<template>
  <div class="card">

    <!-- 日期 -->
    <div class="card-meta">
      <span class="card-date">{{ date }}</span>
    </div>


    <!-- 标题 -->
    <h2 class="card-title">
      <a href="#" @click.prevent>{{ title }}</a>
    </h2>


    <!-- 简介 -->
    <p class="card-desc">
      {{ desc }}
    </p>


    <!-- 正文 -->
    <p class="card-content">
      {{ content }}
    </p>


    <!-- 底部操作栏 -->
    <div class="card-actions">

      <div class="left-actions">

        <!-- ==================== -->
        <!-- 点赞 -->
        <!-- ==================== -->

        <button
          class="icon-btn"
          :class="{ 'is-active': isLiked }"
          title="点赞"
          @click="addLike"
        >

          <svg
            class="icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >

            <path
              d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
            ></path>

          </svg>

          <span class="count">
            {{ likeCount }}
          </span>

        </button>


        <!-- ==================== -->
        <!-- 收藏 -->
        <!-- ==================== -->

        <button
          class="icon-btn"
          :class="{ 'is-active': isCollected }"
          title="收藏"
          @click="addCollect"
        >

          <svg
            class="icon"
            viewBox="0 0 24 24"
            :fill="isCollected ? 'currentColor' : 'none'"
            stroke="currentColor"
            stroke-width="2"
          >

            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            ></polygon>

          </svg>

          <span class="text">
            {{ isCollected ? '已收藏' : '收藏' }}
          </span>

        </button>


        <!-- ==================== -->
        <!-- 评论 -->
        <!-- ==================== -->

        <button
          class="icon-btn"
          :class="{ 'is-active': showComment }"
          title="评论"
          @click="toggleComment"
        >

          <svg
            class="icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >

            <path
              d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            ></path>

          </svg>

          <span class="count">
            {{ commentList.length }}
          </span>

        </button>

      </div>


      <!-- 阅读全文 -->
      <span
        class="read-more"
        @click="readArticle"
      >
        阅读全文
      </span>

    </div>


    <!-- ==================== -->
    <!-- 评论区域 -->
    <!-- ==================== -->

    <transition name="fade">

      <div
        v-if="showComment"
        class="comment-drawer"
      >

        <!-- 评论输入框 -->
        <div class="comment-input-box">

          <input
            v-model="commentText"
            type="text"
            placeholder="请输入你的评论..."
            @keyup.enter="addComment"
          />

          <button
            class="send-btn"
            :disabled="!commentText.trim()"
            @click="addComment"
          >
            发送
          </button>

        </div>


        <!-- 评论列表 -->
        <div
          v-if="commentList.length > 0"
          class="comment-list"
        >

          <div
            v-for="item in commentList"
            :key="item.id"
            class="comment-item"
          >

            <strong>
              {{ item.username }}
            </strong>

            <span>
              {{ item.content }}
            </span>

            <small>
              {{ item.created_at }}
            </small>

          </div>

        </div>


        <!-- 没有评论 -->
        <div
          v-else
          class="comment-item"
        >
          暂时还没有评论
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
.card-content {
  font-size: 0.9rem;
  color: #475569;
  line-height: 1.7;
  margin-bottom: 1.2rem;
  white-space: pre-wrap;
}
</style>