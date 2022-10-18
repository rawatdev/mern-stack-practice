import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const PORT = 5000
const app = express()

// cors
app.use(cors())

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)

    console.log("DB Connected")
  } catch (err) {
    console.error("Error while connection to DB", err)
  }
}

connectDB()

app.get("/", (req, res) => {
  res.json({ message: "Hello, World!" })
})

app.post("/transaction", (req, res) => {
  res.send({ message: "connection succesful" })
})

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}...`)
})
