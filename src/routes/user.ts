import {Router} from "express"
import { UserModel } from "../db/mongoose";
export const userRouter = Router();

userRouter.post("/create",async(req,res)=>{
    const {name,email,password} = req.body;
    try{
        const newUser = await UserModel.create({
            name,
            email,
            password
        })
        res.json({
            message:"New user created",
            user:newUser
        })
    }catch(e){
        res.status(500).json({
            error:e
        })
    }
})
