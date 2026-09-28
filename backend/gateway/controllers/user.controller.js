export const getCurrentUser=async (req,res)=>{
    try{
        res.status(200).json({message:"current user",user:req.user})
    }catch(error){
        res.status(500).json({message:"Error fetching current user"})
    }
}