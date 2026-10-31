<template>
  <div class="phonetics-page">
    <div class="page-header">
      <button class="back-btn" @click="$router.back()">← 返回</button>
      <h1 class="page-title">音标学习</h1>
      <p class="subtitle">点击音标听发音，查看字母组合和例词</p>
    </div>

    <div class="container">
      <div v-for="group in phoneticGroups" :key="group.id" class="phonetic-group">
        <h3 class="group-title">{{ group.name }}</h3>
        <div class="phonetic-grid">
          <div v-for="ph in getPhoneticsByGroup(group.id)" :key="ph.s"
            class="phonetic-item"
            @click="openPhonetic(ph)">
            <span class="phonetic-symbol">{{ ph.s }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { phonetics, phoneticGroups } from '../lib/store'
import { playPhoneme } from '../lib/speech'

const router = useRouter()

const getPhoneticsByGroup = (groupId) => phonetics.filter(ph => ph.g === groupId)

const openPhonetic = (ph) => {
  // 先播放再跳转：播放必须在点击时立即开始，否则部分手机会静音
  playPhoneme(ph.s).catch(err => console.error('播放失败', err))
  router.push({ name: 'PhoneticDetail', params: { index: phonetics.indexOf(ph) } })
}
</script>

<style scoped>
.phonetics-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.page-header {
  position: relative;
  background: linear-gradient(135deg, #fa8c16 0%, #faad14 100%);
  padding: 48px 20px 28px;
  color: white;
  text-align: center;
}

.back-btn {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 15px;
  padding: 6px 14px;
  border-radius: 16px;
  cursor: pointer;
}

.subtitle {
  font-size: 14px;
  opacity: 0.9;
  margin-top: 8px;
}

.phonetic-group {
  margin-bottom: 24px;
}

.group-title {
  font-size: 17px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  padding-left: 10px;
  border-left: 4px solid #fa8c16;
}

.phonetic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
  gap: 10px;
}

.phonetic-item {
  aspect-ratio: 1;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0,0,0,0.06);
  transition: transform 0.15s;
}

.phonetic-item:active {
  transform: scale(0.93);
  background: #fff7e6;
}

.phonetic-symbol {
  font-size: 26px;
  font-weight: 600;
  color: #1890ff;
}
</style>
