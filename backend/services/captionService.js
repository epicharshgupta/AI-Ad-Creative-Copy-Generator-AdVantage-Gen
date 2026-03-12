const { GoogleGenerativeAI } = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const generateCaption = async (prompt) => {

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  const result = await model.generateContent(
    `Write a short social media caption with hashtags for: ${prompt}`
  )

  return result.response.text()
}

module.exports = { generateCaption }