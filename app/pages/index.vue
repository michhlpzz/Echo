<template>
  <div class="p-6">
    <!-- Hero Section -->
    <section class="text-center py-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Your Learning Hub! 🎓
      </h1>
      <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Create flashcards, generate them with AI from documents, and stay focused with the Pomodoro technique.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink 
          to="/flashcards"
          class="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          📝 Create Flashcards
        </NuxtLink>
        <NuxtLink 
          to="/pomodoro"
          class="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
        >
          🍅 Start Pomodoro
        </NuxtLink>
      </div>
    </section>
    
    <!-- Features Grid -->
    <section class="py-12">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">
        Powerful Features for Better Learning
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Manual Flashcards -->
        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div class="text-4xl mb-4">✏️</div>
          <h3 class="text-xl font-semibold mb-3">Manual Creation</h3>
          <p class="text-gray-600 mb-4">
            Create custom flashcards with your own questions and answers. Perfect for specific topics and personal study needs.
          </p>
          <ul class="text-sm text-gray-500 space-y-1">
            <li>• Custom Q&A pairs</li>
            <li>• Instant form validation</li>
            <li>• Easy management</li>
          </ul>
        </div>
        
        <!-- AI Generation -->
        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div class="text-4xl mb-4">🤖</div>
          <h3 class="text-xl font-semibold mb-3">AI-Powered Generation</h3>
          <p class="text-gray-600 mb-4">
            Upload documents and let AI automatically extract key concepts and create relevant flashcards for you.
          </p>
          <ul class="text-sm text-gray-500 space-y-1">
            <li>• DOCX & TXT support</li>
            <li>• Smart pattern recognition</li>
            <li>• Quality scoring</li>
          </ul>
        </div>
        
        <!-- Pomodoro Timer -->
        <div class="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div class="text-4xl mb-4">🍅</div>
          <h3 class="text-xl font-semibold mb-3">Pomodoro Timer</h3>
          <p class="text-gray-600 mb-4">
            Stay focused with the proven Pomodoro technique. Work in focused sprints with regular breaks.
          </p>
          <ul class="text-sm text-gray-500 space-y-1">
            <li>• Customizable intervals</li>
            <li>• Progress tracking</li>
            <li>• Audio notifications</li>
          </ul>
        </div>
      </div>
    </section>
    
    <!-- Study Mode -->
    <section class="py-12">
      <div class="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Enhanced Study Experience 📖
          </h2>
          <p class="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Switch to Study Mode for an immersive flashcard review experience with progress tracking and navigation.
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div class="bg-white rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-2">🎯 Focused Learning</h3>
              <p class="text-gray-600 text-sm">Review flashcards one at a time with question/answer reveal flow</p>
            </div>
            
            <div class="bg-white rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-2">📊 Progress Tracking</h3>
              <p class="text-gray-600 text-sm">Visual progress bar and session statistics</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Quick Start -->
    <section class="py-12 text-center">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">
        Ready to Start Learning?
      </h2>
      
      <div class="space-y-4 max-w-md mx-auto">
        <div class="flex items-center bg-white rounded-lg p-4 shadow">
          <span class="text-2xl mr-3">1️⃣</span>
          <span class="text-gray-700">Create or generate flashcards</span>
        </div>
        
        <div class="flex items-center bg-white rounded-lg p-4 shadow">
          <span class="text-2xl mr-3">2️⃣</span>
          <span class="text-gray-700">Start a Pomodoro session</span>
        </div>
        
        <div class="flex items-center bg-white rounded-lg p-4 shadow">
          <span class="text-2xl mr-3">3️⃣</span>
          <span class="text-gray-700">Study with focus and take breaks</span>
        </div>
      </div>
      
      <div class="mt-8">
        <NuxtLink 
          to="/flashcards"
          class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-semibold shadow-lg"
        >
          Get Started Now! 🚀
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Home - Flashcards App',
  meta: [
    { name: 'description', content: 'Your ultimate learning companion with AI-powered flashcards and Pomodoro timer' }
  ]
})
</script>