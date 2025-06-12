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

    <!-- 头部区域 -->
    <header class="text-center py-12 px-4 relative z-10">
      <h1
        class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
        咒语纪元
      </h1>
      <p class="text-gray-300 mt-4 text-lg animate-fade-in">
        开启你的文字魔法冒险
      </p>
    </header>

    <!-- 主要内容区域 -->
    <main class="flex-1 max-w-4xl mx-auto px-4 py-8 relative z-10">
      <div class="text-center space-y-8">
        <div
          class="space-y-6 backdrop-blur-sm bg-white/5 p-8 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-[1.02]">
          <h2
            class="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
            欢迎来到魔法世界
          </h2>
          <div class="space-y-4">
            <p class="text-gray-300 leading-relaxed animate-slide-up">
              在这里，你的每一个文字都将化作强大的咒语，每一个选择都将改变故事的走向。
            </p>
            <p class="text-gray-300 leading-relaxed animate-slide-up animation-delay-200">
              通过输入文字来解开谜题，探索这个充满魔法的世界，发现隐藏的秘密。
            </p>
          </div>
        </div>

        <!-- 游戏控制区域 -->
        <div class="mt-12 space-y-6">
          <div class="flex flex-col md:flex-row gap-4 justify-center">
            <button @click="startGame" class="group px-10 py-5 text-xl font-medium bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full 
                           transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30
                           active:scale-95 relative overflow-hidden">
              <span class="relative z-10">开始冒险</span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              </div>
            </button>

            <router-link to="/matchmaking" class="group px-10 py-5 text-xl font-medium bg-gradient-to-r from-purple-500 to-pink-500 rounded-full 
                               transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30
                               active:scale-95 relative overflow-hidden">
              <span class="relative z-10">PVP 战斗</span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              </div>
            </router-link>
          </div>

          <!-- 新增特性展示 -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div
              class="p-6 rounded-xl bg-white/5 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
              <div class="text-2xl mb-3">✨</div>
              <h3 class="text-xl font-semibold mb-2">魔法咒语</h3>
              <p class="text-gray-400">解锁强大的魔法咒语，改变游戏世界</p>
            </div>
            <div
              class="p-6 rounded-xl bg-white/5 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
              <div class="text-2xl mb-3">🎮</div>
              <h3 class="text-xl font-semibold mb-2">互动解谜</h3>
              <p class="text-gray-400">通过文字互动解开各种谜题</p>
            </div>
            <div
              class="p-6 rounded-xl bg-white/5 backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:bg-white/10">
              <div class="text-2xl mb-3">📖</div>
              <h3 class="text-xl font-semibold mb-2">故事探索</h3>
              <p class="text-gray-400">探索丰富的故事情节和隐藏剧情</p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- 页脚区域 -->
    <footer class="text-center py-6 text-gray-400 text-sm relative z-10">
      <p class="animate-fade-in">© 2024 咒语纪元. 保留所有权利.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
const startGame = () => {
  // TODO: 实现游戏开始逻辑
  console.log('游戏开始！');
};
</script>

<style>
@keyframes gradient-x {

  0%,
  100% {
    background-size: 200% 200%;
    background-position: left center;
  }

  50% {
    background-size: 200% 200%;
    background-position: right center;
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

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.animate-gradient-x {
  animation: gradient-x 15s ease infinite;
}

.animate-blob {
  animation: blob 7s infinite;
}

.animate-slide-up {
  animation: slide-up 0.5s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 200ms;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>