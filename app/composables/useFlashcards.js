import { ref } from 'vue'

export function useFlashcards() {
  const flashcards = ref([])

  function addFlashcard(question, answer) {
    if (question && answer) {
      flashcards.value.push({ question, answer })
    }
  }

  function removeFlashcard(index) {
    flashcards.value.splice(index, 1)
  }

  return { flashcards, addFlashcard, removeFlashcard }
}
