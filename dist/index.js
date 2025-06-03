"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_js_1 = require("./db/mongoose.js");
const leads_js_1 = require("./routes/leads.js");
const campaign_js_1 = require("./routes/campaign.js");
const user_js_1 = require("./routes/user.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Mount routers
app.use("/leads", leads_js_1.leadsRouter);
app.use("/user", user_js_1.userRouter);
app.use("/campaign", campaign_js_1.campaignRouter);
// Connect to MongoDB first, then start scheduler and listen
mongoose_1.default
    .connect("mongodb+srv://garv:garvgarv@cluster0.43igc.mongodb.net/digital")
    .then(() => {
    console.log("✅ Connected to MongoDB");
    // Scheduler: runs every 10 seconds
    setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        const now = new Date();
        console.log(`\n[Scheduler] Checking campaigns at ${now.toISOString()}`);
        try {
            const campaigns = yield mongoose_js_1.CampaignModel.find({
                scheduledTime: { $lte: now },
                sent: false
            });
            console.log(`[Scheduler] Found ${campaigns.length} campaign(s) to send`);
            for (const campaign of campaigns) {
                for (const email of campaign.leadList) {
                    console.log(`→ Sending email to ${email} for campaign "${campaign.campaignName}"`);
                }
                // Mark as sent so it won’t run again
                yield mongoose_js_1.CampaignModel.updateOne({ _id: campaign._id }, { $set: { sent: true } });
            }
        }
        catch (e) {
            console.error("[Scheduler] Error running scheduler:", e);
        }
    }), 10 * 1000); // every 10 seconds
    app.listen(3000, () => {
        console.log("🚀 Server listening on port 3000");
    });
})
    .catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
});
