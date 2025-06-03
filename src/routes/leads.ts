import {Router} from "express"
import { leadModel } from "../db/mongoose";
export const leadsRouter = Router()

leadsRouter.post("/create",async(req,res)=>{
    const {email,userId} = req.body;
    try{
        const newLead = await leadModel.create({
            email,
            userId
        })
        res.json({
            message:"New lead added",
            lead:newLead
        })
    }catch(e){
        res.status(304).json({
            error:e
        })
    }
})

leadsRouter.get("/:userId",async(req,res)=>{
    const userId = req.params.userId;
    try{
        const leadsForUser = await leadModel.find({
            userId
        })
        const emails = leadsForUser.map(lead => lead.email);
        res.json({
            message:"Here are all the leads for user ",
            leads:emails
        })
    }catch(e){
        res.status(500).json({
            error:e
        })
    }
})