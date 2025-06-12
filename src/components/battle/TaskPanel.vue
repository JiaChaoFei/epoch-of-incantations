<template>
  <div class="task-panel bg-white/5 backdrop-blur-sm rounded-2xl p-4 h-full">
    <h3 class="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
      任务列表
    </h3>
    <div class="space-y-4">
      <div v-for="(task, index) in tasks" :key="index"
        class="task-item bg-white/10 rounded-lg p-3 transition-all duration-300 hover:bg-white/15">
        <div class="flex items-center justify-between mb-2">
          <span class="text-white/90 font-medium">{{ task.title }}</span>
          <span class="text-white/60 text-sm">{{ task.reward }}</span>
        </div>
        <p class="text-white/70 text-sm mb-2">{{ task.description }}</p>
        <div class="flex items-center gap-2">
          <div class="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div class="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
              :style="{ width: task.progress + '%' }">
            </div>
          </div>
          <span class="text-white/60 text-xs">{{ task.progress }}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Task {
  title: string
  description: string
  reward: string
  progress: number
}

defineProps<{
  tasks: Task[]
}>()
</script>

<style scoped>
.task-panel {
  min-width: 300px;
  max-width: 400px;
}
</style>