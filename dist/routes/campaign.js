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
Object.defineProperty(exports, "__esModule", { value: true });
exports.campaignRouter = void 0;
const express_1 = require("express");
const mongoose_1 = require("../db/mongoose");
exports.campaignRouter = (0, express_1.Router)();
exports.campaignRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, campaignName, scheduledTime, leadList } = req.body;
    try {
        const newCampaign = yield mongoose_1.CampaignModel.create({
            userId,
            campaignName,
            scheduledTime,
            leadList
        });
        res.json({
            message: "Created new campaign",
            campaign: newCampaign
        });
    }
    catch (e) {
        res.status(500).json({
            error: e
        });
    }
}));
