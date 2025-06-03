import {Router} from "express"
import { CampaignModel, UserModel } from "../db/mongoose";

export const campaignRouter = Router();

campaignRouter.post("/create", async (req, res) => {
  const { userId, campaignName, scheduledTime, leadList } = req.body;

  try {
    const newCampaign = await CampaignModel.create({
      userId,
      campaignName,
      scheduledTime,
      leadList
    });

    res.json({
      message: "Created new campaign",
      campaign: newCampaign
    });
  } catch (e) {
    res.status(500).json({
      error: e
    });
  }
});


