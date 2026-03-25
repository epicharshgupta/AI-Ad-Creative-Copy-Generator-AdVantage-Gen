const express = require("express")
const router = express.Router()

const { createCampaign, generateCampaign, getCampaigns, deleteCampaign, toggleFavorite, getFavorites } = require("../controllers/campaignController")

router.post("/create", createCampaign)
router.post("/generate", generateCampaign)

router.get("/history", getCampaigns)
router.delete("/:id", deleteCampaign)
router.patch("/:id/favorite", toggleFavorite)
router.get("/favorites", getFavorites)
module.exports = router