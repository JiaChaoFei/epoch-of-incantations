<template>
  <div class="character-card p-4 rounded-xl backdrop-blur-sm transition-all duration-300" :class="[
    isPlayer2 ? 'bg-pink-500/10 border border-pink-500/20' : 'bg-purple-500/10 border border-purple-500/20',
    { 'hit-effect': isHit, 'shine-effect': !isHit }
  ]">
    <div class="flex items-center gap-4">
      <!-- 角色头像 -->
      <div class="relative">
        <div class="w-16 h-16 rounded-full overflow-hidden border-2"
          :class="isPlayer2 ? 'border-pink-500/30' : 'border-purple-500/30'">
          <img :src="avatar" alt="角色头像" class="w-full h-full object-cover" />
        </div>
        <div
          class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-xs font-bold text-white">
          {{ level }}
        </div>
      </div>

      <!-- 角色信息 -->
      <div class="flex-1">
        <div class="flex items-center justify-between mb-1">
          <h3 class="text-lg font-semibold" :class="isPlayer2 ? 'text-pink-400' : 'text-purple-400'">
            {{ name }}
          </h3>
          <span class="text-sm px-2 py-0.5 rounded-full"
            :class="isPlayer2 ? 'bg-pink-500/20 text-pink-300' : 'bg-purple-500/20 text-purple-300'">
            {{ title }}
          </span>
        </div>
        <p class="text-white/60 text-sm">{{ description }}</p>
      </div>
    </div>

    <!-- 角色属性 -->
    <div class="mt-4 grid grid-cols-2 gap-3">
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="i-carbon-magic-wand text-lg" :class="isPlayer2 ? 'text-pink-400' : 'text-purple-400'"></span>
          <span class="text-sm text-white/60">魔法强度</span>
        </div>
        <div class="h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
          <div class="h-full rounded-full transition-all duration-300"
            :class="isPlayer2 ? 'bg-gradient-to-r from-pink-500 to-pink-600' : 'bg-gradient-to-r from-purple-500 to-purple-600'"
            :style="{ width: magicPower + '%' }">
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span class="i-carbon-shield text-lg" :class="isPlayer2 ? 'text-pink-400' : 'text-purple-400'"></span>
          <span class="text-sm text-white/60">防御力</span>
        </div>
        <div class="h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
          <div class="h-full rounded-full transition-all duration-300"
            :class="isPlayer2 ? 'bg-gradient-to-r from-pink-500 to-pink-600' : 'bg-gradient-to-r from-purple-500 to-purple-600'"
            :style="{ width: defense + '%' }">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  isPlayer2: boolean
  name: string
  title: string
  level: number
  avatar: string
  description: string
  magicPower: number
  defense: number
}>()

const isHit = ref(false)

// 触发受击效果
const triggerHitEffect = () => {
  isHit.value = true
  setTimeout(() => {
    isHit.value = false
  }, 500)
}

// 暴露方法给父组件
defineExpose({
  triggerHitEffect
})
</script>

<style scoped>
.character-card {
  transform: translateY(0);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.character-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

/* 受击效果 */
.hit-effect {
  animation: hitShake 0.5s ease;
}

@keyframes hitShake {

  0%,
  100% {
    transform: translateX(0);
  }

  20% {
    transform: translateX(-5px);
  }

  40% {
    transform: translateX(5px);
  }

  60% {
    transform: translateX(-3px);
  }

  80% {
    transform: translateX(3px);
  }
}

.shine-effect::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.1),
      transparent);
  transform: skewX(-25deg);
  animation: shine 3s 0.2s;
  pointer-events: none;
}


@keyframes shine {
  0% {
    left: -100%;
  }

  20% {
    left: 100%;
  }

  100% {
    left: 100%;
  }
}

/* 属性条动画 */
.stat-item .h-full {
  position: relative;
  overflow: hidden;
}

.stat-item .h-full::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      rgba(255, 255, 255, 0.4),
      rgba(255, 255, 255, 0.2),
      transparent);
  transform: skewX(-25deg);
  animation: shine 2s infinite;
  animation-delay: 0.5s;
  pointer-events: none;
}
</style>