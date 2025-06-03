"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadModel = exports.CampaignModel = exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    password: String
});
const campaignSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    campaignName: String,
    scheduledTime: Date,
    leadList: [String],
    sent: {
        type: Boolean,
        default: false
    }
});
const leadSchema = new mongoose_1.Schema({
    email: String,
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
exports.CampaignModel = (0, mongoose_1.model)("Campaign", campaignSchema);
exports.leadModel = (0, mongoose_1.model)("Lead", leadSchema);
