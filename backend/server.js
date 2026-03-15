const dotenv = require("dotenv")
dotenv.config()

const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const campaignRoutes = require("./routes/campaignRoutes")

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
// app.use((req, res, next) => {
//   console.log("Incoming request:", req.method, req.url)
//   next()
// })
app.get("/", (req, res) => {
  res.send("AdVantage Gen Backend Running")
})

/* routes */
app.use("/api/campaign", campaignRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})