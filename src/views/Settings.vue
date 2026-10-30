<template>
  <div class="settings-page">
    <div class="page-header">
      <h1 class="page-title">设置</h1>
    </div>

    <div class="container">
      <div class="setting-section card">
        <h3>语音设置</h3>

        <div class="setting-item">
          <label class="setting-label">朗读速度</label>
          <div class="speed-control">
            <input type="range" min="0.5" max="1.5" step="0.1"
              v-model.number="store.settings.speechRate"
              @change="testVoice" />
            <span class="speed-value">{{ store.settings.speechRate }}x</span>
          </div>
        </div>

        <div class="setting-item">
          <label class="setting-label">朗读声音来源</label>
          <select v-model="store.settings.ttsEngine" class="setting-select">
            <option value="online">内置录音（推荐）</option>
            <option value="system">手机自带朗读</option>
          </select>
        </div>

        <div class="setting-item">
          <label class="setting-label">发音识别模式</label>
          <select v-model="store.settings.sttMode" class="setting-select">
            <option value="auto">自动评分（需语音识别）</option>
            <option value="record">录音自评（更稳定）</option>
          </select>
          <p class="setting-tip">
            自动评分在国内Android手机可能不可用，建议选择录音自评
          </p>
        </div>

        <button class="btn btn-primary" @click="testVoice">🔊 测试语音</button>
      </div>

      <div class="info-section card">
        <h3>学习统计</h3>
        <div class="stats-grid">
          <div class="stat-box">
            <span class="stat-label">连续学习</span>
            <span class="stat-value">{{ streak }} 天</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">今日练习</span>
            <span class="stat-value">{{ todayCount }} 题</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">总词汇量</span>
            <span class="stat-value">{{ totalWords }}</span>
          </div>
          <div class="stat-box">
            <span class="stat-label">错题数</span>
            <span class="stat-value">{{ wrongCount }}</span>
          </div>
        </div>
      </div>

      <div class="about-section card">
        <h3>关于</h3>
        <p class="about-text">光伏外贸英语学习 APP</p>
        <p class="about-text">版本：1.0.0</p>
        <p class="about-tip">
          本应用数据存储在本地浏览器中，建议定期在"我的词库"页面备份数据
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { store, getStreak, getWrongItems, words, phrases, getCustomItems } from '../lib/store'
import { speak } from '../lib/speech'

const streak = computed(() => getStreak())
const wrongCount = computed(() => getWrongItems().length)
const totalWords = computed(() => words.length + phrases.length + getCustomItems().length)

const today = new Date().toISOString().split('T')[0]
const todayStats = computed(() => store.dailyStats[today] || { right: 0, wrong: 0 })
const todayCount = computed(() => todayStats.value.right + todayStats.value.wrong)

const testVoice = async () => {
  try {
    await speak('Hello, this is a test. The price is FOB Shanghai.')
  } catch (err) {
    alert('语音播放失败')
  }
}
</script>

<style scoped>
.settings-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.page-header {
  background: white;
  padding: 40px 20px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.setting-section, .info-section, .about-section {
  margin-bottom: 16px;
}

.setting-section h3, .info-section h3, .about-section h3 {
  margin-bottom: 16px;
  font-size: 18px;
}

.setting-item {
  margin-bottom: 24px;
}

.setting-label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
}

.speed-control {
  display: flex;
  align-items: center;
  gap: 12px;
}

.speed-control input[type="range"] {
  flex: 1;
  height: 6px;
  border-radius: 3px;
  outline: none;
  -webkit-appearance: none;
  background: #e0e0e0;
}

.speed-control input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #1890ff;
  cursor: pointer;
}

.speed-value {
  font-size: 16px;
  font-weight: 600;
  min-width: 50px;
  text-align: right;
}

.setting-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 16px;
}

.setting-tip {
  font-size: 13px;
  color: #999;
  margin-top: 8px;
  line-height: 1.5;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.stat-box {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
}

.stat-label {
  display: block;
  font-size: 14px;
  color: #999;
  margin-bottom: 8px;
}

.stat-value {
  display: block;
  font-size: 24px;
  font-weight: 600;
  color: #1890ff;
}

.about-text {
  font-size: 15px;
  margin-bottom: 8px;
  color: #666;
}

.about-tip {
  font-size: 13px;
  color: #999;
  line-height: 1.6;
  margin-top: 16px;
  padding: 12px;
  background: #fffbe6;
  border-left: 3px solid #faad14;
  border-radius: 4px;
}
</style>
