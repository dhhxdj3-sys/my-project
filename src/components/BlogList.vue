<script setup>
import { ref, onMounted } from 'vue'
import BlogCard from './BlogCard.vue' // 1. 修改为大驼峰 BlogCard
import { useRouter } from 'vue-router' // 2. 引入 useRouter

const blogs = ref([])
const router = useRouter() // 3. 使用 useRouter()

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/articles')
    const data = await res.json()
    if (data.code === 200) {
      blogs.value = data.data
    }
  } catch (error) {
    console.error('获取文章列表失败', error)
  }
})

function readArticle(id) {
  // 确认路由路径是 /articles/${id} 还是 /blog/${id}
  router.push(`/articles/${id}`) 
}
</script>

<template>
  <div class="blog-list">
    <h2>文章列表</h2>
    <BlogCard
      v-for="item in blogs"
      :key="item.id"
      :title="item.title"
      :date="item.created_at"
      :desc="item.summary"
      :like="0"
      :collect="false"
      :comments="[]"
      :content="item.content"
      :id="item.id"
      @read="readArticle"
    />
  </div>
</template>