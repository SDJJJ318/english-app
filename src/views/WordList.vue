<template>
  <div class="word-list-page">
    <div class="page-header">
      <button class="back-btn" @click="$router.back()">← 返回</button>
      <h1 class="page-title">{{ pageTitle }}</h1>
    </div>

    <div class="container">
      <div class="category-tabs">
        <button v-for="cat in categories" :key="cat.id"
          class="cat-tab"
          :class="{ active: selectedCat === cat.id }"
          @click="selectedCat = cat.id">
          {{ cat.name }}
        </button>
      </div>

      <div class="start-bar">
        <button class="mode-btn" @click="startPractice('mix')">📝 混合练习</button>
        <button class="mode-btn" @click="startPractice('listen')">👂 听力</button>
        <button class="mode-btn" @click="startPractice('speak')">🗣 口语</button>
        <button class="mode-btn" @click="startPractice('read')">📖 阅读</button>
        <button class="mode-btn" @click="startPractice('write')">✍️ 拼写</button>
      </div>

      <div class="word-list">
        <div v-for="item in filteredItems" :key="item._key" class="word-card" @click="playWord(item)">
          <div class="word-main">
            <h3 class="word-en">{{ item.en }}</h3>
            <p class="word-zh">{{ item.zh }}</p>
          </div>
          <div class="word-right">
            <span class="play-icon">🔊</span>
            <div v-if="getProgress(item._key)" class="progress-badge">
              Box {{ getProgress(item._key).box }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { allWords, tradeWordCategories, getProgress } from '../lib/store'
import { speak } from '../lib/speech'

const route = useRoute()
const router = useRouter()

const category = route.params.category
const pageTitle = computed(() => category === 'all' ? '外贸词汇' : '词汇学习')

const categories = [
  { id: 'all', name: '全部' },
  ...tradeWordCategories
]

const selectedCat = ref(category === 'all' ? 'all' : category)

const filteredItems = computed(() => {
  if (selectedCat.value === 'all') return allWords
  return allWords.filter(w => w.cat === selectedCat.value)
})

const playWord = async (item) => {
  try {
    await speak(item.en || item.say || item.content)
  } catch (err) {
    console.error('播放失败', err)
  }
}

const startPractice = (mode) => {
  const items = filteredItems.value.slice(0, 10)
  router.push({
    name: 'Practice',
    query: {
      items: JSON.stringify(items.map(i => i._key)),
      mode
    }
  })
}
</script>

<style scoped>
.word-list-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.page-header {
  background: white;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.back-btn {
  background: none;
  border: none;
  color: #1890ff;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 8px;
}

.category-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 16px 0;
  margin-bottom: 16px;
}

.cat-tab {
  padding: 8px 16px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;
}

.cat-tab.active {
  background: #1890ff;
  color: white;
  border-color: #1890ff;
}

.start-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  overflow-x: auto;
}

.mode-btn {
  flex: 1;
  min-width: 70px;
  padding: 10px 8px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.mode-btn:active {
  background: #e6f7ff;
  border-color: #1890ff;
}

.word-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.word-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.word-card:active {
  transform: scale(0.98);
}

.word-main {
  flex: 1;
}

.word-en {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 4px;
}

.word-zh {
  font-size: 14px;
  color: #666;
}

.word-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.play-icon {
  font-size: 24px;
}

.progress-badge {
  padding: 4px 8px;
  background: #e6f7ff;
  border-radius: 4px;
  font-size: 12px;
  color: #1890ff;
}
</style>
