const Groq = require("groq-sdk")

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

const enhancePrompt = async (prompt) => {

  try {

    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are an expert AI prompt engineer for image generation."
        },
        {
          role: "user",
          content: `Convert this into a high-quality image generation prompt (max 25 words). Include style, lighting, and realism:\n${prompt}`
        }
      ]
    })

    const result = chatCompletion.choices[0].message.content

    return result.trim()

  } catch (error) {

    console.log("Prompt enhancement failed, using original prompt")

    // fallback
    return prompt
  }

}

module.exports = { enhancePrompt }