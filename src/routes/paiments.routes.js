const express = require("express")
const Fapshi = require("../services/Fapshi")
const router = express.Router()

/**Get the paiment link */
router.post("/pl", async (req, res) => {
    const { userId, email, amount, message, redirectUrl } = req.body
    if (!userId | !email | !amount) return res.status(400).json({ error: true, msg: "All the minimal field are required" })
    if (amount < 100 || amount % 5 !== 0) return res.status(400).json({ error: true, msg: "Amount must be >100 Xaf " })
    const payment = await Fapshi.initPayment(email, amount, userId, redirectUrl, message)
    if (payment.error) return res.status(500).json({ error: true, msg: "Please try again" })
    res.json({ error: false, url: payment.link })
})



module.exports = router