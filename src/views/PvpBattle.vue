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

    <div class="pvp-battle-container p-8 rounded-2xl bg-white/5 backdrop-blur-sm relative z-10 w-full min-h-screen">
      <router-link to="/"
        class="absolute top-6 left-6 px-5 py-2.5 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center gap-2 group border border-white/10">
        <span class="i-carbon-arrow-left text-lg group-hover:-translate-x-1 transition-transform"></span>
        返回主页
      </router-link>

      <div class="flex gap-8 max-w-7xl mx-auto">
        <!-- 左侧主内容区 -->
        <div class="flex-1">
          <BattleHeader :player1-health="player1Health" :player2-health="player2Health"
            :player1-inspiration="player1Inspiration" :player2-inspiration="player2Inspiration" />

          <!-- 角色卡片 -->
          <div class="grid grid-cols-2 gap-6 mb-8">
            <CharacterCard ref="player1Card" v-bind="player1Data" :is-player2="false" />
            <CharacterCard ref="player2Card" v-bind="player2Data" :is-player2="true" />
          </div>

          <BattleLog :messages="battleLog" />
          <BattleInput :is-responding="isResponding" :response-time="responseTime" :response-progress="responseProgress"
            :current-turn="currentTurn" :is-disabled="player1Health <= 0 || player2Health <= 0 || !isResponding"
            @cast="castIncantation" />
        </div>

        <!-- 右侧任务区 -->
        <TaskPanel :tasks="tasks" />
      </div>


      <!-- 突发事件弹窗 -->
      <EventPopup v-model:show="showEventPopup" :title="eventPopup.title" :content="eventPopup.content"
        :show-cancel="eventPopup.showCancel" @close="closeEventPopup" @confirm="confirmEventPopup"
        @cancel="cancelEventPopup" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import BattleHeader from '@/components/battle/BattleHeader.vue'
import BattleLog from '@/components/battle/BattleLog.vue'
import BattleInput from '@/components/battle/BattleInput.vue'
import EventPopup from '@/components/battle/EventPopup.vue'
import TaskPanel from '@/components/battle/TaskPanel.vue'
import CharacterCard from '@/components/battle/CharacterCard.vue'

const router = useRouter()
const player1Health = ref(100)
const player2Health = ref(100)
const player1Inspiration = ref(100)
const player2Inspiration = ref(100)
const currentTurn = ref<'player1' | 'player2'>('player1')
const battleLog = ref<Array<{ type: 'player1' | 'player2', text: string }>>([])
const responseTime = ref(30)
const isResponding = ref(false)
const responseTimer = ref<number | null>(null)
const responseProgress = ref(100)
const showAttackEffect = ref(false)

// 突发事件弹窗
const showEventPopup = ref(false)
const eventPopup = ref({
  title: '',
  content: '',
  showCancel: false,
  onConfirm: () => { },
  onCancel: () => { },
})

// 任务列表
const tasks = ref([
  {
    title: '初出茅庐',
    description: '完成你的第一次言灵对战',
    reward: '经验值 +100',
    progress: 50,
  },
  {
    title: '言灵大师',
    description: '在一场对战中造成超过50点伤害',
    reward: '金币 +200',
    progress: 30,
  },
  {
    title: '完美防御',
    description: '在一场对战中保持生命值在80%以上',
    reward: '防御符文 x1',
    progress: 0,
  },
])

// 角色数据
const player1Data = {
  name: '星辰法师',
  title: '元素掌控者',
  level: 5,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mage1&backgroundColor=b6e3f4',
  description: '精通元素魔法的强大法师，擅长远程攻击和元素控制。',
  magicPower: 85,
  defense: 60
}

const player2Data = {
  name: '暗影术士',
  title: '虚空行者',
  level: 5,
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mage2&backgroundColor=ffdfbf',
  description: '掌握暗影魔法的神秘术士，擅长控制和持续伤害。',
  magicPower: 75,
  defense: 70
}

// 角色卡片引用
const player1Card = ref<InstanceType<typeof CharacterCard> | null>(null)
const player2Card = ref<InstanceType<typeof CharacterCard> | null>(null)

// 显示突发事件
const showRandomEvent = () => {
  const events = [
    {
      title: '魔法风暴',
      content: '一场魔法风暴即将来临，所有言灵伤害提升50%，持续3回合！',
      showCancel: true,
    },
    {
      title: '神秘祝福',
      content: '你获得了神秘力量的祝福，下一个言灵将造成双倍伤害！',
      showCancel: false,
    },
    {
      title: '元素共鸣',
      content: '元素之力共鸣，你的言灵将附加随机元素效果！',
      showCancel: true,
    },
  ]

  const randomEvent = events[Math.floor(Math.random() * events.length)]
  eventPopup.value = {
    ...randomEvent,
    onConfirm: () => {
      // 处理确认事件
      addBattleLog('system', `触发事件：${randomEvent.title}`)
    },
    onCancel: () => {
      // 处理取消事件
      addBattleLog('system', '拒绝了事件')
    },
  }
  showEventPopup.value = true
}

// 关闭突发事件弹窗
const closeEventPopup = () => {
  showEventPopup.value = false
}

// 确认突发事件
const confirmEventPopup = () => {
  eventPopup.value.onConfirm()
  closeEventPopup()
}

// 取消突发事件
const cancelEventPopup = () => {
  eventPopup.value.onCancel()
  closeEventPopup()
}

// 开始响应计时
const startResponseTimer = () => {
  isResponding.value = true
  responseTime.value = 30
  responseProgress.value = 100

  responseTimer.value = window.setInterval(() => {
    responseTime.value--
    responseProgress.value = (responseTime.value / 30) * 100

    if (responseTime.value <= 0) {
      clearInterval(responseTimer.value!)
      isResponding.value = false
      switchTurn()
      addBattleLog(currentTurn.value === 'player1' ? 'player2' : 'player1', '响应超时，回合切换')
    }
  }, 1000)
}

// 停止响应计时
const stopResponseTimer = () => {
  if (responseTimer.value) {
    clearInterval(responseTimer.value)
    responseTimer.value = null
  }
  isResponding.value = false
}

// 切换回合
const switchTurn = () => {
  currentTurn.value = currentTurn.value === 'player1' ? 'player2' : 'player1'
  stopResponseTimer()
  startResponseTimer()

  // 随机触发突发事件
  if (Math.random() < 0.3) { // 30% 概率触发
    showRandomEvent()
  }
}

// 添加战斗日志
const addBattleLog = (type: 'player1' | 'player2' | 'system', text: string) => {
  battleLog.value.push({ type, text })
}

// 释放言灵
const castIncantation = (incantation: string) => {
  if (!incantation.trim()) return

  // 检查当前玩家的灵感值是否足够
  const currentPlayerInspiration = currentTurn.value === 'player1' ? player1Inspiration : player2Inspiration
  const inspirationCost = 20 // 每次释放言灵消耗20点灵感值

  if (currentPlayerInspiration.value < inspirationCost) {
    addBattleLog('system', `${currentTurn.value === 'player1' ? '玩家1' : '玩家2'} 灵感值不足，无法释放言灵！`)
    return
  }

  const damage = Math.floor(Math.random() * 20) + 10
  const target = currentTurn.value === 'player1' ? 'player2' : 'player1'

  // 显示攻击特效
  showAttackEffect.value = true
  setTimeout(() => {
    showAttackEffect.value = false
  }, 1000)

  // 消耗灵感值
  if (currentTurn.value === 'player1') {
    player1Inspiration.value -= inspirationCost
  } else {
    player2Inspiration.value -= inspirationCost
  }

  if (target === 'player2') {
    player2Health.value = Math.max(0, player2Health.value - damage)
    // 触发玩家2的受击效果
    player2Card.value?.triggerHitEffect()
  } else {
    player1Health.value = Math.max(0, player1Health.value - damage)
    // 触发玩家1的受击效果
    player1Card.value?.triggerHitEffect()
  }

  addBattleLog(currentTurn.value, `释放言灵：${incantation}，消耗 ${inspirationCost} 点灵感值，造成 ${damage} 点伤害！`)

  // 更新任务进度
  updateTaskProgress(damage)

  if (player1Health.value <= 0 || player2Health.value <= 0) {
    stopResponseTimer()
    addBattleLog(currentTurn.value, '战斗结束！')
    return
  }

  switchTurn()
}

// 更新任务进度
const updateTaskProgress = (damage: number) => {
  tasks.value = tasks.value.map(task => {
    if (task.title === '言灵大师' && damage > 50) {
      return { ...task, progress: 100 }
    }
    if (task.title === '初出茅庐') {
      return { ...task, progress: Math.min(100, task.progress + 25) }
    }
    return task
  })
}

onMounted(() => {
  startResponseTimer()
})

onUnmounted(() => {
  stopResponseTimer()
})
</script>

<style scoped>
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

.animate-blob {
  animation: blob 7s infinite;
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out forwards;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

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

.pvp-battle-container {
  background: linear-gradient(135deg, rgba(88, 28, 135, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%);
}

.response-timer {
  position: relative;
}

.response-timer::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  animation: shimmer 2s infinite;
}
</style>