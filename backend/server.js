const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const campaignRoutes = require("./routes/campaignRoutes")

dotenv.config()

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("AdVantage Gen Backend Running")
})

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
app.use("/api/campaign", campaignRoutes)