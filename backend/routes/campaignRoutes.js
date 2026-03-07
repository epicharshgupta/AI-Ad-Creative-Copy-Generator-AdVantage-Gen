const express = require("express")
const router = express.Router()

const { createCampaign } = require("../controllers/campaignController")

router.post("/create", createCampaign)

module.exports = router