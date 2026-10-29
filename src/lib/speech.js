// 语音功能：朗读、识别、录音
import { store } from './store'

// ========== 语音朗读 (TTS) ==========
let voices = []
let voicesLoaded = false

// 加载可用语音
const loadVoices = () => {
  return new Promise((resolve) => {
    voices = speechSynthesis.getVoices()
    if (voices.length) {
      voicesLoaded = true
      resolve(voices)
    } else {
      speechSynthesis.onvoiceschanged = () => {
        voices = speechSynthesis.getVoices()
        voicesLoaded = true
        resolve(voices)
      }
    }
  })
}

// 获取英语语音
export const getEnglishVoices = async () => {
  if (!voicesLoaded) await loadVoices()
  return voices.filter(v => v.lang.startsWith('en'))
}

// 朗读文本
export const speak = async (text, options = {}) => {
  if (!text) return

  speechSynthesis.cancel() // 停止当前朗读

  if (!voicesLoaded) await loadVoices()

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = options.rate ?? store.settings.speechRate

  // 选择语音
  if (store.settings.voiceName) {
    const voice = voices.find(v => v.name === store.settings.voiceName)
    if (voice) utterance.voice = voice
  } else {
    // 优先选择 en-US 语音
    const enVoice = voices.find(v => v.lang === 'en-US')
    if (enVoice) utterance.voice = enVoice
  }

  return new Promise((resolve, reject) => {
    utterance.onend = resolve
    utterance.onerror = reject
    speechSynthesis.speak(utterance)
  })
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
