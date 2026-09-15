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
    try {
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

        if (!res.ok) {
            message.value = '服务器响应异常，请稍后重试'
            return
        }

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
            message.value = data.message || '登录失败'
        }
    } catch (error) {
        message.value = '网络请求失败，请检查网络连接'
    }
}
</script>

<template>
    <div class="login-page">

        <!-- 背景中的极简装饰 -->
        <div class="decor decor-one">✦</div>
        <div class="decor decor-two">♡</div>
        <div class="decor decor-three"></div>

        <main class="login">

            <!-- 很小的博客标识 -->
            <div class="brand">
                <span class="brand-line"></span>
                <span>OUR LITTLE PLANET</span>
                <span class="brand-line"></span>
            </div>

            <div class="heading">
                <h2>解锁专属小窝</h2>
                <p>开启属于我们的二人世界</p>
            </div>

            <form
                class="login-form"
                @submit.prevent="login"
            >

                <div class="field">
                    <label>用户名</label>

                    <input
                        v-model="username"
                        type="text"
                        placeholder="输入你的专属昵称"
                    >
                </div>

                <div class="field">
                    <label>密码</label>

                    <input
                        v-model="password"
                        type="password"
                        placeholder="输入我们的甜蜜暗号"
                    >
                </div>

                <button type="submit">
                    通往专属空间
                    <span class="button-arrow">→</span>
                </button>

            </form>

            <p
                class="message"
                :class="{ success: message === '登录成功！' }"
            >
                {{ message }}
            </p>

            <div class="register">
                <span>还没有暗号账号？</span>

                <span
                    class="register-link"
                    @click="router.push('/register')"
                >
                    去绑定注册
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

.login-page {
    min-height: 100vh;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
    overflow: hidden;

    background:
        radial-gradient(
            circle at 15% 20%,
            rgba(246, 210, 218, 0.28),
            transparent 28%
        ),
        radial-gradient(
            circle at 85% 80%,
            rgba(244, 220, 225, 0.24),
            transparent 30%
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
   登录主体
========================= */

.login {
    width: 360px;

    padding: 42px 44px 34px;

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
    margin-bottom: 30px;

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
    margin-bottom: 32px;
}

.heading h2 {
    margin: 0 0 9px;

    color: #403538;

    font-size: 27px;
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

.login-form {
    display: flex;
    flex-direction: column;

    gap: 21px;
}

.field {
    display: flex;
    flex-direction: column;

    gap: 8px;
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
    height: 45px;

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
   登录按钮
========================= */

button {
    width: 100%;
    height: 46px;

    margin-top: 4px;

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

    margin: 15px 0 4px;

    text-align: center;

    color: #bd7f8c;

    font-size: 12px;
}

.message.success {
    color: #8e9f91;
}


/* =========================
   注册
========================= */

.register {
    text-align: center;

    color: #aa9da0;

    font-size: 12px;
}

.register-link {
    margin-left: 5px;

    color: #bd7f8c;

    cursor: pointer;

    transition: color 0.2s ease;
}

.register-link:hover {
    color: #9f6573;
}


/* =========================
   底部小字
========================= */

.footer-mark {
    display: flex;

    justify-content: center;
    align-items: center;

    gap: 5px;

    margin-top: 31px;

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
    top: 18%;
    left: 20%;

    color: #dcb4bc;

    font-size: 12px;

    opacity: 0.6;
}

.decor-two {
    right: 22%;
    bottom: 19%;

    color: #dfbec5;

    font-size: 17px;

    opacity: 0.55;
}

.decor-three {
    width: 120px;
    height: 120px;

    right: -55px;
    top: 18%;

    border: 1px solid rgba(214, 168, 178, 0.18);

    border-radius: 50%;
}


/* =========================
   手机适配
========================= */

@media (max-width: 600px) {

    .login {
        width: calc(100% - 40px);

        padding: 36px 28px 30px;

        box-sizing: border-box;
    }

    .decor-one {
        left: 8%;
    }

    .decor-two {
        right: 9%;
    }
}
</style>