import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  password: String
});

const campaignSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  campaignName: String,
  scheduledTime: Date,
  leadList: [String],
  sent:{
    type:Boolean,
    default:false
  }
});

const leadSchema = new Schema({
    email:String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

export const UserModel = model("User", userSchema);
export const CampaignModel = model("Campaign", campaignSchema);
export const leadModel = model("Lead", leadSchema);
