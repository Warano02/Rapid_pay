require("dotenv").config()
const f = require("fapshi")
const fapshi = new f(process.env.FAPSHI_USER, process.env.FAPSHI_API_KEY)
const P = require("../models/paiement")

class FapshiInstance {
    #generateFapshiId() {
        const timestamp = Date.now();
        const randomNum =
            "4S1" +
            Math.floor(Math.random() * 10000) +
            "1152C8" +
            Math.floor(Math.random() * 1000);
        return `ID${timestamp}${randomNum}`;
    }

    async initPayment(email, amount, userId = "WaranoTESTEURID0011", redirectUrl, message = "Paiement depuis la plateforme d e-commerce") {
        const externalId = this.#generateFapshiId()
        const data = { amount, email, userId, externalId, redirectUrl, message };
        const response = await fapshi.initiatePay(data)
        if (response.statusCode !== 200) return { error: true, msg: "Interal server error !" }
        const { transId, link, dateInitiated } = response;

        const Paiement = new P({
            email,
            userId, idT: externalId,
            amount, token:
                transId,
            status: "CREATED",
            api_response_id: dateInitiated
        })
        await Paiement.save()
        return { error: false, link }
    }

    async verifyPayments() {
        try {
            const pendingPayments = await P.find({
                $or: [{ status: "CREATED" }, { status: "PENDING" }]
            })
            if (!pendingPayments.length) return
            for (const payment of pendingPayments) {
                const status = await fapshi.verifyPayments(payment?.token)
                await P.updateOne({ idT: payment.idT }, { $set: { status: status.status } })
            }
        } catch (e) {
            console.log("Error occured whyle trying to verify payment status!", e)
        }
        this.verifyPayments()
    }


}
module.exports = new FapshiInstance()