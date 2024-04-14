import cron from "node-cron";
import { User } from './../Models/userModel.js';

// Schedule the cron job to run every 2 minutes
cron.schedule("*/2 * * * *", async () => {
  try {
    // Find expired tokens (created more than 3 minutes ago)
    const expiredUsers = await User.find({
      createdAt: { $lt: new Date(Date.now() - 3 * 60 * 1000) }
    , verified: false});

    // Delete expired tokens
    await User.deleteMany({ _id: { $in: expiredUsers.map(user => user._id) } });

    console.log("Expired users cleaned up successfully");
  } catch (error) {
    console.error("Error cleaning up expired users:", error);
  }
});
