<template>
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">📚 Flashcards</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Manual flashcard creation -->
      <div>
        <h2 class="text-xl font-semibold mb-4">✏️ Create Manually</h2>
        <form @submit.prevent="handleAddFlashcard" class="space-y-4 mb-6">
          <input
            v-model="question"
            type="text"
            placeholder="Enter question"
            class="w-full p-2 border rounded"
          />
          <input
            v-model="answer"
            type="text"
            placeholder="Enter answer"
            class="w-full p-2 border rounded"
          />
          <button
            type="submit"
            class="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add Flashcard
          </button>
        </form>
      </div>

      <!-- AI-powered flashcard generation -->
      <div>
        <DocumentUpload @flashcardsGenerated="handleGeneratedFlashcards" />
      </div>
    </div>

    <!-- Flashcard list -->
    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Your Flashcards ({{ flashcards.length }})</h2>
      <FlashcardList :flashcards="flashcards" @remove="removeFlashcard" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFlashcards } from '#imports'
import FlashcardList from '~/components/FlashcardList.vue'
import DocumentUpload from '~/components/DocumentUpload.vue'

const question = ref('')
const answer = ref('')

const { flashcards, addFlashcard, removeFlashcard } = useFlashcards()

function handleAddFlashcard() {
  if (question.value && answer.value) {
    addFlashcard(question.value, answer.value)
    question.value = ''
    answer.value = ''
  }
}

function handleGeneratedFlashcards(generatedFlashcards) {
  // Add all generated flashcards to the existing list
  generatedFlashcards.forEach(card => {
    addFlashcard(card.question, card.answer)
  })
}
</script>
