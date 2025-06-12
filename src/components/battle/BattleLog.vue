<template>
  <div
    class="battle-log mb-8 h-[calc(100vh-450px)] min-h-[350px] overflow-y-auto p-4 bg-black/20 rounded-lg backdrop-blur-sm">
    <div v-for="(message, index) in messages" :key="index"
      class="message mb-3 p-3 rounded-lg transform transition-all duration-300 hover:scale-[1.02]" :class="[
        message.type === 'player1' ? 'bg-purple-500/20 border border-purple-500/30' :
          message.type === 'player2' ? 'bg-pink-500/20 border border-pink-500/30' :
            'bg-blue-500/20 border border-blue-500/30',
        'animate-slide-in'
      ]">
      <div class="flex items-center gap-2 mb-1">
        <span class="font-semibold text-base" :class="message.type === 'player1' ? 'text-purple-400' :
          message.type === 'player2' ? 'text-pink-400' :
            'text-blue-400'
          ">
          {{ message.type === 'player1' ? '玩家1' :
            message.type === 'player2' ? '玩家2' :
              '系统' }}
        </span>
        <span class="text-white/40 text-xs">{{ new Date().toLocaleTimeString() }}</span>
      </div>
      <p class="text-white/90 text-base">{{ message.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface BattleMessage {
  type: 'player1' | 'player2' | 'system'
  text: string
}

defineProps<{
  messages: BattleMessage[]
}>()
</script>

<style scoped>
.battle-log::-webkit-scrollbar {
  width: 6px;
}

.battle-log::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.battle-log::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 3px;
}

.battle-log::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out forwards;
}
</style>