// 语音功能：朗读、识别、录音
import { store } from './store'

// ========== 语音朗读 (TTS) ==========
// 优先用有道词典在线发音（国内可访问，不依赖手机朗读引擎），失败时用手机自带朗读
const hasSystemTTS = () => 'speechSynthesis' in window

// 手机自带的英文语音（有的浏览器一开始返回空列表，之后才加载好）
export const getSystemEnglishVoices = () => {
  if (!hasSystemTTS()) return []
  return speechSynthesis.getVoices().filter(v => v.lang.replace('_', '-').toLowerCase().startsWith('en'))
}

let audio = null

const speakOnline = (text, rate) => {
  if (audio) audio.pause()
  // type=2 美式发音
  audio = new Audio(`https://dict.youdao.com/dictvoice?type=2&audio=${encodeURIComponent(text)}`)
  audio.playbackRate = rate
  return new Promise((resolve, reject) => {
    audio.onended = resolve
    audio.onerror = () => reject(new Error('online_tts_failed'))
    audio.play().catch(reject)
  })
}

const speakSystem = (text, rate) => {
  if (!hasSystemTTS()) return Promise.reject(new Error('no_system_tts'))
  speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = rate
  const voice = getSystemEnglishVoices().find(v => v.lang.replace('_', '-') === 'en-US') || getSystemEnglishVoices()[0]
  if (voice) utterance.voice = voice
  return new Promise((resolve, reject) => {
    utterance.onend = resolve
    utterance.onerror = (e) => reject(new Error(e.error || 'system_tts_failed'))
    // 不能先 await 再调用，否则部分浏览器认为不是用户点击触发，直接静音
    speechSynthesis.speak(utterance)
  })
}

// 朗读文本。settings.ttsEngine: 'online' 在线发音（默认）| 'system' 手机自带
export const speak = async (text, options = {}) => {
  if (!text) return
  const rate = options.rate ?? store.settings.speechRate

  if (store.settings.ttsEngine === 'system') {
    return speakSystem(text, rate)
  }
  try {
    await speakOnline(text, rate)
  } catch (err) {
    // 没网或接口不可用时退回手机自带朗读
    if (!hasSystemTTS()) throw err
    return speakSystem(text, rate)
  }
}

// ========== 语音识别 (STT) ==========
export const isSpeechRecognitionSupported = () => {
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition)
}

// 开始语音识别
export const startRecognition = () => {
  return new Promise((resolve, reject) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      reject(new Error('not_supported'))
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.maxAlternatives = 3

    let resolved = false

    recognition.onresult = (event) => {
      if (resolved) return
      resolved = true

      const results = []
      for (let i = 0; i < event.results[0].length; i++) {
        results.push({
          transcript: event.results[0][i].transcript,
          confidence: event.results[0][i].confidence
        })
      }
      resolve(results)
    }

    recognition.onerror = (event) => {
      if (resolved) return
      resolved = true
      reject(new Error(event.error))
    }

    recognition.onend = () => {
      if (!resolved) {
        resolved = true
        reject(new Error('no_speech'))
      }
    }

    try {
      recognition.start()
    } catch (err) {
      reject(err)
    }
  })
}

// ========== 发音评分 ==========
// 文本标准化
const normalize = (text) => {
  return text.toLowerCase()
    .replace(/[^\w\s]/g, '') // 去除标点
    .replace(/\s+/g, ' ')
    .trim()
}

// 编辑距离（字符级）
const levenshtein = (a, b) => {
  const matrix = []
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i]
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        )
      }
    }
  }
  return matrix[b.length][a.length]
}

// 相似度评分（0-100）
export const scoreSimilarity = (target, heard) => {
  const t = normalize(target)
  const h = normalize(heard)

  if (t === h) return 100

  const maxLen = Math.max(t.length, h.length)
  if (maxLen === 0) return 0

  const dist = levenshtein(t, h)
  const similarity = (1 - dist / maxLen) * 100

  return Math.max(0, Math.round(similarity))
}

// 判断是否通过（单词80%，句子70%）
export const isPassed = (target, heard) => {
  const score = scoreSimilarity(target, heard)
  const words = normalize(target).split(' ')
  const threshold = words.length > 1 ? 70 : 80
  return score >= threshold
}

// ========== 录音 (Fallback) ==========
export const isRecordingSupported = () => {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia && window.MediaRecorder)
}

let mediaRecorder = null
let audioChunks = []

export const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    audioChunks = []
    mediaRecorder = new MediaRecorder(stream)

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data)
    }

    mediaRecorder.start()

    return {
      stop: () => {
        return new Promise((resolve) => {
          mediaRecorder.onstop = () => {
            const blob = new Blob(audioChunks, { type: 'audio/webm' })
            const url = URL.createObjectURL(blob)
            stream.getTracks().forEach(track => track.stop())
            resolve(url)
          }
          mediaRecorder.stop()
        })
      }
    }
  } catch (err) {
    throw new Error('mic_denied')
  }
}
