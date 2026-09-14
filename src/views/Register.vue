<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')
const message = ref('')

async function register() {
    if (!username.value || !password.value) {
        message.value = '用户名和密码不能为空'
        return
    }

    const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    })

    const data = await res.json()

    if (data.code === 201) {
        message.value = '注册成功！即将前往登录页面'

        setTimeout(() => {
            router.push('/login')
        }, 1000)
    } else {
        message.value = data.message
    }
}
</script>

<template>
    <div class="register">
        <h2>注册账号</h2>

        <input
            v-model="username"
            placeholder="请输入用户名"
        >

        <input
            v-model="password"
            type="password"
            placeholder="请输入密码"
        >

        <button @click="register">
            注册
        </button>

        <p>{{ message }}</p>

        <span @click="router.push('/login')">
            已有账号？去登录
        </span>
    </div>
</template>