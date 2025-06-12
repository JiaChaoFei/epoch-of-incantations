<template>
  <div class="input-area">
    <div class="mb-4" v-if="isResponding">
      <div class="flex items-center justify-between mb-1">
        <span class="text-white/60 text-sm">响应时间</span>
        <span class="text-white/80 text-sm">{{ responseTime }}s</span>
      </div>
      <div class="h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
          :style="{ width: responseProgress + '%' }">
        </div>
      </div>
    </div>
    <div class="flex gap-4">
      <div class="flex-1 relative">
        <input v-model="incantation" @keyup.enter="onCast" type="text" placeholder="输入你的言灵..."
          class="w-full px-6 py-3 bg-white/10 border border-purple-500/30 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-base"
          :disabled="isDisabled" />
        <div class="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
          <span class="i-carbon-magic-wand text-xl"></span>
        </div>
      </div>
      <button @click="onCast"
        class="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:opacity-90 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-base"
        :disabled="isDisabled">
        <span class="i-carbon-send text-lg"></span>
        释放
      </button>
    </div>
    <div class="mt-4 text-center text-white/40 text-sm">
      {{ currentTurn === 'player1' ? '玩家1' : '玩家2' }} 的回合
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  isResponding: boolean
  responseTime: number
  responseProgress: number
  currentTurn: 'player1' | 'player2'
  isDisabled: boolean
}>()

const emit = defineEmits<{
  (e: 'cast', incantation: string): void
}>()

const incantation = ref('')

const onCast = () => {
  if (!incantation.value.trim()) return
  emit('cast', incantation.value)
  incantation.value = ''
}
</script>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}
</style>