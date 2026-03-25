const Campaign = require("../models/Campaign")
const { generateImage } = require("../services/imageService")
const { generateCaption } = require("../services/captionService")
const { enhancePrompt } = require("../services/promptService")

const sharp = require("sharp")
const path = require("path")
const fs = require("fs")

// ---------------- CREATE CAMPAIGN ----------------

const createCampaign = async (req, res) => {
  
  try {

    const { prompt, imageURL, caption } = req.body

    const newCampaign = new Campaign({
      prompt,
      imageURL,
      caption
    })

    await newCampaign.save()

    res.status(201).json(newCampaign)

  } catch (error) {

    // console.log("Error:", error)

    res.status(500).json({
      error: error.message
    })

  }
}

// ---------------- GENERATE CAMPAIGN ----------------

// const generateCampaign = async (req, res) => {

//   try {

//     const { prompt } = req.body

//     // 1️⃣ Enhance prompt
//     const enhancedPrompt = await enhancePrompt(prompt)

//     // 2️⃣ Generate image
//     const imageBuffer = await generateImage(enhancedPrompt)

//     // 3️⃣ Logo optional
//     const addLogo = false   // 👈 true / false control

//     let finalImageBuffer = imageBuffer

//     if (addLogo) {

//       const logoPath = path.resolve(__dirname, "..", "assets", "logo.png")

//       const logoBuffer = await fs.promises.readFile(logoPath)

//       const resizedLogo = await sharp(logoBuffer)
//         .resize(100, 100)
//         .png()
//         .toBuffer()

//       finalImageBuffer = await sharp(imageBuffer)
//         .composite([
//           {
//             input: resizedLogo,
//             top: 10,
//             left: 10
//           }
//         ])
//         .png()
//         .toBuffer()
//     }

//     // 4️⃣ Convert to base64
//     const base64Image = finalImageBuffer.toString("base64")
//     const imageURL = `data:image/png;base64,${base64Image}`

//     // 5️⃣ Generate caption
//     const caption = await generateCaption(prompt)

//     // 6️⃣ Save campaign
//     const campaign = new Campaign({
//       prompt,
//       imageURL,
//       caption
//     })

//     await campaign.save()

//     // 7️⃣ Response
//     res.json({
//       message: "Campaign generated successfully",
//       campaign
//     })

//   } catch (error) {

//     console.log("Error:", error)

//     res.status(500).json({
//       error: error.message
//     })

//   }

// }
const generateCampaign = async (req, res) => {
  try {
    const { prompt } = req.body

    if (!prompt) {
      return res.status(400).json({ error: "Prompt required" })
    }

    const enhancedPrompt = await enhancePrompt(prompt)

    let imageBuffer
    try {
      imageBuffer = await generateImage(enhancedPrompt)
    } catch (err) {
      console.log("Image error:", err.message)

      // fallback
      const axios = require("axios")
      const fallback = await axios.get("https://picsum.photos/512", {
        responseType: "arraybuffer"
      })

      imageBuffer = fallback.data
    }

    // 🔥 logo skip temporarily (debug ke liye)
    const finalImageBuffer = imageBuffer

    const base64Image = finalImageBuffer.toString("base64")
    const imageURL = `data:image/png;base64,${base64Image}`

    const caption = await generateCaption(prompt)

    const campaign = new Campaign({
      prompt,
      imageURL,
      caption
    })

    await campaign.save()

    res.json({
      message: "Campaign generated successfully",
      campaign
    })

  } catch (error) {
    console.log("🔥 FINAL ERROR:", error)

    res.status(500).json({
      error: error.message
    })
  }
}
// ---------------- GET HISTORY ----------------

const getCampaigns = async (req, res) => {

  try {

    const campaigns = await Campaign.find().sort({ createdAt: -1 })

    res.json(campaigns)

  } catch (error) {

    // console.log("Error:", error)

    res.status(500).json({
      error: error.message
    })

  }

}

const deleteCampaign = async (req, res) => {
  try {
    const { id } = req.params

    await Campaign.findByIdAndDelete(id)

    res.json({ message: "Campaign deleted" })

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const toggleFavorite = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id)

    campaign.isFavorite = !campaign.isFavorite
    await campaign.save()

    res.json(campaign)

  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
const getFavorites = async (req, res) => {
  try {
    const favorites = await Campaign.find({ isFavorite: true }).sort({ createdAt: -1 })
    res.json(favorites)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
module.exports = {
  createCampaign,
  generateCampaign,
  getCampaigns,
  deleteCampaign,
  toggleFavorite,getFavorites
}