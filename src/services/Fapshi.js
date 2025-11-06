require("dotenv").config()
const f = require("fapshi")
const Fapshi = new f(process.env.FAPSHI_USER, process.env.FAPSHI_API_KEY)

class FapshiInstance {
    generateFapshiId() {
        const timestamp = Date.now();
        const randomNum =
            "4S1" +
            Math.floor(Math.random() * 10000) +
            "1152C8" +
            Math.floor(Math.random() * 1000);
        return `ID${timestamp}${randomNum}`;
    }

    
}