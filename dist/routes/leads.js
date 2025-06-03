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
exports.leadsRouter = void 0;
const express_1 = require("express");
const mongoose_1 = require("../db/mongoose");
exports.leadsRouter = (0, express_1.Router)();
exports.leadsRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, userId } = req.body;
    try {
        const newLead = yield mongoose_1.leadModel.create({
            email,
            userId
        });
        res.json({
            message: "New lead added",
            lead: newLead
        });
    }
    catch (e) {
        res.status(304).json({
            error: e
        });
    }
}));
exports.leadsRouter.get("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const leadsForUser = yield mongoose_1.leadModel.find({
            userId
        });
        const emails = leadsForUser.map(lead => lead.email);
        res.json({
            message: "Here are all the leads for user ",
            leads: emails
        });
    }
    catch (e) {
        res.status(500).json({
            error: e
        });
    }
}));
