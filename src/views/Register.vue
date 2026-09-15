<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const message = ref('')

async function register() {
    if (!username.value || !password.value) {
        message.value = '用户名和密码不能为空'
        return
    }

    if (password.value !== confirmPassword.value) {
        message.value = '两次输入的密码不一致'
        return
    }

    try {
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

        if (!res.ok) {
            message.value = '服务器响应异常，请稍后重试'
            return
        }

        const data = await res.json()

        if (data.code === 201) {
            message.value = '注册成功！即将前往登录页面'

            setTimeout(() => {
                router.push('/login')
            }, 1000)
        } else {
            message.value = data.message || '注册失败'
        }
    } catch (error) {
        message.value = '网络请求失败，请检查网络连接'
    }
}
</script>

<template>
    <div class="register-page">

        <!-- 背景中的极简装饰 -->
        <div class="decor decor-one">✦</div>
        <div class="decor decor-two">✧</div>
        <div class="decor decor-three">♡</div>
        <div class="decor decor-four"></div>

        <main class="register-card">

            <!-- 很小的博客标识 -->
            <div class="brand">
                <span class="brand-line"></span>
                <span>OUR LITTLE PLANET</span>
                <span class="brand-line"></span>
            </div>

            <div class="heading">
                <h2>创建账号</h2>
                <p>加入我们的小小空间</p>
            </div>

            <form
                class="register-form"
                @submit.prevent="register"
            >

                <div class="field">
                    <label>用户名</label>
                    <input
                        v-model="username"
                        type="text"
                        placeholder="设置你的专属昵称"
                    >
                </div>

                <div class="field">
                    <label>密码</label>
                    <input
                        v-model="password"
                        type="password"
                        placeholder="设置你的甜蜜暗号"
                    >
                </div>

                <div class="field">
                    <label>确认密码</label>
                    <input
                        v-model="confirmPassword"
                        type="password"
                        placeholder="再次输入暗号以确认"
                    >
                </div>

                <button type="submit">
                    立即注册
                    <span class="button-arrow">→</span>
                </button>

            </form>

            <p
                class="message"
                :class="{ success: message.includes('成功') }"
            >
                {{ message }}
            </p>

            <div class="login-link-container">
                <span>已有账号？</span>
                <span
                    class="login-link"
                    @click="router.push('/login')"
                >
                    立即登录
                </span>
            </div>

            <div class="footer-mark">
                <span>made with</span>
                <span class="heart">♡</span>
                <span>for us</span>
            </div>

        </main>
    </div>
</template>

<style scoped>
/* =========================
   页面整体
========================= */

.register-page {
    min-height: 100vh;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
    overflow: hidden;

    background:
        radial-gradient(
            circle at 20% 15%,
            rgba(246, 210, 218, 0.32),
            transparent 30%
        ),
        radial-gradient(
            circle at 80% 85%,
            rgba(244, 220, 225, 0.28),
            transparent 32%
        ),
        #fcfaf8;

    color: #463b3d;

    font-family:
        "Noto Sans SC",
        "Microsoft YaHei",
        Arial,
        sans-serif;
}


/* =========================
   注册主体卡片
========================= */

.register-card {
    width: 360px;

    padding: 38px 44px 30px;

    position: relative;
    z-index: 2;

    background: rgba(255, 253, 252, 0.88);

    border: 1px solid rgba(211, 167, 177, 0.22);

    box-shadow:
        0 18px 50px rgba(173, 120, 132, 0.08),
        0 3px 12px rgba(173, 120, 132, 0.04);

    border-radius: 14px;
}


/* =========================
   博客标识
========================= */

.brand {
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 10px;
    margin-bottom: 24px;

    color: #b8959d;

    font-size: 9px;
    letter-spacing: 2.8px;
    font-weight: 500;
}

.brand-line {
    width: 22px;
    height: 1px;

    background: #dfc4c9;
}


/* =========================
   标题
========================= */

.heading {
    text-align: center;
    margin-bottom: 26px;
}

.heading h2 {
    margin: 0 0 8px;

    color: #403538;

    font-size: 26px;
    font-weight: 500;

    letter-spacing: 1px;
}

.heading p {
    margin: 0;

    color: #a99a9d;

    font-size: 13px;
    letter-spacing: 0.5px;
}


/* =========================
   表单
========================= */

.register-form {
    display: flex;
    flex-direction: column;

    gap: 18px;
}

.field {
    display: flex;
    flex-direction: column;

    gap: 7px;
}

.field label {
    color: #78686c;

    font-size: 12px;
    font-weight: 500;

    letter-spacing: 0.5px;
}


/* =========================
   输入框
========================= */

.field input {
    width: 100%;
    height: 44px;

    box-sizing: border-box;

    padding: 0 14px;

    border: 1px solid #eadde0;
    border-radius: 8px;

    outline: none;

    background: #fffdfc;

    color: #4c4043;

    font-size: 13px;

    transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease,
        background 0.2s ease;
}

.field input::placeholder {
    color: #c2b5b8;
}

.field input:hover {
    border-color: #dec7cc;
}

.field input:focus {
    border-color: #d69aa8;

    background: #fff;

    box-shadow:
        0 0 0 3px rgba(214, 154, 168, 0.10);
}


/* =========================
   按钮
========================= */

button {
    width: 100%;
    height: 45px;

    margin-top: 6px;

    border: none;
    border-radius: 8px;

    background: #d99eab;

    color: #fff;

    font-size: 13px;
    font-weight: 500;

    letter-spacing: 1px;

    cursor: pointer;

    box-shadow:
        0 6px 16px rgba(191, 126, 140, 0.16);

    transition:
        background 0.2s ease,
        transform 0.2s ease,
        box-shadow 0.2s ease;
}

button:hover {
    background: #d493a1;

    transform: translateY(-1px);

    box-shadow:
        0 8px 20px rgba(191, 126, 140, 0.20);
}

button:active {
    transform: translateY(0);
}

.button-arrow {
    display: inline-block;

    margin-left: 7px;

    font-size: 14px;

    transition: transform 0.2s ease;
}

button:hover .button-arrow {
    transform: translateX(3px);
}


/* =========================
   提示信息
========================= */

.message {
    min-height: 18px;

    margin: 14px 0 4px;

    text-align: center;

    color: #bd7f8c;

    font-size: 12px;
}

.message.success {
    color: #8e9f91;
}


/* =========================
   跳转登录链接
========================= */

.login-link-container {
    text-align: center;

    color: #aa9da0;

    font-size: 12px;
}

.login-link {
    margin-left: 5px;

    color: #bd7f8c;

    cursor: pointer;

    transition: color 0.2s ease;
}

.login-link:hover {
    color: #9f6573;
}


/* =========================
   底部标记
========================= */

.footer-mark {
    display: flex;

    justify-content: center;
    align-items: center;

    gap: 5px;

    margin-top: 26px;

    color: #c4b8ba;

    font-size: 9px;

    letter-spacing: 0.8px;
}

.heart {
    color: #d99eab;

    font-size: 12px;
}


/* =========================
   背景装饰
========================= */

.decor {
    position: absolute;

    pointer-events: none;
    user-select: none;
}

.decor-one {
    top: 15%;
    left: 18%;

    color: #dcb4bc;

    font-size: 14px;

    opacity: 0.65;
}

.decor-two {
    top: 28%;
    right: 18%;

    color: #e5c3ca;

    font-size: 11px;

    opacity: 0.55;
}

.decor-three {
    right: 21%;
    bottom: 16%;

    color: #dfbec5;

    font-size: 15px;

    opacity: 0.5;
}

.decor-four {
    width: 140px;
    height: 140px;

    left: -60px;
    bottom: 12%;

    border: 1px solid rgba(214, 168, 178, 0.16);

    border-radius: 50%;
}


/* =========================
   响应式
========================= */

@media (max-width: 600px) {

    .register-card {
        width: calc(100% - 40px);

        padding: 32px 26px 26px;

        box-sizing: border-box;
    }

    .decor-one {
        left: 6%;
    }

    .decor-two {
        right: 7%;
    }

    .decor-three {
        right: 8%;
    }
}
</style>