const express = require('express')
const app = express()
const cors = require("cors")
const connectDB = require('./src/config/db')
const PORT = process.env.PORT || 3000

app.use(cors())
    .use(express.json({ limit: "10mb" }))
    .use("/p", require("./src/routes/paiments.routes"))
    .use("/", (req, res) => res.json({ error: false, msg: "Welcome to the simple solution of payment" }))

connectDB()
app.listen(PORT, console.log(`App is starting on http://localhost:${PORT}`))