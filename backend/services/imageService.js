const axios = require("axios")

const generateImage = async (prompt) => {

  try {

    // prompt clean + short
    const cleanPrompt = prompt
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .split(" ")
      .slice(0, 10)
      .join(" ")

    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(cleanPrompt)}`

    console.log("Image URL:", url)

    const response = await axios.get(url, {
      responseType: "arraybuffer",
      timeout: 10000
    })

    return response.data

  } catch (error) {

    console.log("Pollinations failed, using fallback image")

    // fallback image
    const fallback = await axios.get(
      "https://picsum.photos/512",
      { responseType: "arraybuffer" }
    )

    return fallback.data
  }

}

module.exports = { generateImage }