const Groq = require("groq-sdk")

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

const generateCaption = async (prompt) => {

  const chatCompletion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "user",
        content: `Write a short social media caption with hashtags for: ${prompt}`
      }
    ]
  })

  return chatCompletion.choices[0].message.content
}

module.exports = { generateCaption }