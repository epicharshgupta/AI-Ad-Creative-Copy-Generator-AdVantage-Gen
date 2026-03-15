const Groq = require("groq-sdk")

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
})

const enhancePrompt = async (prompt) => {

    const chatCompletion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        messages: [
            {
                role: "user",
                content: `Rewrite this as a short image generation prompt (max 20 words): ${prompt}`
            }
        ]
    })

    return chatCompletion.choices[0].message.content
}

module.exports = { enhancePrompt }