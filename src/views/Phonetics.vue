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
            @click="playWord(ph.words[0])">
            <span class="phonetic-symbol">{{ ph.s }}</span>
          </div>
        </div>
      </div>

      <div v-if="selectedPhonetic" class="phonetic-detail card">
        <button class="close-btn" @click="selectedPhonetic = null">✕</button>
        <h2 class="detail-symbol">/{{ selectedPhonetic.s }}/</h2>
        <p class="detail-tip">{{ selectedPhonetic.tip }}</p>

        <div class="example-words">
          <h4>例词：</h4>
          <div v-for="word in selectedPhonetic.words" :key="word" class="example-word">
            <span>{{ word }}</span>
            <button class="play-btn-small" @click="playWord(word)">🔊</button>
          </div>
        </div>

        <div class="practice-section">
          <h4>跟读练习：</h4>
          <SpeakCheck :text="selectedPhonetic.words[0]" @result="onPracticeResult" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { phonetics, phoneticGroups } from '../lib/store'
import { speak } from '../lib/speech'
import SpeakCheck from '../components/SpeakCheck.vue'

const router = useRouter()
const selectedPhonetic = ref(null)

const getPhoneticsByGroup = (groupId) => {
  return phonetics.filter(ph => ph.g === groupId)
}

const playWord = async (word) => {
  try {
    await speak(word)
  } catch (err) {
    console.error('播放失败', err)
  }
}

const onPracticeResult = (result) => {
  // 音标练习不计入成绩，仅用于练习
  console.log('练习结果:', result)
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
  top: 16px;
  left: 16px;
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
}

.subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin-top: 8px;
}

.phonetic-group {
  margin-bottom: 24px;
}

.group-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #333;
}

.phonetic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: 8px;
}

.phonetic-item {
  aspect-ratio: 1;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
}

.phonetic-item:active {
  transform: scale(0.95);
  background: #e6f7ff;
}

.phonetic-symbol {
  font-size: 28px;
  font-weight: 600;
  color: #1890ff;
}

.phonetic-detail {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-height: 70vh;
  overflow-y: auto;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
  z-index: 100;
  animation: slideUp 0.3s;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  background: #f5f5f5;
  border: none;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
}

.detail-symbol {
  font-size: 48px;
  text-align: center;
  color: #1890ff;
  margin-bottom: 16px;
}

.detail-tip {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 24px;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 8px;
}

.example-words {
  margin-bottom: 24px;
}

.example-words h4 {
  font-size: 16px;
  margin-bottom: 12px;
}

.example-word {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 8px;
}

.example-word span {
  font-size: 18px;
  font-weight: 500;
}

.play-btn-small {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.practice-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
}

.practice-section h4 {
  font-size: 16px;
  margin-bottom: 12px;
}
</style>
