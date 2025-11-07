const mongoose = require("mongoose")
const paiementSchema = new mongoose.Schema(
    { 
        userId: { type: String },
        idT: { type: String },
        email: { type: String },// email of the user that trying to buy a product
        amount: { type: Number },
        token: { type: String },// transaction ID send by the fapshi API
        api_response_id: { type: String },
        status: { type: String },// CREATED | PENDING | FAILED | SUCCESS
    },
    { timestamps: true }
);

const Paiement = mongoose.model("Paiement", paiementSchema);

module.exports =  Paiement;
