<template>
  <div class="battle-header mb-8 text-center">
    <h2 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
      PVP 言灵对战
    </h2>
    <div class="flex justify-between items-center mt-6">
      <PlayerInfo :is-player2="false" :health="player1Health" :inspiration="player1Inspiration" />
      <div
        class="vs-badge px-8 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-purple-300 font-bold text-2xl mx-6 relative">
        <span class="relative z-10">VS</span>
        <div class="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full animate-pulse">
        </div>
      </div>

      <PlayerInfo :is-player2="true" :health="player2Health" :inspiration="player2Inspiration" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayerInfo from './PlayerInfo.vue'

defineProps<{
  player1Health: number
  player2Health: number
  player1Inspiration: number
  player2Inspiration: number
}>()
</script>