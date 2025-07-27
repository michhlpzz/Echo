import mammoth from 'mammoth'
import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

export default defineEventHandler(async (event) => {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      throw createError({
        statusCode: 500,
        statusMessage: 'OpenAI API key is not configured. Please set OPENAI_API_KEY in your .env file.'
      })
    }

    const form = await readMultipartFormData(event)
    
    if (!form || !form[0]) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No file uploaded'
      })
    }

    const file = form[0]
    let extractedText = ''

    // Extract text based on file type
    if (file.type === 'application/pdf') {
      // For now, we'll disable PDF support due to library issues
      // You can re-enable this later with a different PDF library
      throw createError({
        statusCode: 400,
        statusMessage: 'PDF processing is temporarily disabled. Please upload a TXT or DOCX file instead.'
      })
    } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
               file.filename?.endsWith('.docx')) {
      const buffer = Buffer.from(file.data)
      const result = await mammoth.extractRawText({ buffer })
      extractedText = result.value
    } else if (file.type === 'text/plain') {
      extractedText = Buffer.from(file.data).toString('utf-8')
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: 'Unsupported file type. Please upload DOCX or TXT files.'
      })
    }

    // Clean up the text
    extractedText = extractedText
      .replace(/\s+/g, ' ')
      .replace(/\n+/g, ' ')
      .trim()

    if (!extractedText || extractedText.length < 50) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Document does not contain enough text to generate flashcards'
      })
    }

    // Limit text length to prevent API limits (roughly 3000 tokens = ~12000 characters)
    if (extractedText.length > 12000) {
      extractedText = extractedText.substring(0, 12000) + '...'
    }

    // Generate flashcards using OpenAI
    const flashcards = await generateFlashcardsWithAI(extractedText)

    return {
      success: true,
      flashcards,
      textLength: extractedText.length,
      source: 'openai-ai-only'
    }
  } catch (error) {
    console.error('Error generating flashcards:', error)
    
    // If it's an OpenAI API error, provide more specific feedback
    if (error instanceof Error && error.message.includes('OpenAI')) {
      throw createError({
        statusCode: 500,
        statusMessage: `AI service error: ${error.message}`
      })
    }
    
    throw createError({
      statusCode: 500,
      statusMessage: (error as Error).message || 'Failed to generate flashcards'
    })
  }
})

async function generateFlashcardsWithAI(text: string) {
  try {
    const prompt = `You are an expert educator creating study flashcards. Analyze the following text and create high-quality flashcards that will help students learn and remember the key concepts.

Instructions:
1. Create 5-10 flashcards from the most important concepts in the text
2. Each flashcard should have a clear, specific question and a comprehensive answer
3. Focus on definitions, key facts, processes, relationships, and important details
4. Make questions that test understanding, not just memorization
5. Ensure answers are complete but concise (1-3 sentences)
6. Vary the question types (What is..., How does..., Why..., When..., etc.)
7. If the text is short or lacks clear concepts, create at least 3 meaningful flashcards by focusing on the main ideas
8. Always ensure the JSON is properly formatted and valid

Text to analyze:
${text}

IMPORTANT: Respond with ONLY a valid JSON array. No other text before or after. Use this exact format:
[
  {
    "question": "Clear, specific question here",
    "answer": "Complete, informative answer here"
  },
  {
    "question": "Another clear question",
    "answer": "Another complete answer"
  }
]`

    const response = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an expert educator who creates high-quality study flashcards. You MUST respond with only valid JSON arrays containing question-answer pairs. Never include explanatory text, code blocks, or formatting outside the JSON.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: parseInt(process.env.OPENAI_MAX_TOKENS || '1500'),
      temperature: 0.3, // Lower temperature for more consistent JSON formatting
    })

    const aiResponse = response.choices[0]?.message?.content?.trim()
    
    if (!aiResponse) {
      throw new Error('No response from AI service')
    }

    // Parse the JSON response
    let flashcards
    try {
      flashcards = JSON.parse(aiResponse)
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse)
      throw new Error('AI response format is invalid. Please try again.')
    }

    // Validate the response format
    if (!Array.isArray(flashcards)) {
      throw new Error('AI response is not an array')
    }

    // Validate each flashcard
    const validFlashcards = flashcards.filter(card => {
      return card && 
             typeof card.question === 'string' && 
             typeof card.answer === 'string' &&
             card.question.length > 5 &&
             card.answer.length > 5 &&
             card.question.length < 200 &&
             card.answer.length < 500
    })

    if (validFlashcards.length === 0) {
      throw new Error('AI could not generate valid flashcards from the provided content. Please try with a different document.')
    }

    // Clean up and format the flashcards
    return validFlashcards.map(card => ({
      question: card.question.trim(),
      answer: card.answer.trim()
    })).slice(0, 10) // Limit to 10 flashcards

  } catch (error) {
    console.error('OpenAI API error:', error)
    throw new Error(`AI service failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
