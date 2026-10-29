<template>
  <div class="custom-page">
    <div class="page-header">
      <h1 class="page-title">我的词库</h1>
      <p class="subtitle">{{ customItems.length }} 个自定义内容</p>
    </div>

    <div class="container">
      <div class="add-form card">
        <h3>添加新内容</h3>
        <div class="form-group">
          <label class="form-label">英文 *</label>
          <input v-model="newItem.en" placeholder="单词或句子" />
        </div>
        <div class="form-group">
          <label class="form-label">中文 *</label>
          <input v-model="newItem.zh" placeholder="中文意思" />
        </div>
        <div class="form-group">
          <label class="form-label">音标（可选）</label>
          <input v-model="newItem.ph" placeholder="/ˈeksəmpl/" />
        </div>
        <div class="form-group">
          <label class="form-label">备注（可选）</label>
          <textarea v-model="newItem.note" rows="2" placeholder="例句或用法说明"></textarea>
        </div>
        <button class="btn btn-primary" @click="addItem">添加</button>
      </div>

      <div v-if="customItems.length > 0" class="start-bar">
        <button class="mode-btn" @click="startPractice('mix')">📝 混合</button>
        <button class="mode-btn" @click="startPractice('listen')">👂 听力</button>
        <button class="mode-btn" @click="startPractice('speak')">🗣 口语</button>
      </div>

      <div v-if="customItems.length === 0" class="empty-state">
        <p>还没有自定义内容，快添加一个吧！</p>
      </div>

      <div v-else class="custom-list">
        <div v-for="item in customItems" :key="item.id" class="custom-card">
          <div class="custom-main" @click="playItem(item)">
            <p class="custom-en">{{ item.en }}</p>
            <p class="custom-zh">{{ item.zh }}</p>
            <p v-if="item.note" class="custom-note">{{ item.note }}</p>
          </div>
          <div class="custom-actions">
            <button class="icon-btn" @click="playItem(item)">🔊</button>
            <button class="icon-btn" @click="deleteItem(item.id)">🗑️</button>
          </div>
        </div>
      </div>

      <div class="backup-section card">
        <h3>数据备份</h3>
        <p class="backup-tip">定期备份数据，防止意外丢失</p>
        <button class="btn btn-outline" @click="exportBackup">导出备份</button>
        <button class="btn btn-outline" @click="triggerImport">导入备份</button>
        <input ref="fileInput" type="file" accept=".json" @change="importBackup" style="display: none" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { store, addCustom, deleteCustom, getCustomItems, exportData, importData } from '../lib/store'
import { speak } from '../lib/speech'

const router = useRouter()

const customItems = computed(() => getCustomItems())

const newItem = ref({
  en: '',
  zh: '',
  ph: '',
  note: ''
})

const addItem = () => {
  if (!newItem.value.en.trim() || !newItem.value.zh.trim()) {
    alert('请填写英文和中文')
    return
  }

  const type = newItem.value.en.split(/\s+/).length > 3 ? 'phrase' : 'word'

  addCustom({
    type,
    en: newItem.value.en.trim(),
    zh: newItem.value.zh.trim(),
    ph: newItem.value.ph.trim(),
    note: newItem.value.note.trim(),
  })

  newItem.value = { en: '', zh: '', ph: '', note: '' }
  alert('添加成功！')
}

const deleteItem = (id) => {
  if (confirm('确定删除这个内容吗？')) {
    deleteCustom(id)
  }
}

const playItem = async (item) => {
  try {
    await speak(item.en)
  } catch (err) {
    console.error('播放失败', err)
  }
}

const startPractice = (mode) => {
  const items = customItems.value.slice(0, 10)
  if (items.length === 0) {
    alert('还没有自定义内容')
    return
  }
  router.push({
    name: 'Practice',
    query: {
      items: JSON.stringify(items.map(i => i._key)),
      mode
    }
  })
}

const exportBackup = () => {
  const data = exportData()
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `英语学习备份_${new Date().toISOString().split('T')[0]}.json`
  a.click()
  URL.revokeObjectURL(url)
}

const fileInput = ref(null)

const triggerImport = () => {
  fileInput.value.click()
}

const importBackup = (event) => {
  const file = event.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    const success = importData(e.target.result)
    if (success) {
      alert('导入成功！')
      location.reload()
    } else {
      alert('导入失败，文件格式不正确')
    }
  }
  reader.readAsText(file)
}
</script>

<style scoped>
.custom-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.page-header {
  background: linear-gradient(135deg, #52c41a 0%, #73d13d 100%);
  padding: 40px 20px;
  color: white;
  text-align: center;
}

.add-form {
  margin-bottom: 20px;
}

.add-form h3 {
  margin-bottom: 16px;
}

.start-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}

.mode-btn {
  flex: 1;
  padding: 12px;
  background: white;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #999;
}

.custom-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.custom-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.custom-main {
  flex: 1;
  cursor: pointer;
}

.custom-en {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 6px;
}

.custom-zh {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.custom-note {
  font-size: 13px;
  color: #999;
  font-style: italic;
}

.custom-actions {
  display: flex;
  gap: 8px;
}

.icon-btn {
  width: 40px;
  height: 40px;
  background: #f5f5f5;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
}

.backup-section {
  margin-top: 20px;
}

.backup-section h3 {
  margin-bottom: 8px;
}

.backup-tip {
  font-size: 14px;
  color: #999;
  margin-bottom: 16px;
}

.backup-section .btn {
  width: 100%;
  margin-bottom: 12px;
}
</style>
