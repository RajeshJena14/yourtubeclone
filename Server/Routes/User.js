import express from "express"
import { login } from "../Controllers/Auth.js"
import { pointscontroller } from "../Controllers/points.js"
import { updatechaneldata, getallchanels } from "../Controllers/channel.js"
const routes = express.Router()

routes.post('/login', login)
routes.patch('/update/:id', updatechaneldata)
routes.get('/getallchannel', getallchanels)

routes.patch('/points/:id', pointscontroller)

export default routes;