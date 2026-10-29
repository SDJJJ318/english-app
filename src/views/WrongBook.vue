<template>
  <div class="wrong-book-page">
    <div class="page-header">
      <h1 class="page-title">错题本</h1>
      <p class="subtitle">{{ wrongItems.length }} 个错题待复习</p>
    </div>

    <div class="container">
      <div v-if="wrongItems.length > 0" class="start-bar">
        <button class="mode-btn" @click="startPractice('mix')">📝 混合练习</button>
        <button class="mode-btn" @click="startPractice('listen')">👂 听力</button>
        <button class="mode-btn" @click="startPractice('speak')">🗣 口语</button>
      </div>

      <div v-if="wrongItems.length === 0" class="empty-state">
        <div class="empty-icon">🎉</div>
        <p>太棒了！没有错题</p>
      </div>

      <div v-else class="wrong-list">
        <div v-for="item in wrongItems" :key="item._key" class="wrong-card" @click="playItem(item)">
          <div class="wrong-main">
            <p class="wrong-text">{{ item.en || item.content || item.q }}</p>
            <p class="wrong-translation">{{ item.zh || item.translation || '语法题' }}</p>
            <div class="wrong-stats">
              <span class="stat-badge">错误 {{ getProgress(item._key)?.wrong || 0 }} 次</span>
              <span class="stat-badge">Box {{ getProgress(item._key)?.box || 0 }}</span>
            </div>
          </div>
          <span v-if="item._type !== 'grammar'" class="play-icon">🔊</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getWrongItems, getProgress, shuffle } from '../lib/store'
import { speak } from '../lib/speech'

const router = useRouter()

const wrongItems = computed(() => getWrongItems())

const playItem = async (item) => {
  if (item._type === 'grammar') return
  try {
    await speak(item.en || item.content)
  } catch (err) {
    console.error('播放失败', err)
  }
}

const startPractice = (mode) => {
  const items = shuffle(wrongItems.value).slice(0, 20)
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
.wrong-book-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.page-header {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  padding: 40px 20px;
  color: white;
  text-align: center;
}

.subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin-top: 8px;
}

.start-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.mode-btn {
  flex: 1;
  padding: 12px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.mode-btn:active {
  background: #fff1f0;
  border-color: #ff4d4f;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
}

.empty-icon {
  font-size: 80px;
  margin-bottom: 16px;
}

.empty-state p {
  font-size: 18px;
  color: #999;
}

.wrong-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.wrong-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  border-left: 4px solid #ff4d4f;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.wrong-card:active {
  transform: scale(0.98);
}

.wrong-main {
  flex: 1;
}

.wrong-text {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 6px;
}

.wrong-translation {
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.wrong-stats {
  display: flex;
  gap: 8px;
}

.stat-badge {
  padding: 4px 8px;
  background: #fff1f0;
  border-radius: 4px;
  font-size: 12px;
  color: #ff4d4f;
}

.play-icon {
  font-size: 24px;
}
</style>
