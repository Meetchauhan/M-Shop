import User from "../models/user.model"

export const cartline = async(req, res)=>{
    const user = await User?.findById(req?.user?._id)
}