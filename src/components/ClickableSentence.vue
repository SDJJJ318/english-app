<template>
  <div class="clickable-sentence">
    <span v-for="(t, i) in tokens" :key="i" class="token" :class="{ answer: t.answer }">
      <span v-if="t.blank" class="blank">___</span>
      <template v-else>{{ t.lead }}<span v-if="t.entry" class="word" :class="{ active: active?.i === i }"
        @click.stop="pick(t, i)">{{ t.text }}</span><template v-else>{{ t.text }}</template>{{ t.trail }}</template>
    </span>

    <div v-if="active" class="word-card" @click.stop>
      <button class="card-close" @click="active = null">✕</button>
      <div class="card-word">{{ active.text }}</div>
      <div class="card-ph">{{ active.entry.ph }}</div>
      <div class="card-zh">{{ active.entry.zh }}</div>
      <button class="card-play" @click="play(active)">🔊 再听一遍</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { grammarDict } from '../data/grammarDict'
import { speak } from '../lib/speech'

const props = defineProps({
  text: { type: String, required: true },
  // 题目里 ___ 的答案；不传表示还没作答，显示空格
  answer: { type: String, default: null },
})

const active = ref(null)
watch(() => props.text, () => { active.value = null })

// 按空格拆成单词，前后标点跟单词放在一起但不参与查词；'5,000'、'0.11'、"don't" 保持完整
const split = (str, answer = false) => str.split(/\s+/).filter(Boolean).map(chunk => {
  const [, lead, text, trail] = chunk.match(/^([^\w']*)(.*?)([^\w']*)$/)
  return { lead, text, trail, answer, entry: grammarDict[text.toLowerCase()] }
})

const tokens = computed(() => {
  const [before, after = ''] = props.text.split('___')
  const blank = props.answer === null ? [{ blank: true }] : split(props.answer, true)
  return props.text.includes('___') ? [...split(before), ...blank, ...split(after)] : split(props.text)
})

const play = (t) => speak(t.entry.say || t.text).catch(err => console.error('播放失败', err))

const pick = (t, i) => {
  play(t)
  active.value = { ...t, i }
}
</script>

<style scoped>
.clickable-sentence {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px 8px;
  line-height: 1.4;
}

.word {
  cursor: pointer;
  border-bottom: 2px dotted #bbb;
}

.word:active,
.word.active {
  color: #1890ff;
  border-bottom-color: #1890ff;
}

.answer {
  color: #52c41a;
}

.blank {
  color: #1890ff;
  letter-spacing: 2px;
}

.word-card {
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: calc(16px + env(safe-area-inset-bottom));
  z-index: 200;
  background: white;
  border-radius: 14px;
  padding: 18px 20px;
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.18);
  text-align: left;
  font-weight: normal;
  animation: up 0.2s;
}

@keyframes up {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.card-close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  background: #f2f2f2;
  font-size: 15px;
  color: #666;
  cursor: pointer;
}

.card-word {
  font-size: 26px;
  font-weight: 700;
  color: #333;
}

.card-ph {
  font-size: 17px;
  color: #1890ff;
  margin-top: 4px;
}

.card-zh {
  font-size: 17px;
  color: #555;
  margin-top: 6px;
}

.card-play {
  margin-top: 12px;
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background: white;
  font-size: 15px;
  cursor: pointer;
}
</style>
