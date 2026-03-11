const Campaign = require("../models/Campaign")
const { generateImage } = require("../services/imageService")

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

    const base64Image = Buffer.from(imageBuffer).toString("base64")

    const imageURL = `data:image/png;base64,${base64Image}`

    console.log("Prompt:", prompt)
    console.log("ImageURL length:", imageURL.length)

    const campaign = new Campaign({
      prompt,
      imageURL,
      caption: "AI generated campaign"
    })

    await campaign.save()

    res.json({
      message: "Campaign generated",
      campaign
    })

  } catch (error) {

    console.log(error)
    res.status(500).json({ error: error.message })

  }

}
module.exports = { createCampaign, generateCampaign }