<script setup>
import { ref, computed } from 'vue'

let id = 0
const goods = ref([
  { id: id++, name: '苹果', price: 6.0, count: 0 },
  { id: id++, name: '香蕉', price: 3.8, count: 0 },
  { id: id++, name: '西瓜', price: 15.0, count: 0 },
  { id: id++, name: '葡萄', price: 12.0, count: 0 },
  { id: id++, name: '草莓', price: 22.0, count: 0 }
])

const todoPrice = computed(() => {
  return goods.value.reduce((sum, item) => {
    return sum + (item.count * item.price)
  }, 0)
})

function add(item) {
  item.count++
}

function sub(item) {
  if (item.count > 0) {
    item.count--
  }
}

function remove(item) {
  goods.value = goods.value.filter((t) => t.id !== item.id)
}
</script>

<template>
  <div class="container">
    <div class="cart-box">
      <h2>购物清单</h2>

      <div class="list">
        <div v-for="item in goods" :key="item.id" class="item-row">
          <span class="item-name">{{ item.name }}</span>
          <span class="item-price">单价: ¥{{ item.price.toFixed(1) }}</span>
          
          <div class="count-control">
            <span>数量:</span>
            <button class="btn-step" @click="sub(item)">-</button>
            <span class="count-num">{{ item.count }}</span>
            <button class="btn-step" @click="add(item)">+</button>
          </div>

          <span class="item-subtotal">小计: ¥{{ (item.price * item.count).toFixed(1) }}</span>
          
          <button class="btn-delete" @click="remove(item)">删除商品</button>
        </div>

        <div v-if="goods.length === 0" class="empty-tip">
          清单为空，商品已被清空
        </div>
      </div>

      <div class="total-row">
        总价: <span class="total-price">¥{{ todoPrice.toFixed(1) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 全局居中与纯白背景 */
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  font-family: system-ui, -apple-system, sans-serif;
  color: #333;
}

/* 购物清单卡片 */
.cart-box {
  width: 100%;
  max-width: 520px;
  padding: 2rem;
  box-sizing: border-box;
}

h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.4rem;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 每行商品 */
.item-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  background-color: #fafafa;
  font-size: 0.95rem;
}

.item-name {
  font-weight: bold;
  width: 50px;
}

.item-price {
  color: #666;
  width: 90px;
}

/* 数量加减控制区域 */
.count-control {
  display: flex;
  align-items: center;
  gap: 6px;
}

.btn-step {
  width: 26px;
  height: 26px;
  line-height: 1;
  border: 1px solid #dcdfe6;
  background-color: #fff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.15s;
}

.btn-step:hover {
  background-color: #f5f7fa;
  border-color: #c0c4cc;
}

.count-num {
  display: inline-block;
  min-width: 20px;
  text-align: center;
  font-weight: 500;
}

.item-subtotal {
  width: 100px;
  color: #e6a23c;
  font-weight: bold;
}

/* 删除按钮 */
.btn-delete {
  padding: 4px 10px;
  border: 1px solid #fde2e2;
  background-color: #fef0f0;
  color: #f56c6c;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.btn-delete:hover {
  background-color: #f56c6c;
  color: #fff;
  border-color: #f56c6c;
}

.empty-tip {
  text-align: center;
  color: #909399;
  padding: 20px 0;
}

/* 底部总价 */
.total-row {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 2px dashed #eee;
  text-align: right;
  font-size: 1.1rem;
  font-weight: bold;
}

.total-price {
  color: #f56c6c;
  font-size: 1.3rem;
  margin-left: 4px;
}
</style>