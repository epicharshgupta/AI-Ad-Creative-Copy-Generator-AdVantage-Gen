const Campaign = require("../models/Campaign")

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

    res.status(500).json({ error: error.message })

  }

}

module.exports = { createCampaign }