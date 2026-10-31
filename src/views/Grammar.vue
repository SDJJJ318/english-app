<template>
  <div class="grammar-page">
    <div class="page-header">
      <button class="back-btn" @click="$router.back()">← 返回</button>
      <h1 class="page-title">语法练习</h1>
    </div>

    <div class="container">
      <div class="topic-list">
        <div v-for="topic in grammarTopics" :key="topic.id" class="topic-card">
          <h3 class="topic-title">{{ topic.name }}</h3>
          <p class="topic-intro">{{ topic.intro }}</p>
          <button class="btn btn-primary" @click="startTopic(topic.id)">开始练习</button>
        </div>
      </div>

      <div class="mixed-practice card">
        <h3>综合练习</h3>
        <p>随机抽取各类型题目进行混合练习</p>
        <button class="btn btn-outline" @click="startMixed">10题混合练习</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { grammarTopics, allGrammar, shuffle } from '../lib/store'

const router = useRouter()

const startTopic = (topicId) => {
  const items = allGrammar.filter(q => q.topic === topicId)
  router.push({
    name: 'Practice',
    query: {
      items: JSON.stringify(items.map(q => q._key)),
      mode: 'mix'
    }
  })
}

const startMixed = () => {
  const items = shuffle(allGrammar).slice(0, 10)
  router.push({
    name: 'Practice',
    query: {
      items: JSON.stringify(items.map(q => q._key)),
      mode: 'mix'
    }
  })
}
</script>

<style scoped>
.grammar-page {
  min-height: 100vh;
  background: #f5f5f5;
}

.page-header {
  background: white;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.back-btn {
  background: none;
  border: none;
  color: #1890ff;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 8px;
}

.topic-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.topic-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.topic-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 12px;
}

.topic-intro {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 16px;
  white-space: pre-line;
}

.mixed-practice {
  margin-top: 20px;
}

.mixed-practice h3 {
  margin-bottom: 8px;
}

.mixed-practice p {
  font-size: 14px;
  color: #999;
  margin-bottom: 16px;
}

.mixed-practice .btn {
  width: 100%;
}
</style>
