<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">🍅 Pomodoro Timer</h1>
    
    <!-- Timer Display -->
    <div class="bg-white rounded-xl shadow-lg p-8 mb-6">
      <div class="text-center">
        <!-- Current Session Type -->
        <div class="mb-4">
          <span 
            :class="[
              'px-4 py-2 rounded-full text-sm font-semibold',
              sessionType === 'work' ? 'bg-red-100 text-red-700' :
              sessionType === 'shortBreak' ? 'bg-green-100 text-green-700' :
              'bg-blue-100 text-blue-700'
            ]"
          >
            {{ sessionTypeText }}
          </span>
        </div>
        
        <!-- Timer Circle -->
        <div class="relative w-64 h-64 mx-auto mb-6">
          <svg class="w-64 h-64 transform -rotate-90" viewBox="0 0 100 100">
            <!-- Background circle -->
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              stroke-width="8"
              fill="none"
              class="text-gray-200"
            />
            <!-- Progress circle -->
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              stroke-width="8"
              fill="none"
              :class="[
                sessionType === 'work' ? 'text-red-500' :
                sessionType === 'shortBreak' ? 'text-green-500' :
                'text-blue-500'
              ]"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="strokeDashoffset"
              class="transition-all duration-1000 ease-linear"
              stroke-linecap="round"
            />
          </svg>
          
          <!-- Timer Text -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="text-center">
              <div class="text-4xl font-bold text-gray-800">
                {{ formattedTime }}
              </div>
              <div class="text-sm text-gray-500 mt-1">
                Session {{ currentSession }}
              </div>
            </div>
          </div>
        </div>
        
        <!-- Control Buttons -->
        <div class="flex justify-center space-x-4 mb-6">
          <button
            @click="toggleTimer"
            :class="[
              'px-8 py-3 rounded-lg font-semibold text-white transition-colors',
              isRunning ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'
            ]"
          >
            {{ isRunning ? '⏸️ Pause' : '▶️ Start' }}
          </button>
          
          <button
            @click="resetTimer"
            class="px-8 py-3 rounded-lg font-semibold bg-gray-500 text-white hover:bg-gray-600 transition-colors"
          >
            🔄 Reset
          </button>
          
          <button
            @click="skipSession"
            class="px-8 py-3 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            ⏭️ Skip
          </button>
        </div>
        
        <!-- Session Progress -->
        <div class="text-center">
          <div class="text-sm text-gray-600 mb-2">
            Sessions completed today: {{ completedSessions }}
          </div>
          <div class="flex justify-center space-x-1">
            <div
              v-for="n in 8"
              :key="n"
              :class="[
                'w-3 h-3 rounded-full',
                n <= completedSessions ? 'bg-red-400' : 'bg-gray-200'
              ]"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
    
    <!-- Settings Panel -->
    <div class="bg-white rounded-xl shadow-lg p-6">
      <h2 class="text-xl font-semibold mb-4">⚙️ Settings</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Work Duration -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Work Duration (minutes)
          </label>
          <input
            v-model.number="settings.workDuration"
            type="number"
            min="1"
            max="60"
            class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            :disabled="isRunning"
          />
        </div>
        
        <!-- Short Break Duration -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Short Break (minutes)
          </label>
          <input
            v-model.number="settings.shortBreakDuration"
            type="number"
            min="1"
            max="30"
            class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            :disabled="isRunning"
          />
        </div>
        
        <!-- Long Break Duration -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Long Break (minutes)
          </label>
          <input
            v-model.number="settings.longBreakDuration"
            type="number"
            min="1"
            max="60"
            class="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            :disabled="isRunning"
          />
        </div>
      </div>
      
      <!-- Additional Settings -->
      <div class="mt-4 space-y-3">
        <label class="flex items-center">
          <input
            v-model="settings.autoStartBreaks"
            type="checkbox"
            class="rounded text-blue-600 focus:ring-blue-500"
          />
          <span class="ml-2 text-sm text-gray-700">Auto-start breaks</span>
        </label>
        
        <label class="flex items-center">
          <input
            v-model="settings.autoStartWork"
            type="checkbox"
            class="rounded text-blue-600 focus:ring-blue-500"
          />
          <span class="ml-2 text-sm text-gray-700">Auto-start work sessions</span>
        </label>
        
        <label class="flex items-center">
          <input
            v-model="settings.soundEnabled"
            type="checkbox"
            class="rounded text-blue-600 focus:ring-blue-500"
          />
          <span class="ml-2 text-sm text-gray-700">Play notification sounds</span>
        </label>
      </div>
    </div>
    
    <!-- Statistics -->
    <div class="bg-white rounded-xl shadow-lg p-6 mt-6">
      <h2 class="text-xl font-semibold mb-4">📊 Today's Statistics</h2>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div class="bg-red-50 p-4 rounded-lg">
          <div class="text-2xl font-bold text-red-600">{{ completedSessions }}</div>
          <div class="text-sm text-red-600">Work Sessions</div>
        </div>
        
        <div class="bg-green-50 p-4 rounded-lg">
          <div class="text-2xl font-bold text-green-600">{{ completedBreaks }}</div>
          <div class="text-sm text-green-600">Breaks Taken</div>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-lg">
          <div class="text-2xl font-bold text-blue-600">{{ totalFocusTime }}</div>
          <div class="text-sm text-blue-600">Focus Time</div>
        </div>
        
        <div class="bg-purple-50 p-4 rounded-lg">
          <div class="text-2xl font-bold text-purple-600">{{ currentStreak }}</div>
          <div class="text-sm text-purple-600">Day Streak</div>
        </div>
      </div>
    <!-- Study Integration -->
    <div class="bg-white rounded-xl shadow-lg p-6 mt-6">
      <h2 class="text-xl font-semibold mb-4">🎯 Study Integration</h2>
      
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div class="flex items-start space-x-3">
          <div class="text-blue-600 text-lg">💡</div>
          <div>
            <h3 class="font-semibold text-blue-900 mb-1">Perfect Study Session</h3>
            <p class="text-blue-800 text-sm mb-3">
              Use your work sessions to review flashcards and take breaks to rest your mind!
            </p>
            <div class="space-y-2 text-sm">
              <div class="flex items-center text-blue-700">
                <span class="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                Work sessions: Review your flashcards with full focus
              </div>
              <div class="flex items-center text-blue-700">
                <span class="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                Short breaks: Quick stretch and hydration
              </div>
              <div class="flex items-center text-blue-700">
                <span class="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                Long breaks: Walk around and reflect on what you learned
              </div>
            </div>
            
            <div class="mt-4">
              <NuxtLink 
                to="/flashcards"
                class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                📝 Go to Flashcards
                <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

// Timer state
const isRunning = ref(false)
const timeLeft = ref(25 * 60) // 25 minutes in seconds
const sessionType = ref('work') // 'work', 'shortBreak', 'longBreak'
const currentSession = ref(1)
const completedSessions = ref(0)
const completedBreaks = ref(0)
const currentStreak = ref(1)

// Settings
const settings = ref({
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  autoStartBreaks: false,
  autoStartWork: false,
  soundEnabled: true
})

// Timer interval
let timerInterval = null

// Computed properties
const sessionTypeText = computed(() => {
  switch (sessionType.value) {
    case 'work':
      return 'Focus Time'
    case 'shortBreak':
      return 'Short Break'
    case 'longBreak':
      return 'Long Break'
    default:
      return 'Focus Time'
  }
})

const formattedTime = computed(() => {
  const minutes = Math.floor(timeLeft.value / 60)
  const seconds = timeLeft.value % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

const circumference = 2 * Math.PI * 45 // radius = 45

const strokeDashoffset = computed(() => {
  const totalTime = getCurrentSessionDuration() * 60
  const progress = (totalTime - timeLeft.value) / totalTime
  return circumference * (1 - progress)
})

const totalFocusTime = computed(() => {
  const minutes = completedSessions.value * settings.value.workDuration
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`
  }
  return `${minutes}m`
})

// Methods
function getCurrentSessionDuration() {
  switch (sessionType.value) {
    case 'work':
      return settings.value.workDuration
    case 'shortBreak':
      return settings.value.shortBreakDuration
    case 'longBreak':
      return settings.value.longBreakDuration
    default:
      return settings.value.workDuration
  }
}

function toggleTimer() {
  isRunning.value = !isRunning.value
  
  if (isRunning.value) {
    startTimer()
  } else {
    stopTimer()
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      completeSession()
    }
  }, 1000)
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval)
    timerInterval = null
  }
}

function resetTimer() {
  stopTimer()
  isRunning.value = false
  timeLeft.value = getCurrentSessionDuration() * 60
}

function skipSession() {
  completeSession()
}

function completeSession() {
  stopTimer()
  isRunning.value = false
  
  // Play notification sound
  if (settings.value.soundEnabled) {
    playNotificationSound()
  }
  
  // Update statistics
  if (sessionType.value === 'work') {
    completedSessions.value++
    currentSession.value++
  } else {
    completedBreaks.value++
  }
  
  // Determine next session type
  const nextSessionType = getNextSessionType()
  sessionType.value = nextSessionType
  timeLeft.value = getCurrentSessionDuration() * 60
  
  // Auto-start next session if enabled
  const shouldAutoStart = 
    (nextSessionType !== 'work' && settings.value.autoStartBreaks) ||
    (nextSessionType === 'work' && settings.value.autoStartWork)
  
  if (shouldAutoStart) {
    setTimeout(() => {
      isRunning.value = true
      startTimer()
    }, 1000)
  }
  
  // Save statistics to localStorage
  saveStatistics()
}

function getNextSessionType() {
  if (sessionType.value === 'work') {
    // After work: short break or long break every 4th session
    return completedSessions.value % 4 === 0 ? 'longBreak' : 'shortBreak'
  } else {
    // After any break: work
    return 'work'
  }
}

function playNotificationSound() {
  // Create a simple beep sound using Web Audio API
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    oscillator.frequency.value = 800
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  } catch (error) {
    console.log('Audio notification not available')
  }
}

function saveStatistics() {
  const today = new Date().toDateString()
  const stats = {
    date: today,
    completedSessions: completedSessions.value,
    completedBreaks: completedBreaks.value,
    currentStreak: currentStreak.value
  }
  localStorage.setItem('pomodoroStats', JSON.stringify(stats))
}

function loadStatistics() {
  try {
    const saved = localStorage.getItem('pomodoroStats')
    if (saved) {
      const stats = JSON.parse(saved)
      const today = new Date().toDateString()
      
      if (stats.date === today) {
        // Same day, load stats
        completedSessions.value = stats.completedSessions || 0
        completedBreaks.value = stats.completedBreaks || 0
        currentStreak.value = stats.currentStreak || 1
        currentSession.value = completedSessions.value + 1
      } else {
        // New day, reset daily stats but keep streak
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        
        if (stats.date === yesterday.toDateString() && stats.completedSessions > 0) {
          // Consecutive day with sessions, increment streak
          currentStreak.value = (stats.currentStreak || 1) + 1
        } else {
          // Streak broken, reset to 1
          currentStreak.value = 1
        }
        
        completedSessions.value = 0
        completedBreaks.value = 0
        currentSession.value = 1
      }
    }
  } catch (error) {
    console.error('Error loading statistics:', error)
  }
}

function saveSettings() {
  localStorage.setItem('pomodoroSettings', JSON.stringify(settings.value))
}

function loadSettings() {
  try {
    const saved = localStorage.getItem('pomodoroSettings')
    if (saved) {
      settings.value = { ...settings.value, ...JSON.parse(saved) }
    }
  } catch (error) {
    console.error('Error loading settings:', error)
  }
}

// Watch for settings changes
watch(settings, saveSettings, { deep: true })

// Watch for session type changes to update timer
watch(sessionType, () => {
  if (!isRunning.value) {
    timeLeft.value = getCurrentSessionDuration() * 60
  }
})

// Lifecycle hooks
onMounted(() => {
  loadSettings()
  loadStatistics()
  timeLeft.value = getCurrentSessionDuration() * 60
  
  // Page visibility API to pause timer when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && isRunning.value) {
      // Optionally pause when tab is hidden
      // toggleTimer()
    }
  })
})

onUnmounted(() => {
  stopTimer()
})

// Set page title
useHead({
  title: 'Pomodoro Timer - Flashcards App'
})
</script>
