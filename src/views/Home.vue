<template>
  <div class="home">
    <div class="hero">
      <h1>英语学习</h1>
      <div class="stats">
        <div class="stat-item">
          <span class="stat-value">{{ streak }}</span>
          <span class="stat-label">连续天数</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ dueCount }}</span>
          <span class="stat-label">待复习</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ wrongCount }}</span>
          <span class="stat-label">错题数</span>
        </div>
      </div>
    </div>

    <div class="container">
      <button v-if="dueCount > 0" class="btn btn-primary review-btn" @click="startReview">
        开始复习 ({{ dueCount }}项)
      </button>

      <div class="modules">
        <div class="module-card" @click="$router.push('/words/all')">
          <div class="module-icon">📚</div>
          <div class="module-title">光伏词汇</div>
          <div class="module-desc">{{ words.length }} 个单词</div>
        </div>

        <div class="module-card" @click="$router.push('/phrases/trade')">
          <div class="module-icon">💼</div>
          <div class="module-title">外贸对话</div>
          <div class="module-desc">常用商务短语</div>
        </div>

        <div class="module-card" @click="$router.push('/phrases/daily')">
          <div class="module-icon">💬</div>
          <div class="module-title">日常对话</div>
          <div class="module-desc">生活常用短语</div>
        </div>

        <div class="module-card" @click="$router.push('/phonetics')">
          <div class="module-icon">🔊</div>
          <div class="module-title">音标学习</div>
          <div class="module-desc">48 个音标</div>
        </div>

        <div class="module-card" @click="$router.push('/grammar')">
          <div class="module-icon">📖</div>
          <div class="module-title">语法练习</div>
          <div class="module-desc">{{ grammarQuestions.length }} 道题</div>
        </div>

        <div class="module-card" @click="$router.push('/custom')">
          <div class="module-icon">✏️</div>
          <div class="module-title">我的词库</div>
          <div class="module-desc">自定义内容</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { words, grammarQuestions, getDueItems, getWrongItems, getStreak, shuffle } from '../lib/store'

const router = useRouter()

const streak = computed(() => getStreak())
const dueItems = computed(() => getDueItems())
const dueCount = computed(() => dueItems.value.length)
const wrongCount = computed(() => getWrongItems().length)

const startReview = () => {
  const items = shuffle(dueItems.value).slice(0, 20)
  router.push({
    name: 'Practice',
    query: { items: JSON.stringify(items.map(i => i._key)), mode: 'mix' }
  })
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero {
  padding: 40px 20px;
  text-align: center;
  color: white;
}

.hero h1 {
  font-size: 32px;
  margin-bottom: 24px;
}

.stats {
  display: flex;
  justify-content: center;
  gap: 24px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: 28px;
  font-weight: 700;
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
  margin-top: 4px;
}

.container {
  background: #f5f5f5;
  border-radius: 24px 24px 0 0;
  padding: 24px 16px;
  min-height: 60vh;
}

.review-btn {
  width: 100%;
  height: 56px;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 24px;
}

.modules {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.module-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.module-card:active {
  transform: scale(0.95);
}

.module-icon {
  font-size: 40px;
  margin-bottom: 8px;
}

.module-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
}

.module-desc {
  font-size: 13px;
  color: #999;
}
</style>
