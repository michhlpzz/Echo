<template>
  <div class="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-300">
    <h3 class="text-lg font-semibold mb-4">🤖 Generate Flashcards with AI</h3>
    <p class="text-gray-600 mb-4">Upload a document (DOCX or TXT) and let AI create flashcards for you!</p>
    <div class="text-sm text-amber-600 bg-amber-50 p-2 rounded mb-4">
      📝 Note: PDF support is temporarily disabled. Please use DOCX or TXT files.
    </div>
    
    <div class="space-y-4">
      <!-- File input -->
      <div>
        <input
          ref="fileInput"
          type="file"
          accept=".docx,.txt"
          @change="handleFileSelect"
          class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
      
      <!-- Selected file info -->
      <div v-if="selectedFile" class="text-sm text-gray-600">
        Selected: {{ selectedFile.name }} ({{ formatFileSize(selectedFile.size) }})
      </div>
      
      <!-- Generate button -->
      <button
        @click="generateFlashcards"
        :disabled="!selectedFile || isGenerating"
        class="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
      >
        <span v-if="isGenerating" class="animate-spin mr-2">⏳</span>
        {{ isGenerating ? 'Generating...' : 'Generate Flashcards' }}
      </button>
      
      <!-- Error message -->
      <div v-if="errorMessage" class="text-red-600 text-sm bg-red-50 p-3 rounded">
        {{ errorMessage }}
      </div>
      
      <!-- Success message -->
      <div v-if="successMessage" class="text-green-600 text-sm bg-green-50 p-3 rounded">
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['flashcardsGenerated'])

const fileInput = ref(null)
const selectedFile = ref(null)
const isGenerating = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

function handleFileSelect(event) {
  const file = event.target.files[0]
  selectedFile.value = file
  errorMessage.value = ''
  successMessage.value = ''
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

async function generateFlashcards() {
  if (!selectedFile.value) return
  
  isGenerating.value = true
  errorMessage.value = ''
  successMessage.value = ''
  
  try {
    const formData = new FormData()
    formData.append('file', selectedFile.value)
    
    const response = await $fetch('/api/generate-flashcards', {
      method: 'POST',
      body: formData
    })
    
    if (response.success && response.flashcards.length > 0) {
      emit('flashcardsGenerated', response.flashcards)
      successMessage.value = `Successfully generated ${response.flashcards.length} flashcards!`
      
      // Reset the form
      selectedFile.value = null
      if (fileInput.value) {
        fileInput.value.value = ''
      }
    } else {
      errorMessage.value = 'No flashcards could be generated from this document. Try a document with more structured content.'
    }
  } catch (error) {
    console.error('Error generating flashcards:', error)
    errorMessage.value = error.data?.message || 'Failed to generate flashcards. Please try again.'
  } finally {
    isGenerating.value = false
  }
}
</script>
