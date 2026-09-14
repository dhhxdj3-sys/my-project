<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')
const message = ref('')

async function login() {

    // 1. 检查输入
    if (!username.value || !password.value) {
        message.value = '用户名和密码不能为空'
        return
    }

    // 2. 向后端发送登录请求
    const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    })

    // 3. 获取后端返回的数据
    const data = await res.json()

    // 4. 登录成功
    if (data.code === 200) {

        // 保存 Token
        localStorage.setItem(
            'token',
            data.data.token
        )

        // 保存用户信息
        localStorage.setItem(
            'user',
            JSON.stringify(data.data.user)
        )

        message.value = '登录成功！'

        // 登录成功后回首页
        setTimeout(() => {
            router.push('/')
        }, 500)

    } else {

        // 登录失败
        message.value = data.message
    }
}
</script>

<template>
    <div class="login">

        <h2>登录账号</h2>

        <input
            v-model="username"
            placeholder="请输入用户名"
        >

        <input
            v-model="password"
            type="password"
            placeholder="请输入密码"
        >

        <button @click="login">
            登录
        </button>

        <p>{{ message }}</p>

        <span @click="router.push('/register')">
            还没有账号？去注册
        </span>

    </div>
</template>