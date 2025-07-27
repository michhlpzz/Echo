<template>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white shadow-sm border-b">
      <nav class="max-w-6xl mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="text-2xl">📚</span>
            <h1 class="text-xl font-bold text-gray-900">Flashcards App</h1>
          </div>
          
          <div class="flex items-center space-x-6">
            <NuxtLink 
              to="/" 
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              :class="{ 'text-blue-600 border-b-2 border-blue-600': $route.path === '/' }"
            >
              🏠 Home
            </NuxtLink>
            <NuxtLink 
              to="/flashcards" 
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              :class="{ 'text-blue-600 border-b-2 border-blue-600': $route.path === '/flashcards' }"
            >
              📝 Flashcards
            </NuxtLink>
            <NuxtLink 
              to="/pomodoro" 
              class="text-gray-700 hover:text-blue-600 font-medium transition-colors"
              :class="{ 'text-blue-600 border-b-2 border-blue-600': $route.path === '/pomodoro' }"
            >
              🍅 Pomodoro
            </NuxtLink>
          </div>
        </div>
      </nav>
    </header>
    
    <main class="max-w-6xl mx-auto">
      <NuxtPage />
    </main>
    
    <footer class="bg-white border-t mt-12">
      <div class="max-w-6xl mx-auto px-4 py-6 text-center text-gray-600">
        <p>&copy; 2025 Flashcards App with AI & Pomodoro Timer</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Add global styles and meta
useHead({
  title: 'Flashcards App',
  meta: [
    { name: 'description', content: 'Create flashcards manually or with AI, and stay focused with the Pomodoro timer' }
  ]
})
</script>