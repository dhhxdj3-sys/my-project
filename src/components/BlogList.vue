<script setup>
import BlogCard from '../components/BlogCard.vue'
import { ref } from 'vue'

const blogs = ref([
  // --- 2025年：HTML & JavaScript 基础阶段 ---
  {
    title: 'HTML5 语义化标签与网页结构搭建初探',
    date: '2025-09-12',
    desc: "开启前端学习的第一步！系统学习 HTML5 的语义化标签（header, nav, article, footer 等），理解 DOM 树的形成过程，掌握标准网页结构的编写规范。",
    like: 0,
    collect: false,
    comments: []
  },
  {
    title: 'JavaScript 基础语法与流程控制学习心得',
    date: '2025-10-15',
    desc: "记录 JavaScript 基础语法，包括变量定义（var、let、const 的区别）、数据类型转换、条件判断以及循环语句的使用，打牢 JS 编程基础。",
    like: 0,
    collect: false,
    comments: []
  },
  {
    title: 'JavaScript 函数与作用域深度解析',
    date: '2025-11-08',
    desc: "深入理解 JS 函数的概念，对比普通函数与 ES6 箭头函数的异同，学习局部/全局作用域以及作用域链对变量查找的影响。",
    like: 0,
    collect: false,
    comments: []
  },
  {
    title: '原生 JavaScript DOM 操作与事件监听实践',
    date: '2025-12-20',
    desc: "学习如何通过 JS 获取与操作 DOM 节点，掌握 click、keyup 等常见事件监听机制，动手编写第一个简单的原生 JS 网页交互小工具。",
    like: 0,
    collect: false,
    comments: []
  },
  {
    title: 'JavaScript 数组常用方法与对象操作总结',
    date: '2026-03-10',
    desc: "总结 JS 中常用的数组遍历与处理方法（forEach、map、filter、reduce），以及对象的属性读取与遍历，理解复杂数据结构的处理思路。",
    like: 0,
    collect: false,
    comments: []
  },
  {
    title: 'ES6+ 新特性学习：解构赋值、模板字符串与 Promise',
    date: '2026-04-18',
    desc: "梳理 ES6 核心新特性，重点掌握对象与数组的解构赋值、模板字符串语法，以及通过 Promise 和 async/await 处理异步代码的基本逻辑。",
    like: 0,
    collect: false,
    comments: []
  },

  // --- 2026年：Vue 3 与工程化实战阶段 ---
  {
    title: 'Vue3组件通信详解：props 与 emit 的实践记录',
    date: '2026-06-18',
    desc: "深入理解 Vue3 组件通信机制。本文记录父子组件之间的数据传递方式，通过 props 实现父组件向子组件传递数据，通过 emit 完成子组件向父组件发送事件，并结合实际项目总结组件拆分思路。",
    like: 0,
    collect: false,
    comments: []
  },
  {
    title: 'Vue3计算属性 computed：从数据变化理解响应式',
    date: '2026-06-21',
    desc: "学习 Vue3 中 computed 计算属性的使用方式，通过购物车案例理解计算属性缓存机制，以及 computed 与普通函数之间的区别，进一步理解 Vue 响应式系统。",
    like: 0,
    collect: false,
    comments: []
  },
  {
    title: 'Vue3响应式原理浅析：从 ref 到 reactive',
    date: '2026-06-25',
    desc: "记录 Vue3 响应式数据学习过程，分析 ref 和 reactive 的使用场景，理解 Vue 如何监听数据变化并自动更新页面内容。",
    like: 0,
    collect: false,
    comments: []
  },
  {
    title: 'Vue3 Watch监听器学习笔记',
    date: '2026-06-28',
    desc: "学习 Vue3 watch 的使用方法，通过监听数据变化实现搜索、表单验证等功能，并总结 watch 与 computed 的区别以及实际应用场景。",
    like: 0,
    collect: false,
    comments: []
  },
  {
    title: 'Vue Router 4 路由系统学习记录',
    date: '2026-07-02',
    desc: "学习 Vue Router 4 的基本使用，包括路由配置、页面跳转、router-link 使用方式，并将路由功能应用到个人博客项目中。",
    like: 0,
    collect: false,
    comments: []
  },
  {
    title: '从零搭建 Vue3 + Vite 个人博客项目',
    date: '2026-07-15',
    desc: "记录第一次独立完成前端项目的全过程，包括项目初始化、组件设计、Vue Router 配置、Git版本管理以及最终部署上线。",
    like: 0,
    collect: false,
    comments: []
  },
  {
    title: 'Git 与 GitHub 版本管理入门记录',
    date: '2026-07-18',
    desc: "学习 Git 基础操作，包括 git init、提交代码、连接 GitHub 仓库，并记录第一次将 Vue 项目上传到远程仓库的过程。",
    like: 0,
    collect: false,
    comments: []
  },
  {
    title: 'CSS布局学习总结：Flex打造现代网页',
    date: '2026-07-22',
    desc: "总结 CSS Flex 布局在实际项目中的应用，包括导航栏、卡片布局、居中布局以及响应式页面设计，让网页拥有更好的视觉效果。",
    like: 0,
    collect: false,
    comments: []
  }
])
</script>

<template>
  <div class="articles-wrapper">
    <!-- 页头大标题包装 -->
    

    <!-- 列表容器 -->
    <main class="card-list">
      <BlogCard
        v-for="(blog, index) in blogs"
        :key="index"
        :title="blog.title"
        :date="blog.date"
        :desc="blog.desc"
        :like="blog.like"
        :collect="blog.collect"
        :comments="blog.comments"
        @like="blog.like++"
        @collect="blog.collect = !blog.collect"
        @comment="blog.comments.push($event)"
      />
    </main>
  </div>
</template>

<style scoped>
/* 最外层居中容器 */
.articles-wrapper {
  max-width: 760px;
  width: 90%;
  margin: 0 auto;
  padding: 2rem 0 5rem;
}

/* 页头文字规范 */
.page-header {
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f1f5f9;
}

.page-title {
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a; /* 深色 */
  margin-bottom: 0.4rem;
  letter-spacing: -0.5px;
}

.page-title .highlight {
  color: #2563eb; /* 主色蓝 */
}

.page-subtitle {
  font-size: 0.95rem;
  color: #64748b; /* 中灰 */
}

/* 列表间距控制 */
.card-list {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
</style>