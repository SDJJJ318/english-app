<template>
  <div id="app">
    <router-view />
    <nav v-if="!hideTab" class="bottom-nav">
      <router-link to="/" class="nav-item">
        <span class="icon">🏠</span>
        <span>首页</span>
      </router-link>
      <router-link to="/wrong" class="nav-item">
        <span class="icon">📕</span>
        <span>错题本</span>
      </router-link>
      <router-link to="/custom" class="nav-item">
        <span class="icon">➕</span>
        <span>我的词库</span>
      </router-link>
      <router-link to="/settings" class="nav-item">
        <span class="icon">⚙️</span>
        <span>设置</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const hideTab = computed(() => route.meta.hideTab)
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  background: #f5f5f5;
  padding-bottom: env(safe-area-inset-bottom);
}

#app {
  min-height: 100vh;
  padding-bottom: 70px;
}

.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: white;
  border-top: 1px solid #e0e0e0;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 100;
}

.nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #999;
  font-size: 12px;
  transition: color 0.2s;
}

.nav-item.router-link-active {
  color: #1890ff;
}

.nav-item .icon {
  font-size: 24px;
  margin-bottom: 4px;
}

.container {
  padding: 16px;
  max-width: 600px;
  margin: 0 auto;
}

.page-header {
  background: white;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  background: #1890ff;
  color: white;
}

.btn:active {
  transform: scale(0.95);
}

.btn-primary {
  background: #1890ff;
}

.btn-success {
  background: #52c41a;
}

.btn-danger {
  background: #ff4d4f;
}

.btn-outline {
  background: white;
  border: 1px solid #d9d9d9;
  color: #333;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 16px;
}

input:focus, textarea:focus {
  outline: none;
  border-color: #1890ff;
}

.form-group {
  margin-bottom: 16px;
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}
</style>
