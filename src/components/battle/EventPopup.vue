<template>
  <Transition name="fade">
    <div v-if="show" class="event-popup fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="onClose"></div>
      <div
        class="relative bg-gradient-to-br from-purple-900/90 to-pink-900/90 p-6 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300"
        :class="{ 'scale-100': show, 'scale-95': !show }">
        <div
          class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl">
        </div>
        <div class="relative z-10">
          <h3
            class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
            {{ title }}
          </h3>
          <p class="text-white/90 mb-6">{{ content }}</p>
          <div class="flex justify-end gap-4">
            <button v-if="showCancel" @click="onCancel"
              class="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
              取消
            </button>
            <button @click="onConfirm"
              class="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 rounded-lg transition-all transform hover:scale-105 active:scale-95">
              确认
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
  title: string
  content: string
  showCancel?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}>()

const onClose = () => {
  emit('close')
}

const onConfirm = () => {
  emit('confirm')
}

const onCancel = () => {
  emit('cancel')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>