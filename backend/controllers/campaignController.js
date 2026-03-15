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

    console.log("Error:", error)

    res.status(500).json({
      error: error.message
    })

  }
}

// ---------------- GENERATE CAMPAIGN ----------------

const generateCampaign = async (req, res) => {

  try {

    const { prompt } = req.body

    // 1️⃣ Enhance prompt
    const enhancedPrompt = await enhancePrompt(prompt)

    // 2️⃣ Generate image
    const imageBuffer = await generateImage(enhancedPrompt)

    // 3️⃣ Logo path
    const logoPath = path.resolve(__dirname, "..", "assets", "logo.png")

    console.log("Logo path:", logoPath)
    console.log("Logo exists:", fs.existsSync(logoPath))

    // logo read
    const logoBuffer = await fs.promises.readFile(logoPath)

    // logo resize (important fix)
    const resizedLogo = await sharp(logoBuffer)
      .resize(100, 100)
      .png()
      .toBuffer()

    // logo overlay
    const finalImageBuffer = await sharp(imageBuffer)
      .composite([
        {
          input: resizedLogo,
          top: 10,
          left: 10
        }
      ])
      .png()
      .toBuffer()

    // 4️⃣ Convert to base64
    const base64Image = finalImageBuffer.toString("base64")
    const imageURL = `data:image/png;base64,${base64Image}`

    // 5️⃣ Generate caption
    const caption = await generateCaption(prompt)

    // 6️⃣ Save campaign
    const campaign = new Campaign({
      prompt,
      imageURL,
      caption
    })

    await campaign.save()

    // 7️⃣ Response
    res.json({
      message: "Campaign generated successfully",
      campaign
    })

  } catch (error) {

    console.log("Error:", error)

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

    console.log("Error:", error)

    res.status(500).json({
      error: error.message
    })

  }

}

module.exports = {
  createCampaign,
  generateCampaign,
  getCampaigns
}