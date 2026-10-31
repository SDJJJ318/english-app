<template>
  <div v-if="ph" class="detail-page">
    <div class="page-header">
      <button class="back-btn" @click="$router.back()">← 返回</button>
      <button class="symbol-btn" @click="play">
        <span class="symbol">/{{ ph.s }}/</span>
        <span class="speaker">🔊</span>
      </button>
      <p class="tip">{{ ph.tip }}</p>
    </div>

    <div class="container">
      <div v-for="pattern in ph.patterns" :key="pattern.letters" class="pattern-card">
        <div class="pattern-title">
          字母组合 <span class="letters">{{ pattern.letters }}</span>
        </div>
        <div v-for="word in pattern.words" :key="word.w" class="word-row" @click="playWord(word)">
          <div class="word-main">
            <span class="word-en">
              <span v-for="(part, i) in splitWord(word.w)" :key="i" :class="{ hl: part.hl }">{{ part.text }}</span>
            </span>
            <span class="word-ph">{{ word.ph }}</span>
          </div>
          <span class="word-zh">{{ word.zh }}</span>
          <span class="word-play">🔊</span>
        </div>
      </div>

      <div class="nav-row">
        <button class="btn btn-outline" :disabled="index === 0" @click="go(index - 1)">← 上一个</button>
        <button class="btn btn-outline" :disabled="index === phonetics.length - 1" @click="go(index + 1)">下一个 →</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { phonetics } from '../lib/store'
import { plainWord } from '../data/phonetics'
import { speak, playPhoneme } from '../lib/speech'

const route = useRoute()
const router = useRouter()

const index = computed(() => Number(route.params.index))
const ph = computed(() => phonetics[index.value])

// 把 "m[a]k[e]" 拆成普通部分和要标红的部分
const splitWord = (w) => w.split(/(\[[^\]]+\])/).filter(Boolean).map(part =>
  part.startsWith('[') ? { text: part.slice(1, -1), hl: true } : { text: part, hl: false })

const playSymbol = (i) => playPhoneme(phonetics[i].s).catch(err => console.error('播放失败', err))

const play = () => playSymbol(index.value)

const playWord = (word) => speak(plainWord(word.w)).catch(err => console.error('播放失败', err))

// 切换音标时顺便播放新音标的发音
const go = (i) => {
  playSymbol(i)
  router.replace({ name: 'PhoneticDetail', params: { index: i } })
}
</script>

<style scoped>
.detail-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.page-header {
  position: relative;
  background: linear-gradient(135deg, #fa8c16 0%, #faad14 100%);
  padding: 48px 20px 24px;
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

.symbol-btn {
  background: rgba(255, 255, 255, 0.95);
  border: none;
  border-radius: 16px;
  padding: 12px 28px;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.symbol-btn:active {
  transform: scale(0.95);
}

.symbol {
  font-size: 44px;
  font-weight: 700;
  color: #fa8c16;
}

.speaker {
  font-size: 28px;
}

.tip {
  margin-top: 14px;
  font-size: 15px;
  line-height: 1.5;
}

.pattern-card {
  background: white;
  border-radius: 12px;
  padding: 14px 16px 6px;
  margin-bottom: 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.pattern-title {
  font-size: 14px;
  color: #999;
  margin-bottom: 8px;
}

.letters {
  display: inline-block;
  margin-left: 6px;
  background: #ff4d4f;
  color: white;
  font-weight: 700;
  font-size: 15px;
  padding: 2px 10px;
  border-radius: 4px;
}

.word-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-top: 1px solid #f2f2f2;
  cursor: pointer;
}

.word-row:active {
  background: #fafafa;
}

.word-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.word-en {
  font-size: 20px;
  font-weight: 500;
  color: #333;
}

.word-en .hl {
  color: #ff4d4f;
  font-weight: 700;
}

.word-ph {
  font-size: 14px;
  color: #1890ff;
}

.word-zh {
  font-size: 15px;
  color: #666;
  text-align: right;
}

.word-play {
  font-size: 20px;
}

.nav-row {
  display: flex;
  gap: 12px;
  margin-top: 8px;
}

.nav-row .btn {
  flex: 1;
}
</style>
