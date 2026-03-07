const mongoose = require("mongoose")

const CampaignSchema = new mongoose.Schema({

  prompt: {
    type: String,
    required: true
  },

  imageURL: {
    type: String
  },

  caption: {
    type: String
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model("Campaign", CampaignSchema)