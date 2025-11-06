require("dotenv").config()
const mongoose=require("mongoose")
const c={ id_user: { type: DataTypes.STRING },
      amount: { type: DataTypes.FLOAT },
      token: { type: DataTypes.STRING },
      api_response_id: { type: DataTypes.STRING },
      status: { type: DataTypes.STRING },
      operator: { type: DataTypes.STRING },}


export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

module.exports=connectDB