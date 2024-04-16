import cron from "node-cron";
import { User } from './../Models/userModel.js';
import { updateSelected } from './../Controllers/clubContoller.js';

// Schedule the cron job to run every hour
cron.schedule("15 * * * *", async () => {
  try {
    // Find expired users (created more than 1 hour ago and still not verified)
    const expiredUsers = await User.find({
      createdAt: { $lt: new Date(Date.now() - 60 * 60 * 1000) }, // Created more than 1 hour ago
      verified: false
    });
    console.log(expiredUsers);
    if (expiredUsers.clubs) {
      updateSelected(expiredUsers);
    }
    // Delete expired users
    await User.deleteMany({ _id: { $in: expiredUsers.map(user => user._id) } });
    console.log("Expired users cleaned up successfully");
  } catch (error) {
    console.error("Error cleaning up expired users:", error);
  }
});
