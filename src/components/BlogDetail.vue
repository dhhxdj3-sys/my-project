<script setup>
import { marked } from 'marked'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Marked } from 'marked'

const route = useRoute()

const article = ref(null)

onMounted(async () => {
  try {
    // 从地址栏拿文章 id
    const id = route.params.id

    // 请求后端
    const res = await fetch(`http://localhost:3000/api/articles/${id}`)

    const data = await res.json()

    if (data.code === 200) {
      article.value = data.data
    }
  } catch (error) {
    console.error('获取文章失败', error)
  }
})
</script>

<template>
  <div class="detail-page" v-if="article">

    <!-- 文章标题 -->
    <h1>{{ article.title }}</h1>

    <!-- 文章日期 -->
    <p class="date">
      {{ article.created_at }}
    </p>

    <!-- 文章正文 -->
  <div
  class="content"
  v-html="marked(article.content)"
  >
  </div>

  </div>

  <div v-else>
    正在加载文章...
  </div>
</template>

<style scoped>
.detail-page {
  max-width: 780px;
  width: 90%;
  margin: 0 auto;
  padding: 3rem 0 5rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #0f172a;
}

.date {
  color: #94a3b8;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.content {
  color: #334155;
  line-height: 1.8;
  white-space: pre-wrap;
}
</style>