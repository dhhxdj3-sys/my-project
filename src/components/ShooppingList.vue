<script setup>
import { ref, computed } from 'vue'

// 扩充后的商品列表
const goods = ref([
  { id: 1, name: '红富士苹果', price: 6, icon: '🍎', category: '水果' },
  { id: 2, name: '进口香蕉', price: 3.8, icon: '🍌', category: '水果' },
  { id: 3, name: '无籽西瓜', price: 15, icon: '🍉', category: '水果' },
  { id: 4, name: '新鲜草莓', price: 18.5, icon: '🍓', category: '水果' },
  { id: 5, name: '纯牛奶 (盒)', price: 4.5, icon: '🥛', category: '饮品' },
  { id: 6, name: '全麦面包', price: 8.9, icon: '🍞', category: '烘焙' }
])

const cart = ref([])


function addCart(item) {
  let old = cart.value.find(t => t.id === item.id)
  if (old) {
    old.count++
  } else {
    cart.value.push({
      ...item,
      count: 1
    })
  }
}

function add(item) {
  item.count++
}
function al(item){
  alert('哈哈 暂时没学到这里')
}

function sub(item) {
  if (item.count > 1) {
    item.count--
  }
}

function remove(item) {
  cart.value = cart.value.filter(t => t.id !== item.id)
}

const todoPrice = computed(() => {
  return cart.value.reduce((sum, item) => {
    return sum + (item.price * item.count)
  }, 0)
})
</script>

<template>
  <div class="shop-container">
    <!-- 头部标语 -->
    <div class="page-header">
      <div class="badge"> Online Store</div>
      <h1 class="page-title">在线 <span class="gradient-text">购物系统</span></h1>
      <p class="page-desc">基于 Vue 3 响应式计算属性打造的实战组件演示。</p>
    </div>

    <div class="shop-layout">
      <!-- 左侧：商品展示区 -->
      <div class="goods-section">
        <h2 class="section-title"> 选购商品</h2>
        <div class="goods-grid">
          <div v-for="item in goods" :key="item.id" class="good-card">
            <div class="good-icon">{{ item.icon }}</div>
            <div class="good-info">
              <h3 class="good-name">{{ item.name }}</h3>
              <span class="good-price">¥ {{ item.price.toFixed(2) }}</span>
            </div>
            <button class="add-btn" @click="addCart(item)">
              <span>加入购物车</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 右侧/下方：购物车清单 -->
      <div class="cart-section">
        <div class="cart-header">
          <h2 class="section-title"> 购物车</h2>
          <span class="cart-badge">{{ cart.length }} 件商品</span>
        </div>

        <!-- 购物车为空时的提示 -->
        <div v-if="cart.length === 0" class="empty-cart">
          <span class="empty-icon"></span>
          <p>购物车空空如也，快去挑选商品吧！</p>
        </div>

        <!-- 购物车商品列表 -->
        <div v-else class="cart-list">
          <div v-for="item in cart" :key="item.id" class="cart-item">
            <div class="item-meta">
              <span class="item-icon">{{ item.icon }}</span>
              <div>
                <h4 class="item-name">{{ item.name }}</h4>
                <span class="item-unit-price">¥ {{ item.price.toFixed(2) }} / 件</span>
              </div>
            </div>

            <!-- 数量控制器 -->
            <div class="counter">
              <button class="count-btn" @click="sub(item)">-</button>
              <span class="count-num">{{ item.count }}</span>
              <button class="count-btn" @click="add(item)">+</button>
            </div>

            <!-- 小计与删除 -->
            <div class="item-subtotal">
              <span class="subtotal-price">¥ {{ (item.count * item.price).toFixed(2) }}</span>
              <button class="remove-btn" title="删除商品" @click="remove(item)">✕</button>
            </div>
          </div>

          <!-- 购物车底部结算栏 -->
          <div class="cart-footer">
            <div class="total-box">
              <span>合计总价：</span>
              <span class="total-price">¥ {{ todoPrice.toFixed(2) }}</span>
            </div>
            <button class="checkout-btn" @click="al(item)">
              立即结算
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shop-container {
  max-width: 1100px;
  width: 90%;
  margin: 0 auto;
  padding: 2rem 0 4rem;
}

/* 页头样式 */
.page-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.8rem;
  background-color: #eff6ff;
  color: #2563eb;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 9999px;
  margin-bottom: 0.6rem;
}

.page-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 0.6rem;
}

.gradient-text {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.page-desc {
  color: #64748b;
  font-size: 0.95rem;
}

/* 布局网格 */
.shop-layout {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 2rem;
}

@media (max-width: 868px) {
  .shop-layout {
    grid-template-columns: 1fr;
  }
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 1.2rem;
}

/* 左侧商品卡片区域 */
.goods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.2rem;
}

.good-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
}

.good-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px -8px rgba(37, 99, 235, 0.12);
  border-color: #bfdbfe;
}

.good-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.good-name {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.3rem;
}

.good-price {
  font-size: 1.1rem;
  font-weight: 800;
  color: #2563eb;
  margin-bottom: 1rem;
}

.add-btn {
  width: 100%;
  padding: 0.5rem 0.8rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #2563eb;
  background-color: #eff6ff;
  border: 1px solid #dbeafe;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.add-btn:hover {
  background-color: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
}

/* 右侧购物车区域 */
.cart-section {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  height: fit-content;
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.03);
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 0.8rem;
  margin-bottom: 1rem;
}

.cart-header .section-title {
  margin-bottom: 0;
}

.cart-badge {
  font-size: 0.8rem;
  background-color: #f1f5f9;
  color: #64748b;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  font-weight: 600;
}

/* 空状态 */
.empty-cart {
  text-align: center;
  padding: 2.5rem 1rem;
  color: #94a3b8;
}

.empty-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 0.5rem;
}

/* 购物车列表条目 */
.cart-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 0.8rem;
  border-bottom: 1px dashed #f1f5f9;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.item-icon {
  font-size: 1.5rem;
}

.item-name {
  font-size: 0.9rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.item-unit-price {
  font-size: 0.75rem;
  color: #94a3b8;
}

/* 计数器按钮 */
.counter {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background-color: #f8fafc;
  padding: 0.2rem;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.count-btn {
  width: 24px;
  height: 24px;
  border: none;
  background-color: #ffffff;
  color: #0f172a;
  font-weight: 700;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.count-num {
  font-size: 0.85rem;
  font-weight: 600;
  width: 20px;
  text-align: center;
}

/* 小计与删除 */
.item-subtotal {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.subtotal-price {
  font-size: 0.9rem;
  font-weight: 700;
  color: #0f172a;
}

.remove-btn {
  background: none;
  border: none;
  color: #cbd5e1;
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.2s;
}

.remove-btn:hover {
  color: #ef4444;
}

/* 底部结算 */
.cart-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #f1f5f9;
}

.total-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 1rem;
}

.total-price {
  font-size: 1.4rem;
  font-weight: 800;
  color: #2563eb;
}

.checkout-btn {
  width: 100%;
  padding: 0.75rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.checkout-btn:hover {
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
  transform: translateY(-1px);
}
</style>