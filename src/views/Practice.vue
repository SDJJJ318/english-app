<template>
  <div class="practice-page">
    <div class="practice-header">
      <button class="back-btn" @click="confirmExit">← 退出</button>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>
      <div class="progress-text">{{ currentIndex + 1 }} / {{ queue.length }}</div>
    </div>

    <div v-if="!finished" class="practice-content">
      <div v-if="currentItem" class="question-card">
        <!-- 选择中文 -->
        <div v-if="currentType === 'choose_zh'" class="question">
          <p class="q-prompt">选择正确的中文意思：</p>
          <button class="play-btn" @click="playAudio(currentItem.en || currentItem.content)">🔊 播放</button>
          <h2 class="q-text">{{ currentItem.en || currentItem.content }}</h2>
          <div class="options">
            <button v-for="opt in options" :key="opt" class="option-btn"
              :class="{ selected: selected === opt, correct: answered && opt === correctAnswer, wrong: answered && selected === opt && opt !== correctAnswer }"
              @click="selectOption(opt)" :disabled="answered">
              {{ opt }}
            </button>
          </div>
        </div>

        <!-- 听力理解 -->
        <div v-else-if="currentType === 'listen'" class="question">
          <p class="q-prompt">听音频，选择对应的中文：</p>
          <button class="play-btn large" @click="playAudio(currentItem.en || currentItem.content)">🔊 点击播放</button>
          <div v-if="playCount > 0" class="options">
            <button v-for="opt in options" :key="opt" class="option-btn"
              :class="{ selected: selected === opt, correct: answered && opt === correctAnswer, wrong: answered && selected === opt && opt !== correctAnswer }"
              @click="selectOption(opt)" :disabled="answered">
              {{ opt }}
            </button>
          </div>
        </div>

        <!-- 选择英文 -->
        <div v-else-if="currentType === 'choose_en'" class="question">
          <p class="q-prompt">选择对应的英文：</p>
          <h2 class="q-text">{{ currentItem.zh || currentItem.translation }}</h2>
          <div class="options">
            <button v-for="opt in options" :key="opt" class="option-btn"
              :class="{ selected: selected === opt, correct: answered && opt === correctAnswer, wrong: answered && selected === opt && opt !== correctAnswer }"
              @click="selectOption(opt)" :disabled="answered">
              {{ opt }}
            </button>
          </div>
        </div>

        <!-- 拼写 -->
        <div v-else-if="currentType === 'spell'" class="question">
          <p class="q-prompt">听音频，拼写单词：</p>
          <button class="play-btn" @click="playAudio(currentItem.en)">🔊 播放</button>
          <p class="hint">{{ hint }}</p>
          <input v-model="userInput" @keyup.enter="checkSpelling" :disabled="answered" placeholder="输入英文" class="spell-input" />
          <button v-if="!answered" class="btn btn-primary" @click="checkSpelling">提交</button>
          <button v-if="!answered" class="btn btn-outline" @click="giveUp">不会</button>
        </div>

        <!-- 排序句子 -->
        <div v-else-if="currentType === 'order'" class="question">
          <p class="q-prompt">听音频，排列句子：</p>
          <button class="play-btn" @click="playAudio(currentItem.content)">🔊 播放</button>
          <p class="zh-hint">{{ currentItem.translation }}</p>
          <div class="word-bank">
            <button v-for="(word, i) in shuffledWords" :key="i" class="word-chip" @click="addWord(word)" :disabled="answered">
              {{ word }}
            </button>
          </div>
          <div class="answer-area">
            <button v-for="(word, i) in userOrder" :key="i" class="word-chip selected" @click="removeWord(i)" :disabled="answered">
              {{ word }}
            </button>
          </div>
          <button v-if="userOrder.length === shuffledWords.length && !answered" class="btn btn-primary" @click="checkOrder">提交</button>
          <button v-if="!answered && userOrder.length > 0" class="btn btn-outline" @click="userOrder = []">重置</button>
        </div>

        <!-- 跟读 -->
        <div v-else-if="currentType === 'speak'" class="question">
          <p class="q-prompt">跟读下面的内容：</p>
          <h2 class="q-text">{{ currentItem.en || currentItem.content }}</h2>
          <p class="zh-text">{{ currentItem.zh || currentItem.translation }}</p>
          <SpeakCheck :text="currentItem.en || currentItem.content" @result="onSpeakResult" />
        </div>

        <!-- 语法题 -->
        <div v-else-if="currentType === 'grammar'" class="question">
          <p class="q-prompt">选择正确答案（点单词可听发音、看意思）：</p>
          <h3 class="q-text">
            <ClickableSentence :text="currentItem.q" :answer="answered ? currentItem.opts[currentItem.a] : null" />
          </h3>
          <p class="zh-text">{{ currentItem.zh }}</p>
          <div class="options">
            <button v-for="(opt, i) in currentItem.opts" :key="i" class="option-btn"
              :class="{ selected: selected === i, correct: answered && i === currentItem.a, wrong: answered && selected === i && i !== currentItem.a }"
              @click="selectOption(i)" :disabled="answered">
              {{ opt }}
            </button>
          </div>
          <p v-if="answered" class="explanation">{{ currentItem.exp }}</p>
        </div>

        <!-- 反馈卡片 -->
        <div v-if="answered" class="feedback">
          <div v-if="isCorrect" class="feedback-msg correct">✓ 正确</div>
          <div v-else class="feedback-msg wrong">✗ 错误</div>
          <div v-if="currentItem._type !== 'grammar'" class="item-detail">
            <p class="en-detail">{{ currentItem.en || currentItem.content }}</p>
            <p class="zh-detail">{{ currentItem.zh || currentItem.translation }}</p>
            <p v-if="currentItem.ph" class="ph-detail">{{ currentItem.ph }}</p>
            <p v-if="currentItem.ex" class="ex-detail">{{ currentItem.ex }}</p>
            <p v-if="currentItem.exZh" class="ex-zh-detail">{{ currentItem.exZh }}</p>
          </div>
          <button class="btn btn-primary next-btn" @click="nextQuestion">下一题</button>
        </div>
      </div>
    </div>

    <div v-else class="result-screen">
      <h2>练习完成！</h2>
      <div class="result-stats">
        <div class="result-item">
          <span class="result-value correct">{{ correctCount }}</span>
          <span class="result-label">答对</span>
        </div>
        <div class="result-item">
          <span class="result-value wrong">{{ wrongCount }}</span>
          <span class="result-label">答错</span>
        </div>
      </div>
      <div v-if="wrongItems.length > 0" class="wrong-list">
        <h3>错题：</h3>
        <div v-for="item in wrongItems" :key="item._key" class="wrong-item">
          {{ item.en || item.content || item.q }}
        </div>
      </div>
      <button class="btn btn-primary" @click="$router.push('/')">返回首页</button>
      <button v-if="wrongItems.length > 0" class="btn btn-outline" @click="retryWrong">重练错题</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getAllVocab, allGrammar, recordAnswer, shuffle, getProgress } from '../lib/store'
import { speak } from '../lib/speech'
import SpeakCheck from '../components/SpeakCheck.vue'
import ClickableSentence from '../components/ClickableSentence.vue'

const router = useRouter()
const route = useRoute()

// 从路由获取参数
const itemKeys = ref([])
const mode = ref('mix')

onMounted(() => {
  const keysParam = route.query.items
  const modeParam = route.query.mode || 'mix'

  if (keysParam) {
    try {
      itemKeys.value = JSON.parse(keysParam)
      mode.value = modeParam
      initQueue()
    } catch (err) {
      console.error('参数解析失败', err)
      router.push('/')
    }
  } else {
    router.push('/')
  }
})

// 加载题目项
const allItems = [...getAllVocab(), ...allGrammar]
const queue = ref([])
const currentIndex = ref(0)
const finished = ref(false)

const currentItem = computed(() => {
  if (currentIndex.value >= queue.value.length) return null
  const q = queue.value[currentIndex.value]
  return allItems.find(it => it._key === q.key)
})

const currentType = computed(() => queue.value[currentIndex.value]?.type)

const progressPercent = computed(() => {
  if (queue.value.length === 0) return 0
  return ((currentIndex.value + (answered.value ? 1 : 0)) / queue.value.length) * 100
})

// 初始化队列
const initQueue = () => {
  const items = itemKeys.value.map(key => allItems.find(it => it._key === key)).filter(Boolean)
  const q = []

  items.forEach(item => {
    const types = getQuestionTypes(item, mode.value)
    const type = types[Math.floor(Math.random() * types.length)]
    q.push({ key: item._key, type, isRetry: false })
  })

  queue.value = shuffle(q)

  // 初始化第一题
  if (queue.value.length > 0) {
    prepareQuestion()
  }
}

// 根据模式确定题型
const getQuestionTypes = (item, m) => {
  if (item._type === 'grammar') return ['grammar']

  const text = item.en || item.content
  const isWord = text && text.split(/\s+/).length <= 3

  if (m === 'listen') return ['listen']
  if (m === 'speak') return ['speak']
  if (m === 'read') return ['choose_zh', 'choose_en']
  if (m === 'write') return isWord ? ['spell'] : ['order']

  // mix 模式
  const types = ['choose_zh', 'listen', 'choose_en']
  if (isWord) types.push('spell')
  else types.push('order')
  types.push('speak')
  return types
}

// 题目状态
const answered = ref(false)
const isCorrect = ref(false)
const selected = ref(null)
const options = ref([])
const correctAnswer = ref(null)
const userInput = ref('')
const userOrder = ref([])
const shuffledWords = ref([])
const hint = ref('')
const playCount = ref(0)

// 统计
const firstAttempts = ref({})
const correctCount = computed(() => Object.values(firstAttempts.value).filter(v => v).length)
const wrongCount = computed(() => Object.values(firstAttempts.value).filter(v => !v).length)
const wrongItems = computed(() => {
  const keys = Object.entries(firstAttempts.value).filter(([k, v]) => !v).map(([k]) => k)
  return keys.map(key => allItems.find(it => it._key === key)).filter(Boolean)
})

// 监听题目变化，重置状态
watch(currentIndex, () => {
  // 答完一题后页面可能已经往下滚动看解析，换题时回到顶部
  window.scrollTo(0, 0)
  answered.value = false
  isCorrect.value = false
  selected.value = null
  userInput.value = ''
  userOrder.value = []
  playCount.value = 0

  if (currentItem.value && currentType.value) {
    prepareQuestion()
  }
})

// 准备题目
const prepareQuestion = () => {
  const item = currentItem.value
  const type = currentType.value

  if (type === 'choose_zh' || type === 'listen') {
    correctAnswer.value = item.zh
    options.value = generateOptions(correctAnswer.value, 'zh')
  } else if (type === 'choose_en') {
    correctAnswer.value = item.en
    options.value = generateOptions(correctAnswer.value, 'en')
  } else if (type === 'spell') {
    const word = item.en
    hint.value = word[0] + '_'.repeat(word.length - 1)
  } else if (type === 'order') {
    const words = item.en.split(' ')
    shuffledWords.value = shuffle(words)
  }
}

// 生成选项
const generateOptions = (correct, lang) => {
  const pool = getAllVocab()
  const candidates = pool.filter(it => {
    const val = lang === 'zh' ? it.zh : it.en
    return val && val !== correct
  })

  const distractors = shuffle(candidates).slice(0, 3).map(it =>
    lang === 'zh' ? it.zh : it.en
  )

  return shuffle([correct, ...distractors])
}

// 选择答案
const selectOption = (opt) => {
  if (answered.value) return
  selected.value = opt

  const item = currentItem.value
  const type = currentType.value

  let correct = false

  if (type === 'grammar') {
    correct = opt === item.a
  } else {
    correct = opt === correctAnswer.value
  }

  finishAnswer(correct)
}

// 检查拼写
const checkSpelling = () => {
  if (answered.value) return
  const correct = userInput.value.trim().toLowerCase() === currentItem.value.en.toLowerCase()
  finishAnswer(correct)
}

// 放弃
const giveUp = () => {
  userInput.value = currentItem.value.en
  finishAnswer(false)
}

// 检查排序
const checkOrder = () => {
  if (answered.value) return
  const correct = userOrder.value.join(' ') === currentItem.value.en
  finishAnswer(correct)
}

// 添加词
const addWord = (word) => {
  userOrder.value.push(word)
  const idx = shuffledWords.value.indexOf(word)
  shuffledWords.value.splice(idx, 1)
}

// 移除词
const removeWord = (index) => {
  const word = userOrder.value[index]
  userOrder.value.splice(index, 1)
  shuffledWords.value.push(word)
}

// 跟读结果
const onSpeakResult = (result) => {
  finishAnswer(result.passed)
}

// 完成答题
const finishAnswer = (correct) => {
  if (answered.value) return
  answered.value = true
  isCorrect.value = correct

  const q = queue.value[currentIndex.value]

  // 记录首次结果
  if (!q.isRetry && !firstAttempts.value[q.key]) {
    firstAttempts.value[q.key] = correct
    recordAnswer(q.key, correct)
  }

  // 错题重排一次
  if (!correct && !q.isRetry) {
    const types = getQuestionTypes(currentItem.value, mode.value)
    const newType = types.filter(t => t !== currentType.value)[0] || types[0]
    queue.value.push({ key: q.key, type: newType, isRetry: true })
  }

  // 自动播放音频
  if (currentItem.value.en) {
    playAudio(currentItem.value.en)
  }
}

// 下一题
const nextQuestion = () => {
  if (currentIndex.value < queue.value.length - 1) {
    currentIndex.value++
  } else {
    finished.value = true
  }
}

// 播放音频
const playAudio = async (text) => {
  playCount.value++
  try {
    await speak(currentItem.value.say || text)
  } catch (err) {
    console.error('播放失败', err)
  }
}

// 重练错题
const retryWrong = () => {
  itemKeys.value = wrongItems.value.map(it => it._key)
  firstAttempts.value = {}
  currentIndex.value = 0
  finished.value = false
  initQueue()
}

// 退出确认
const confirmExit = () => {
  if (confirm('确定要退出练习吗？进度不会保存。')) {
    router.push('/')
  }
}
</script>

<style scoped>
.practice-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 0;
}

.practice-header {
  background: white;
  padding: 12px 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-btn {
  background: none;
  border: none;
  font-size: 16px;
  color: #1890ff;
  cursor: pointer;
  margin-bottom: 8px;
}

.progress-bar {
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 6px;
}

.progress-fill {
  height: 100%;
  background: #1890ff;
  transition: width 0.3s;
}

.progress-text {
  text-align: center;
  font-size: 14px;
  color: #666;
}

.practice-content {
  padding: 20px 16px;
}

.question-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.q-prompt {
  font-size: 14px;
  color: #999;
  margin-bottom: 16px;
}

.q-text {
  font-size: 24px;
  margin-bottom: 24px;
  text-align: center;
}

.zh-text {
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-bottom: 20px;
}

.play-btn {
  display: block;
  margin: 16px auto;
  padding: 12px 24px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
}

.play-btn.large {
  padding: 24px 48px;
  font-size: 32px;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-btn {
  padding: 16px;
  background: #f5f5f5;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.option-btn.selected {
  border-color: #1890ff;
  background: #e6f7ff;
}

.option-btn.correct {
  border-color: #52c41a;
  background: #f6ffed;
}

.option-btn.wrong {
  border-color: #ff4d4f;
  background: #fff1f0;
}

.option-btn:disabled {
  cursor: not-allowed;
}

.spell-input {
  margin: 16px 0;
  text-align: center;
  font-size: 20px;
}

.hint {
  text-align: center;
  font-size: 18px;
  letter-spacing: 4px;
  color: #999;
  margin: 16px 0;
}

.zh-hint {
  text-align: center;
  color: #666;
  margin-bottom: 16px;
}

.word-bank, .answer-area {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
  min-height: 50px;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 8px;
}

.word-chip {
  padding: 8px 16px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
}

.word-chip.selected {
  background: #1890ff;
  color: white;
  border-color: #1890ff;
}

.explanation {
  margin-top: 16px;
  padding: 12px;
  background: #f0f0f0;
  border-radius: 6px;
  font-size: 14px;
  color: #666;
}

.feedback {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 2px solid #f0f0f0;
}

.feedback-msg {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 16px;
}

.feedback-msg.correct {
  color: #52c41a;
}

.feedback-msg.wrong {
  color: #ff4d4f;
}

.item-detail {
  background: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.en-detail {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
}

.zh-detail {
  font-size: 16px;
  color: #666;
  margin-bottom: 8px;
}

.ph-detail {
  font-size: 14px;
  color: #999;
  margin-bottom: 8px;
}

.ex-detail {
  font-size: 14px;
  color: #666;
  font-style: italic;
  margin-top: 12px;
}

.ex-zh-detail {
  font-size: 13px;
  color: #999;
}

.next-btn {
  width: 100%;
  height: 48px;
  font-size: 18px;
}

.result-screen {
  padding: 40px 20px;
  text-align: center;
}

.result-screen h2 {
  font-size: 28px;
  margin-bottom: 32px;
}

.result-stats {
  display: flex;
  justify-content: center;
  gap: 48px;
  margin-bottom: 32px;
}

.result-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.result-value {
  font-size: 48px;
  font-weight: 700;
}

.result-value.correct {
  color: #52c41a;
}

.result-value.wrong {
  color: #ff4d4f;
}

.result-label {
  font-size: 16px;
  color: #666;
  margin-top: 8px;
}

.wrong-list {
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin: 24px 0;
  text-align: left;
}

.wrong-list h3 {
  margin-bottom: 16px;
}

.wrong-item {
  padding: 12px;
  background: #fff1f0;
  border-left: 3px solid #ff4d4f;
  margin-bottom: 8px;
  border-radius: 4px;
}

.result-screen .btn {
  width: 100%;
  margin-top: 12px;
  height: 48px;
  font-size: 16px;
}
</style>
