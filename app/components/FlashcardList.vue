<template>
  <div v-if="flashcards.length === 0" class="text-center py-8 text-gray-500">
    <div class="text-4xl mb-4">📝</div>
    <p>No flashcards yet. Create some manually or generate them with AI!</p>
  </div>
  
  <div v-else class="space-y-4">
    <div class="flex justify-between items-center mb-4">
      <span class="text-sm text-gray-600">{{ flashcards.length }} flashcard{{ flashcards.length !== 1 ? 's' : '' }}</span>
      <button
        @click="toggleStudyMode"
        class="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        {{ studyMode ? 'Exit Study Mode' : 'Study Mode' }}
      </button>
    </div>
    
    <!-- Study Mode -->
    <div v-if="studyMode && flashcards.length > 0" class="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg border">
      <div class="text-center mb-4">
        <span class="text-sm text-gray-600">Card {{ currentCardIndex + 1 }} of {{ flashcards.length }}</span>
        <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            class="bg-purple-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${((currentCardIndex + 1) / flashcards.length) * 100}%` }"
          ></div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg p-6 shadow-md min-h-[200px] flex flex-col justify-center">
        <div v-if="!showAnswer" class="text-center">
          <h3 class="text-lg font-semibold mb-4 text-gray-800">Question:</h3>
          <p class="text-xl text-gray-700">{{ flashcards[currentCardIndex].question }}</p>
          <button
            @click="showAnswer = true"
            class="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Show Answer
          </button>
        </div>
        
        <div v-else class="text-center">
          <h3 class="text-lg font-semibold mb-2 text-gray-800">Question:</h3>
          <p class="text-lg text-gray-600 mb-4">{{ flashcards[currentCardIndex].question }}</p>
          <h3 class="text-lg font-semibold mb-2 text-green-800">Answer:</h3>
          <p class="text-xl text-green-700 font-medium">{{ flashcards[currentCardIndex].answer }}</p>
        </div>
      </div>
      
      <div class="flex justify-between mt-4">
        <button
          @click="previousCard"
          :disabled="currentCardIndex === 0"
          class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        
        <button
          v-if="showAnswer"
          @click="nextCard"
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {{ currentCardIndex === flashcards.length - 1 ? 'Finish' : 'Next →' }}
        </button>
      </div>
    </div>
    
    <!-- Normal List Mode -->
    <div v-else class="space-y-4">
      <div
        v-for="(card, index) in flashcards"
        :key="index"
        class="bg-white p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <div class="mb-3">
              <span class="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">Q</span>
              <p class="mt-2 text-gray-800 font-medium">{{ card.question }}</p>
            </div>
            <div>
              <span class="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded">A</span>
              <p class="mt-2 text-gray-700">{{ card.answer }}</p>
            </div>
          </div>
          <button
            @click="$emit('remove', index)"
            class="ml-4 text-red-500 hover:text-red-700 text-sm flex items-center"
            title="Remove flashcard"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['flashcards'])
defineEmits(['remove'])

const studyMode = ref(false)
const currentCardIndex = ref(0)
const showAnswer = ref(false)

function toggleStudyMode() {
  studyMode.value = !studyMode.value
  if (studyMode.value) {
    currentCardIndex.value = 0
    showAnswer.value = false
  }
}

function nextCard() {
  if (currentCardIndex.value < props.flashcards.length - 1) {
    currentCardIndex.value++
    showAnswer.value = false
  } else {
    // Finished studying
    studyMode.value = false
    currentCardIndex.value = 0
    showAnswer.value = false
  }
}

function previousCard() {
  if (currentCardIndex.value > 0) {
    currentCardIndex.value--
    showAnswer.value = false
  }
}

// Reset study mode when flashcards change
watch(() => props.flashcards, () => {
  if (studyMode.value && currentCardIndex.value >= props.flashcards.length) {
    currentCardIndex.value = 0
  }
}, { deep: true })
</script>
