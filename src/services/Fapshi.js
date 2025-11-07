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


}
module.exports = new FapshiInstance()