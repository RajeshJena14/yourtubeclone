import User from "../Models/Auth.js"
import mongoose from "mongoose"
export const pointscontroller = async (req, res) => {
    const { id: _id } = req.params
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("User Not Logged in...")
    }
    try {
        const users = await User.findById(_id)
        const Points = users.points
        const updatepoint = await User.findByIdAndUpdate(_id, {
            $set: { points: Points + 5 }
        })
        res.status(200).json(updatepoint)
    } catch (error) {
        res.status(400).json("error", error)
    }
}