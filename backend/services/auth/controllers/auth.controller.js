import crypto from "crypto";
import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../model/user.model.js";
import redis from "../../../shared/redis/redis.js";

export const login=async(req,res)=>{
    try{
        const { token } = req.body;

        if (!token || typeof token !== "string") {
            return res.status(400).json({
                message: "Firebase ID token is required"
            });
        }

        const decoded = await getAuth(app).verifyIdToken(token);
        let user = await User.findOne({
           firebaseId: decoded.uid 
        });

        if (!user) {
            user = await User.create({
                firebaseId: decoded.uid,
                email: decoded.email,
                name: decoded.name,
                avatar: decoded.picture || decoded.avatar_url || ""
            });
        }

        const sessionId = crypto.randomUUID();

        await redis.set(
    `session-${sessionId}`,
    JSON.stringify({
        userId: user._id.toString(),
        email: user.email,
        name: user.name,
        avatar: user.avatar
    }),
    "EX",
    60 * 60 * 24 * 7
);

        res.cookie("session", sessionId, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7
        });

        return res.status(200).json(user);

    } catch (error) {
        console.error("Login error:", error);
        return res.status(401).json({
            message: "Invalid or expired Firebase token",
            error: error.message || "Unknown error"
        });
    }
}

export const logout=async(req,res)=>{
    try{
        const sessionId=req.cookies.session;
        await redis.del(`session-${sessionId}`);
        res.clearCookie("session");
        return res.status(200).json({message:"Logged out successfully"})
    } catch(error){
        res.status(500).json({message:"Internal server error"})
    }
}