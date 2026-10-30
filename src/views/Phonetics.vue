<template>
  <div class="phonetics-page">
    <div class="page-header">
      <button class="back-btn" @click="$router.back()">← 返回</button>
      <h1 class="page-title">音标学习</h1>
      <p class="subtitle">48个国际音标</p>
    </div>

    <div class="container">
      <div v-for="group in phoneticGroups" :key="group.id" class="phonetic-group">
        <h3 class="group-title">{{ group.name }}</h3>
        <div class="phonetic-grid">
          <div v-for="ph in getPhoneticsByGroup(group.id)" :key="ph.s"
            class="phonetic-item"
            :class="{ active: selectedPhonetic?.s === ph.s }"
            @click="selectPhonetic(ph)">
            <span class="phonetic-symbol">{{ ph.s }}</span>
          </div>
        </div>
      </div>

      <div v-if="selectedPhonetic" class="phonetic-detail card">
        <button class="close-btn" @click="selectedPhonetic = null">✕</button>

        <div class="detail-header">
          <h2 class="detail-symbol" @click="playPhonetic(selectedPhonetic.s)">
            /{{ selectedPhonetic.s }}/
            <span class="play-icon">🔊</span>
          </h2>
          <p class="detail-tip">{{ selectedPhonetic.tip }}</p>
        </div>

        <div class="patterns-section">
          <h4>字母组合：</h4>
          <div v-for="(pattern, idx) in selectedPhonetic.patterns" :key="idx" class="pattern-group">
            <div class="pattern-header">
              <span class="pattern-letters">{{ pattern.letters }}</span>
            </div>
            <div class="pattern-words">
              <div v-for="word in pattern.words" :key="word" class="word-item" @click="playWord(word)">
                <span class="word-text">{{ word }}</span>
                <span class="word-play">🔊</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { phonetics, phoneticGroups } from '../lib/store'
import { speak } from '../lib/speech'

const selectedPhonetic = ref(null)

const getPhoneticsByGroup = (groupId) => {
  return phonetics.filter(ph => ph.g === groupId)
}

const selectPhonetic = (ph) => {
  selectedPhonetic.value = ph
  playPhonetic(ph.s)
}

const playPhonetic = async (symbol) => {
  try {
    await speak(symbol)
  } catch (err) {
    console.error('播放失败', err)
  }
}

const playWord = async (word) => {
  try {
    await speak(word)
  } catch (err) {
    console.error('播放失败', err)
  }
}
</script>

<style scoped>
.phonetics-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 20px;
}

.page-header {
  background: linear-gradient(135deg, #fa8c16 0%, #faad14 100%);
  padding: 40px 20px;
  color: white;
  text-align: center;
}

.back-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
}

.page-title {
  font-size: 28px;
  margin: 0 0 8px 0;
}

.subtitle {
  margin: 0;
  opacity: 0.9;
  font-size: 14px;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.phonetic-group {
  margin-bottom: 30px;
}

.group-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 12px;
  padding-left: 10px;
  border-left: 4px solid #fa8c16;
}

.phonetic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 10px;
}

.phonetic-item {
  background: white;
  border: 2px solid #e8e8e8;
  border-radius: 8px;
  padding: 16px 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
}

.phonetic-item:active {
  transform: scale(0.95);
}

.phonetic-item.active {
  border-color: #fa8c16;
  background: #fff7e6;
}

.phonetic-symbol {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.phonetic-detail {
  margin-top: 20px;
  position: relative;
  animation: slideIn 0.3s;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #f0f0f0;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 18px;
  color: #666;
}

.detail-header {
  text-align: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.detail-symbol {
  font-size: 48px;
  color: #fa8c16;
  margin: 0 0 12px 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.detail-symbol:active {
  transform: scale(0.95);
}

.play-icon {
  font-size: 32px;
}

.detail-tip {
  color: #666;
  font-size: 15px;
  margin: 0;
}

.patterns-section {
  margin-top: 20px;
}

.patterns-section h4 {
  font-size: 16px;
  color: #333;
  margin: 0 0 16px 0;
}

.pattern-group {
  margin-bottom: 20px;
  background: #fafafa;
  border-radius: 8px;
  padding: 12px;
}

.pattern-header {
  margin-bottom: 10px;
}

.pattern-letters {
  display: inline-block;
  background: #fa8c16;
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-weight: bold;
  font-size: 14px;
}

.pattern-words {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.word-item {
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
}

.word-item:active {
  transform: scale(0.95);
  background: #f0f0f0;
}

.word-text {
  font-size: 14px;
  color: #333;
}

.word-play {
  font-size: 16px;
}
</style>
