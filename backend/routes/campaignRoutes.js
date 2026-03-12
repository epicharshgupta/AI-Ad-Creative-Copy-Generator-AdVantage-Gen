const express = require("express")
const router = express.Router()

const { createCampaign, generateCampaign, getCampaigns } = require("../controllers/campaignController")

router.post("/create", createCampaign)
router.post("/generate", generateCampaign)
router.get("/history", getCampaigns)

module.exports = router