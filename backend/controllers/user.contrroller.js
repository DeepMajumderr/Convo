import User from "../models/user.model.js"

export const  getCurrentUser = async (req,res) => {
    try {
        let userId=req.userId
        let user=await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({messaage:"user not found"})
        }

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({messaage:`current user error ${error}`})
    }
}