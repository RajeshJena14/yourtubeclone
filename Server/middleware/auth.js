import jwt from "jsonwebtoken"
let privateKey = "youtubeclone"

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        let decodedata = jwt.verify(token, privateKey)
        req.userid = decodedata?.id
        next()
    } catch (error) {
        res.status(400).json("invalid credentials..")
        return
    }
}
export default auth