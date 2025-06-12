<template>
  <div
    class="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 text-white font-sans relative overflow-hidden">
    <!-- 背景动画效果 -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -inset-[10px] opacity-50">
        <div
          class="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob">
        </div>
        <div
          class="absolute top-0 -right-4 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000">
        </div>
        <div
          class="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000">
        </div>
      </div>
    </div>

    <!-- 返回按钮 -->
    <div class="absolute top-6 left-6 z-10">
      <router-link to="/"
        class="px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2 group border border-white/10">
        <span class="i-carbon-arrow-left text-lg group-hover:-translate-x-1 transition-transform"></span>
        返回主页
      </router-link>
    </div>

    <!-- 主要内容 -->
    <div class="flex-1 flex flex-col items-center justify-center relative z-10 px-4">
      <!-- 标题和状态 -->
      <div class="text-center mb-12 relative">
        <div
          class="absolute -top-20 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl">
        </div>
        <h2
          class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-6 relative">
          寻找对手中
        </h2>
        <p class="text-white/70 text-xl font-medium tracking-wide">{{ matchStatus }}</p>
      </div>

      <!-- 画布容器 -->
      <div class="canvas-container w-[600px] h-[400px] relative backdrop-blur-sm">
        <div class="absolute inset-0 flex items-center justify-center">
          <div class="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <!-- 取消按钮 -->
      <div class="mt-12">
        <button @click="cancelMatch" class="group px-10 py-3.5 text-xl font-medium bg-gradient-to-r from-purple-500 to-pink-500 rounded-full 
          transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30
          active:scale-95 relative overflow-hidden">
          <span class="relative z-10">取消匹配</span>
          <div
            class="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const matchStatus = ref('正在寻找合适的对手...')

// 模拟匹配过程
const simulateMatchmaking = () => {
  const statuses = [
    '正在寻找合适的对手...',
    '正在分析对手实力...',
    '正在建立对战连接...',
    '匹配成功！正在进入对战...'
  ]
  let currentStatus = 0
  matchStatus.value = statuses[currentStatus] // 初始化第一个状态

  const interval = setInterval(() => {
    currentStatus++
    if (currentStatus >= statuses.length) {
      clearInterval(interval)
      // 模拟匹配成功，跳转到对战页面
      setTimeout(() => {
        router.push('/battle')
      }, 1000)
    } else {
      matchStatus.value = statuses[currentStatus]
    }
  }, 2000)
}

// 取消匹配
const cancelMatch = () => {
  router.push('/')
}

onMounted(() => {
  simulateMatchmaking()
})

onUnmounted(() => {

})
</script>

<style scoped>
.canvas-container {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 1.5rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.canvas-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.loading-dots {
  display: flex;
  gap: 0.75rem;
}

.loading-dots span {
  width: 1rem;
  height: 1rem;
  background: linear-gradient(to right, #9F7AEA, #EC4899);
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
  box-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
}

.loading-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {

  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }

  40% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }

  33% {
    transform: translate(30px, -50px) scale(1.1);
  }

  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }

  100% {
    transform: translate(0px, 0px) scale(1);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .canvas-container {
    width: 90vw;
    height: 300px;
  }

  h2 {
    font-size: 2rem;
  }

  p {
    font-size: 1rem;
  }
}
</style>