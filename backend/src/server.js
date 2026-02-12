const mongoose = require("mongoose");
const app = require("./app");
const { MONGODB_URL } = require("./config");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ DB connection failed:", error);
    process.exit(1);
  }
};

startServer();
