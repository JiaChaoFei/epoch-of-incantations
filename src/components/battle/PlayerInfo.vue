<template>
  <div class="player-info flex-1">
    <div class="text-xl font-semibold mb-2" :class="isPlayer2 ? 'text-pink-400' : 'text-purple-400'">
      {{ isPlayer2 ? '玩家2' : '玩家1' }}
    </div>
    <div class="space-y-2">
      <!-- 生命值 -->
      <div>
        <div class="flex items-center justify-between mb-1">
          <span class="text-white/60 text-sm">生命值</span>
          <span class="text-white/80 text-sm">{{ health }}/100</span>
        </div>
        <div class="h-2 bg-gray-700/50 rounded-full overflow-hidden">
          <div class="h-full rounded-full transition-all duration-300"
            :class="isPlayer2 ? 'bg-gradient-to-r from-pink-500 to-pink-600' : 'bg-gradient-to-r from-purple-500 to-purple-600'"
            :style="{ width: health + '%' }">
          </div>
        </div>
      </div>
      <!-- 灵感值 -->
      <div>
        <div class="flex items-center justify-between mb-1">
          <span class="text-white/60 text-sm">灵感值</span>
          <span class="text-white/80 text-sm">{{ inspiration }}/100</span>
        </div>
        <div class="h-2 bg-gray-700/50 rounded-full overflow-hidden">
          <div class="h-full rounded-full transition-all duration-300"
            :class="isPlayer2 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-blue-500 to-blue-600'"
            :style="{ width: inspiration + '%' }">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isPlayer2: boolean
  health: number
  inspiration: number
}>()
</script>

<style scoped>
.health-bar {
  position: relative;
  overflow: hidden;
}

.health-bar::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}
</style>