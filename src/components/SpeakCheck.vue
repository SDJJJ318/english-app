<template>
  <div class="speak-check">
    <button class="demo-btn" @click="playDemo">🔊 听示范</button>

    <div v-if="mode === 'auto'" class="auto-mode">
      <button v-if="state === 'idle'" class="record-btn" @click="startListen">
        🎤 开始跟读
      </button>
      <div v-else-if="state === 'listening'" class="listening">
        <div class="pulse"></div>
        <p>正在听...</p>
      </div>
      <div v-else-if="state === 'result'" class="result">
        <p class="heard-text">识别：{{ heardText }}</p>
        <p class="score" :class="{ pass: passed, fail: !passed }">
          得分：{{ score }} / 100 {{ passed ? '✓' : '✗' }}
        </p>
        <button class="btn btn-outline" @click="retry">重试</button>
      </div>
      <p v-if="error" class="error-msg">{{ errorMsg }}</p>
    </div>

    <div v-else class="record-mode">
      <button v-if="!recording && !recordedUrl" class="record-btn" @click="startRecord">
        🎤 按住录音
      </button>
      <button v-else-if="recording" class="record-btn recording" @click="stopRecord">
        ⏹ 停止录音
      </button>
      <div v-else-if="recordedUrl" class="playback">
        <audio :src="recordedUrl" controls></audio>
        <div class="self-check">
          <p>听听自己的发音，判断：</p>
          <button class="btn btn-success" @click="markCorrect">读对了</button>
          <button class="btn btn-outline" @click="markWrong">没读好</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { speak, startRecognition, isSpeechRecognitionSupported, startRecording, isRecordingSupported, scoreSimilarity, isPassed } from '../lib/speech'
import { store } from '../lib/store'

const props = defineProps({
  text: { type: String, required: true }
})

const emit = defineEmits(['result'])

const mode = ref(store.settings.sttMode)
const state = ref('idle')
const heardText = ref('')
const score = ref(0)
const passed = ref(false)
const error = ref(false)
const recording = ref(false)
const recordedUrl = ref('')
const recorder = ref(null)

const errorMsg = computed(() => {
  if (!error.value) return ''
  if (error.value === 'not_supported') return '您的浏览器不支持语音识别'
  if (error.value === 'not-allowed') return '需要麦克风权限'
  if (error.value === 'no_speech') return '没有检测到语音，请重试'
  if (error.value === 'network') return '网络错误，已切换到录音模式'
  return '识别失败，请重试'
})

const playDemo = async () => {
  try {
    await speak(props.text)
  } catch (err) {
    console.error('播放失败', err)
  }
}

const startListen = async () => {
  if (!isSpeechRecognitionSupported()) {
    error.value = 'not_supported'
    mode.value = 'record'
    store.settings.sttMode = 'record'
    return
  }

  state.value = 'listening'
  error.value = false

  try {
    const results = await startRecognition()
    const heard = results[0].transcript
    heardText.value = heard
    score.value = scoreSimilarity(props.text, heard)
    passed.value = isPassed(props.text, heard)
    state.value = 'result'

    emit('result', { passed: passed.value, score: score.value, heard })
  } catch (err) {
    error.value = err.message
    state.value = 'idle'

    if (err.message === 'network' || err.message === 'service-not-allowed') {
      mode.value = 'record'
      store.settings.sttMode = 'record'
    }
  }
}

const retry = () => {
  state.value = 'idle'
  heardText.value = ''
  score.value = 0
  passed.value = false
  error.value = false
}

const startRecord = async () => {
  if (!isRecordingSupported()) {
    alert('您的浏览器不支持录音功能')
    return
  }

  try {
    recorder.value = await startRecording()
    recording.value = true
  } catch (err) {
    if (err.message === 'mic_denied') {
      alert('需要麦克风权限才能录音')
    } else {
      alert('录音失败')
    }
  }
}

const stopRecord = async () => {
  if (recorder.value) {
    const url = await recorder.value.stop()
    recordedUrl.value = url
    recording.value = false
  }
}

const markCorrect = () => {
  emit('result', { passed: true, score: 100, heard: props.text })
  recordedUrl.value = ''
}

const markWrong = () => {
  emit('result', { passed: false, score: 0, heard: '' })
  recordedUrl.value = ''
}
</script>

<style scoped>
.speak-check {
  margin: 20px 0;
}

.demo-btn {
  display: block;
  width: 100%;
  padding: 12px;
  background: #f0f0f0;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 16px;
}

.record-btn {
  display: block;
  width: 100%;
  padding: 20px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.2s;
}

.record-btn:active {
  transform: scale(0.95);
}

.record-btn.recording {
  background: #ff4d4f;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.listening {
  text-align: center;
  padding: 20px;
}

.pulse {
  width: 60px;
  height: 60px;
  background: #1890ff;
  border-radius: 50%;
  margin: 0 auto 16px;
  animation: pulse-grow 1s infinite;
}

@keyframes pulse-grow {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
}

.result {
  background: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
}

.heard-text {
  font-size: 16px;
  margin-bottom: 12px;
  color: #666;
}

.score {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
}

.score.pass {
  color: #52c41a;
}

.score.fail {
  color: #ff4d4f;
}

.error-msg {
  color: #ff4d4f;
  font-size: 14px;
  margin-top: 12px;
  text-align: center;
}

.playback {
  text-align: center;
}

.playback audio {
  width: 100%;
  margin-bottom: 16px;
}

.self-check p {
  margin-bottom: 12px;
  color: #666;
}

.self-check button {
  width: 48%;
  margin: 4px 1%;
}
</style>
