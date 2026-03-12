const Campaign = require("../models/Campaign")
const { generateImage } = require("../services/imageService")
const { generateCaption } = require("../services/captionService")

const createCampaign = async (req, res) => {
onsole.log("Generate API hit")
  try {

    const { prompt, imageURL, caption } = req.body
console.log("Prompt:", prompt)

    const newCampaign = new Campaign({
      prompt,
      imageURL,
      caption
    })

    await newCampaign.save()

    res.status(201).json(newCampaign)

  } catch (error) {
console.log("Error:", error)
    res.status(500).json({ error: error.message })

  }

}

const generateCampaign = async (req, res) => {

  try {

    const { prompt } = req.body

    const imageBuffer = await generateImage(prompt)

    const base64Image = imageBuffer.toString("base64")

    const imageURL = `data:image/png;base64,${base64Image}`

    const caption = await generateCaption(prompt)

    const campaign = new Campaign({
      prompt,
      imageURL,
      caption
    })

    await campaign.save()

    res.json(campaign)

  } catch (error) {

    console.log(error)
    res.status(500).json({ error: error.message })

  }

}
const getCampaigns = async (req, res) => {
console.log("History API hit")
  try {

    const campaigns = await Campaign.find().sort({ createdAt: -1 })

    res.json(campaigns)

  } catch (error) {

    console.log(error)

    res.status(500).json({ error: error.message })

  }

}

module.exports = { createCampaign, generateCampaign, getCampaigns }