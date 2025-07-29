import uploadOnCloudinary from "../config/cloudinary.js"
import User from "../models/user.model.js"

export const getCurrentUser = async (req, res) => {
    try {

        let userId = req.userId
        let user = await User.findById(userId).select("-password")
        if (!user) {
            return res.status(400).json({ messaage: "user not found" })
        }

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({ messaage: `current user error ${error}` })
    }
}

export const editProfile = async (req, res) => {
    try {

        let { name } = req.body
        let image
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }

        let user = await User.findByIdAndUpdate(req.userId, {
            name,
            image
        }, {new: true})

        if (!user) {
            return res.status(400).json({ message: "user not found !" })
        }

        return res.status(200).json(user)

    } catch (error) {
        return res.status(500).json({ messaage: `profile error ${error}` })
    }
}

export  const getOtherUsers = async(req,res) => {
    try {
        let users = await User.find({
            _id:{$ne:req.userId}
        }).select("-password")

        return res.status(200).json(users)

    } catch (error) {
         return res.status(500).json({ messaage: `get other user error ${error}` })
    }
}

// export const search = async(req,res) => {
//     try {
//         let {query} = req.query
//         if(!query){
//             return res.status(400).json({message:  "query is required"})
//         }

//         let users = await User.find({
//             $or:[
//                 {name: {$regex: query, $options:"i"}},
//                 {userName: {$regex: query, $options:"i"}},
//             ]
//         })

//         return res.status(200).json(users)

//     } catch (error) {
//         return res.status(500).json({ messaage: `search user error ${error}` })
//     }
// }


export const search = async (req, res) => {
    try {
        const { query } = req.query;

        // Check if query is provided
        if (!query) {
            return res.status(400).json({ message: "Query is required" });
        }

        // Get current user's ID from req.user
        const currentUserId = req.userId;

        if (!currentUserId) {
            return res.status(401).json({ message: "Unauthorized: user ID not found" });
        }

        // Search for users excluding the current user
        const users = await User.find({
            $and: [
                { _id: { $ne: currentUserId } }, // Exclude current user
                {
                    $or: [
                        { name: { $regex: query, $options: "i" } },
                        { userName: { $regex: query, $options: "i" } },
                    ],
                },
            ],
        }).select("-password"); // Exclude password field from results

        return res.status(200).json(users);

    } catch (error) {
        console.error("Search error:", error);
        return res.status(500).json({ message: `Search user error: ${error.message}` });
    }
};