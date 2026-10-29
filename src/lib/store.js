// 数据存储与复习算法（localStorage + SRS间隔重复）
import { reactive, watch } from 'vue'
import { words, wordCategories } from '../data/words'
import { phrases, phraseScenes } from '../data/phrases'
import { phonetics, phoneticGroups } from '../data/phonetics'
import { grammarQuestions, grammarTopics } from '../data/grammar'

const STORAGE_KEY = 'english_learning_data'
const BOX_INTERVALS = [0, 1, 2, 4, 7, 15, 30] // 天数

// 获取今天日期字符串 YYYY-MM-DD
const today = () => new Date().toISOString().split('T')[0]

// 加载存储
const loadStorage = () => {
  try {
    const str = localStorage.getItem(STORAGE_KEY)
    return str ? JSON.parse(str) : null
  } catch {
    return null
  }
}

// 初始状态
const defaultState = {
  // 进度：{ [type:id]: { box, due, right, wrong, inWrong } }
  progress: {},
  // 自定义词汇/句子：{ id, type:'word'|'phrase', en, zh, ph?, note?, tags? }
  custom: [],
  customIdCounter: 1,
  // 设置
  settings: {
    speechRate: 0.9,
    voiceName: '', // 空表示默认
    ttsEngine: 'online', // 'online' 有道在线发音 | 'system' 手机自带朗读
    sttMode: 'auto', // 'auto' | 'record'
  },
  // 统计：{ date: { right, wrong } }
  dailyStats: {},
}

const saved = loadStorage() || {}
export const store = reactive({
  ...defaultState,
  ...saved,
  settings: { ...defaultState.settings, ...saved.settings },
})

// 自动保存
watch(store, () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}, { deep: true })

// ========== 数据源映射 ==========
const allWords = words.map((w, i) => ({ ...w, _key: `w:${i}`, _type: 'word' }))
const allPhrases = phrases.map((p, i) => ({ ...p, _key: `p:${i}`, _type: 'phrase' }))
const allPhonetics = phonetics.map((ph, i) => ({ ...ph, _key: `ph:${i}`, _type: 'phonetic' }))
const allGrammar = grammarQuestions.map(g => ({ ...g, _key: `g:${g.id}`, _type: 'grammar' }))

// 自定义内容动态加 _key
export const getCustomItems = () => store.custom.map(c => ({ ...c, _key: `c:${c.id}`, _type: c.type }))

export const getAllVocab = () => [...allWords, ...allPhrases, ...getCustomItems()]

// ========== 进度管理 ==========
// 记录一次练习结果
export const recordAnswer = (key, correct) => {
  const p = store.progress[key] || { box: 0, due: today(), right: 0, wrong: 0, inWrong: false }
  const todayStr = today()

  if (correct) {
    p.right++
    // 只有到期才能升级box
    if (p.due <= todayStr) {
      p.box = Math.min(p.box + 1, BOX_INTERVALS.length - 1)
      const interval = BOX_INTERVALS[p.box]
      const nextDate = new Date()
      nextDate.setDate(nextDate.getDate() + interval)
      p.due = nextDate.toISOString().split('T')[0]
      // 连续答对3次且box>=4，移出错题本
      if (p.box >= 4 && p.right >= 3) {
        p.inWrong = false
      }
    }
  } else {
    p.wrong++
    p.box = 0
    p.due = todayStr
    p.inWrong = true
  }

  store.progress[key] = p

  // 记录今日统计
  const stats = store.dailyStats[todayStr] || { right: 0, wrong: 0 }
  if (correct) stats.right++
  else stats.wrong++
  store.dailyStats[todayStr] = stats
}

// 获取某项进度
export const getProgress = (key) => store.progress[key]

// 获取到期复习项
export const getDueItems = () => {
  const todayStr = today()
  const all = [...allWords, ...allPhrases, ...allGrammar, ...getCustomItems()]
  return all.filter(item => {
    const p = store.progress[item._key]
    if (!p) return false // 没学过的不算待复习
    return p.due <= todayStr
  })
}

// 获取错题本项
export const getWrongItems = () => {
  const all = [...allWords, ...allPhrases, ...allGrammar, ...getCustomItems()]
  return all.filter(item => store.progress[item._key]?.inWrong)
}

// 获取学习连续天数
export const getStreak = () => {
  const dates = Object.keys(store.dailyStats).sort().reverse()
  if (!dates.length) return 0
  let streak = 0
  let checkDate = new Date()
  for (let i = 0; i < 365; i++) {
    const dateStr = checkDate.toISOString().split('T')[0]
    if (store.dailyStats[dateStr]) {
      streak++
    } else if (i > 0) {
      break
    }
    checkDate.setDate(checkDate.getDate() - 1)
  }
  return streak
}

// ========== 自定义内容管理 ==========
export const addCustom = (item) => {
  const id = store.customIdCounter++
  store.custom.push({ id, ...item })
  return id
}

export const updateCustom = (id, updates) => {
  const idx = store.custom.findIndex(c => c.id === id)
  if (idx >= 0) {
    store.custom[idx] = { ...store.custom[idx], ...updates }
  }
}

export const deleteCustom = (id) => {
  store.custom = store.custom.filter(c => c.id !== id)
  // 删除进度
  delete store.progress[`c:${id}`]
}

// ========== 备份与恢复 ==========
export const exportData = () => {
  return JSON.stringify(store, null, 2)
}

export const importData = (jsonStr) => {
  try {
    const data = JSON.parse(jsonStr)
    // 简单校验
    if (data.progress && data.custom && data.settings) {
      Object.assign(store, data)
      return true
    }
    return false
  } catch {
    return false
  }
}

// ========== 辅助函数 ==========
export const shuffle = (arr) => {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export { words, phrases, phonetics, grammarQuestions, wordCategories, phraseScenes, phoneticGroups, grammarTopics, allWords, allPhrases, allGrammar }
