import Conversation from "../models/conversation.model"
import Message from "../models/message.model"

export const createConversation=async (req,res)=>{
    try {
        const userId=req.headers["x-user-Id"]
        console.log("userId",userId)
        const conversation=await Conversation.create({
            userId:userId
        })
        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json({message:`create conversation error ${error} `})
    }
}

export const getConversations=async (req,res)=>{
    try {
        const userId=req.headers["x-user-Id"]
        console.log("userId",userId)
        const conversation=await Conversation.find({
            userId:userId
        }).sort({updatedAt:-1})
        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json({message:`get conversation error ${error} `})
    }
}

export const updateConversations=async (req,res)=>{
    try {
       const {id,title}=req.body
        const conversation=await Conversation.findByIdAndUpdate(id,{
            title
        })
        return res.status(200).json(conversation)
    } catch (error) {
        return res.status(500).json({message:`update conversation error ${error} `})
    }
}

export const saveMessage=async (req,res)=>{
    try {
        const {conversationId,role,content}=req.body
        const message=await Message.create({
            conversationId,
            content,
            role
        })
        return res.status(200).json(message)
    } catch (error) {
        return req.status(500).json({message:`save message error ${error}`})
    }
}

export const getMessage=async (req,res)=>{
    try {
        const {conversationId}=req.body
        const messages=await Message.create({
            conversationId
        }).sort({createdAt:-1})
        return res.status(200).json(messages)
    } catch (error) {
        return req.status(500).json({message:`get message error ${error}`})
    }
}