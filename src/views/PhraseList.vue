<template>
  <div class="phrase-list-page">
    <div class="page-header">
      <button class="back-btn" @click="$router.back()">← 返回</button>
      <h1 class="page-title">{{ pageTitle }}</h1>
    </div>

    <div class="container">
      <div class="scene-tabs">
        <button v-for="scene in filteredScenes" :key="scene.id"
          class="scene-tab"
          :class="{ active: selectedScene === scene.id }"
          @click="selectedScene = scene.id">
          {{ scene.name }}
        </button>
      </div>

      <div class="start-bar">
        <button class="mode-btn" @click="startPractice('mix')">📝 混合</button>
        <button class="mode-btn" @click="startPractice('listen')">👂 听力</button>
        <button class="mode-btn" @click="startPractice('speak')">🗣 口语</button>
      </div>

      <div class="phrase-list">
        <div v-for="item in filteredItems" :key="item._key" class="phrase-card" @click="playPhrase(item)">
          <div class="phrase-main">
            <p class="phrase-en">{{ item.en }}</p>
            <p class="phrase-ph">{{ item.ph }}</p>
            <p class="phrase-zh">{{ item.zh }}</p>
          </div>
          <span class="play-icon">🔊</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { allPhrases, phraseScenes } from '../lib/store'
import { speak } from '../lib/speech'

const route = useRoute()
const router = useRouter()

const group = route.params.scene // 'trade' 或 'daily'
const pageTitle = computed(() => group === 'trade' ? '外贸对话' : '日常对话')

const filteredScenes = computed(() => phraseScenes.filter(s => s.group === group))
const selectedScene = ref(filteredScenes.value[0]?.id)

const filteredItems = computed(() => {
  return allPhrases.filter(p => p.scene === selectedScene.value)
})

const playPhrase = async (item) => {
  try {
    await speak(item.en)
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
.phrase-list-page {
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

.scene-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 16px 0;
  margin-bottom: 16px;
}

.scene-tab {
  padding: 8px 16px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 20px;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;
}

.scene-tab.active {
  background: #1890ff;
  color: white;
  border-color: #1890ff;
}

.start-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.mode-btn {
  flex: 1;
  padding: 10px 12px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
}

.mode-btn:active {
  background: #e6f7ff;
  border-color: #1890ff;
}

.phrase-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.phrase-card {
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

.phrase-card:active {
  transform: scale(0.98);
}

.phrase-main {
  flex: 1;
}

.phrase-en {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
}

.phrase-ph {
  font-size: 13px;
  color: #1890ff;
  font-family: 'Courier New', monospace;
  margin-bottom: 4px;
}

.phrase-zh {
  font-size: 14px;
  color: #666;
}

.play-icon {
  font-size: 24px;
}
</style>
