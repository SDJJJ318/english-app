// 语音功能：朗读、识别、录音
import { store } from './store'

// ========== 语音朗读 (TTS) ==========
// 内置内容的发音已预先下载到 public/audio/（见 scripts/fetch-audio.mjs），
// 播放本地文件最稳定；自定义内容没有预录音频，用手机自带朗读
import { audioKey } from './audioKey'
import audioIndex from '../data/audioIndex.json'

const recorded = new Set(audioIndex)
const hasSystemTTS = () => 'speechSynthesis' in window

// 手机自带的英文语音
export const getSystemEnglishVoices = () => {
  if (!hasSystemTTS()) return []
  return speechSynthesis.getVoices().filter(v => v.lang.replace('_', '-').toLowerCase().startsWith('en'))
}

let audio = null

const speakRecorded = (key, rate) => {
  if (audio) audio.pause()
  audio = new Audio(`${import.meta.env.BASE_URL}audio/${key}.mp3`)
  audio.playbackRate = rate
  return new Promise((resolve, reject) => {
    audio.onended = resolve
    audio.onerror = () => reject(new Error('audio_failed'))
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
    speechSynthesis.speak(utterance)
  })
}

// 朗读文本。settings.ttsEngine: 'online' 优先内置录音（默认）| 'system' 只用手机自带
export const speak = async (text, options = {}) => {
  if (!text) return
  const rate = options.rate ?? store.settings.speechRate
  const key = audioKey(text)

  // 必须在点击时同步决定用哪种方式，否则部分手机会静音
  if (store.settings.ttsEngine === 'system' || !recorded.has(key)) {
    return speakSystem(text, rate)
  }
  try {
    await speakRecorded(key, rate)
  } catch (err) {
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
