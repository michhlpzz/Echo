# Flashcards App with AI Generation & Pomodoro Timer

A modern flashcard application built with Nuxt 3 that allows you to create flashcards manually, automatically generate them from documents using AI, and stay focused with an integrated Pomodoro timer. Help me

## Features

### ✏️ Manual Flashcard Creation
- Add flashcards with custom questions and answers
- Simple and intuitive interface
- Instant form validation and clearing

### 🤖 AI-Powered Flashcard Generation
- Upload documents (DOCX, TXT files)
- Automatically extract text and generate relevant flashcards
- Intelligent pattern recognition for creating meaningful Q&A pairs
- Support for various content types including:
  - Definitions and explanations
  - Historical dates and events
  - Processes and procedures
  - Key concepts and terminology

### 📚 Flashcard Management
- View all your flashcards in one place
- Remove unwanted flashcards
- Real-time flashcard counter
- **Study Mode**: Interactive flashcard review with progress tracking
- Question/answer reveal flow with navigation controls
- Responsive design for all devices

### 🍅 Pomodoro Timer
- **Complete Pomodoro Implementation** with work sessions and breaks
- **Customizable Settings**: Adjust work duration, short breaks, and long breaks
- **Visual Progress**: Beautiful circular timer with progress indication
- **Session Management**: Automatic cycling between work and break periods
- **Statistics Tracking**: Daily session count, focus time, and streak tracking
- **Audio Notifications**: Optional sound alerts when sessions complete
- **Auto-start Options**: Automatically start breaks or work sessions
- **Local Storage**: Settings and statistics persist between sessions
- **Study Integration**: Tips for combining Pomodoro with flashcard study

## How to Use

1. **Manual Creation**: Enter a question and answer in the form and click "Add Flashcard"

2. **AI Generation**: 
   - Click on the "Generate Flashcards with AI" section
   - Upload a document (DOCX or TXT)
   - Click "Generate Flashcards" and wait for processing
   - The AI will analyze your document and create relevant flashcards automatically

3. **Study Mode**:
   - Click "Study Mode" in the flashcard list
   - Review cards one by one with question/answer flow
   - Track your progress with the visual progress bar

4. **Pomodoro Timer**:
   - Navigate to the Pomodoro page
   - Customize your session durations in settings
   - Click "Start" to begin a focus session
   - Take breaks when prompted and track your daily progress

## Supported File Types

- **Word documents** (.docx) - Microsoft Word format
- **Text files** (.txt) - Plain text documents

**Note**: PDF support is temporarily disabled due to library compatibility issues. We're working on adding it back in a future update.

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- OpenAI API key (for AI flashcard generation)

### Setup Instructions

1. **Clone and Install**
```bash
# Install dependencies
npm install
```

2. **Configure OpenAI API**
   - Create an account at [OpenAI Platform](https://platform.openai.com/)
   - Generate an API key from the [API Keys page](https://platform.openai.com/api-keys)
   - Copy your API key to the `.env` file:

```bash
# In your .env file (already created):
OPENAI_API_KEY=your-api-key-here
```

3. **Start Development**
```bash
# Start development server
npm run dev

# Build for production
npm run build
```

### OpenAI API Setup

The app uses OpenAI's GPT models to generate educational flashcards from your documents. To set this up:

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Go to [API Keys](https://platform.openai.com/api-keys) 
4. Click "Create new secret key"
5. Copy the key and paste it in your `.env` file
6. The app will automatically use AI when you upload documents

**Note**: If no API key is provided, the app falls back to pattern-based text analysis for flashcard generation.

## Technology Stack

- **Nuxt 3** - Vue.js framework
- **Vue 3** - Progressive JavaScript framework  
- **Tailwind CSS** - Utility-first CSS framework
- **OpenAI API** - GPT-powered AI flashcard generation
- **Mammoth** - DOCX document processing
- **TypeScript** - Type-safe development

## AI Features

The AI flashcard generation uses OpenAI's advanced language models to:
- Analyze document content intelligently
- Create contextual questions and answers
- Generate educationally valuable flashcards
- Handle various content types (academic, professional, technical)
- Provide fallback pattern-based generation when needed

The system works best with educational content, study materials, research papers, and informational documents. It automatically creates well-structured flashcards that help reinforce learning and retention.
