import {Router} from "express"
import { leadModel } from "../db/mongoose";
export const leadsRouter = Router()

leadsRouter.post("/create",async(req,res)=>{
    const {email,userId} = req.body();
    try{
        const newLead = await leadModel.create({
            data:{
                email,
                userId
            }
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