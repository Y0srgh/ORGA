import cron from "node-cron";
import { Token } from "../Models/token.js";

// Schedule the cron job to run every 2 minutes
cron.schedule("*/2 * * * *", async () => {
  try {
    // Find expired tokens (created more than 3 minutes ago)
    const expiredTokens = await Token.find({
      createdAt: { $lt: new Date(Date.now() - 3 * 60 * 1000) }
    });

    // Delete expired tokens
    await Token.deleteMany({ _id: { $in: expiredTokens.map(token => token._id) } });

    console.log("Expired tokens cleaned up successfully");
  } catch (error) {
    console.error("Error cleaning up expired tokens:", error);
  }
});
