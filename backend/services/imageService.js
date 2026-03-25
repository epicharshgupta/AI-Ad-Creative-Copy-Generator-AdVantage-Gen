const axios = require("axios")

const generateImage = async (prompt) => {
  try {
    console.log("📸 Using Unsplash API...")

    // 🔥 clean prompt
    const cleanPrompt = prompt
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .split(" ")
      .slice(0, 5)
      .join(" ")

    console.log("Clean Prompt:", cleanPrompt)

    const response = await axios.get(
      "https://api.unsplash.com/search/photos",
      {
        params: {
          query: cleanPrompt,
          per_page: 1
        },
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
        }
      }
    )

    const imageUrl = response.data.results[0]?.urls?.regular

    if (!imageUrl) {
      throw new Error("No image found")
    }

    const image = await axios.get(imageUrl, {
      responseType: "arraybuffer"
    })

    console.log("✅ Image fetched:", imageUrl)

    return image.data

  } catch (error) {
    console.log("❌ Unsplash failed, using fallback")

    const fallback = await axios.get(
      "https://picsum.photos/512",
      { responseType: "arraybuffer" }
    )

    return fallback.data
  }
}

module.exports = { generateImage }