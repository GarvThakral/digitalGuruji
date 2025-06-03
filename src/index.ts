import express from "express";
import mongoose from "mongoose";
import { CampaignModel } from "./db/mongoose.js";
import { leadsRouter } from "./routes/leads.js";
import { campaignRouter } from "./routes/campaign.js";
import { userRouter } from "./routes/user.js";

const app = express();
app.use(express.json());

// Mount routers
app.use("/leads", leadsRouter);
app.use("/user", userRouter);
app.use("/campaign", campaignRouter);

mongoose
  .connect("mongodb+srv://garv:garvgarv@cluster0.43igc.mongodb.net/digital")
  .then(() => {
    console.log("✅ Connected to MongoDB");

    setInterval(async () => {
      const now = new Date();
      console.log(`\n[Scheduler] Checking campaigns at ${now.toISOString()}`);

      try {
        const campaigns = await CampaignModel.find({
          scheduledTime: { $lte: now },
          sent: false
        });

        console.log(`[Scheduler] Found ${campaigns.length} campaign(s) to send`);

        for (const campaign of campaigns) {
          for (const email of campaign.leadList) {
            console.log(
              `→ Sending email to ${email} for campaign "${campaign.campaignName}"`
            );
          }
          await CampaignModel.updateOne(
            { _id: campaign._id },
            { $set: { sent: true } }
          );
        }
      } catch (e) {
        console.error("[Scheduler] Error running scheduler:", e);
      }
    }, 60 * 1000); 

    app.listen(3000, () => {
      console.log("🚀 Server listening on port 3000");
    });
  })
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
  });
