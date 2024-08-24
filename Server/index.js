import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser"
import videoroutes from './Routes/video.js'
import userroutes from "./Routes/User.js"
import path from 'path'
import commentroutes from './Routes/comment.js'
import http from 'http'
import { Server } from 'socket.io'

dotenv.config()
const app = express()

app.use(cors())


app.use(express.json({ limit: "30mb", extended: true }))
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use('/uploads', express.static(path.join('uploads')))

app.get('/', (req, res) => {
	res.send("Your tube is working")
})


app.use(bodyParser.json())
app.use('/user', userroutes)
app.use('/video', videoroutes)
app.use('/comment', commentroutes)

const PORT = process.env.PORT

// mongoose.connect("mongodb+srv://rkjrajesh2004:Rajesh123@cluster0.dszppoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
// 	console.log("Mongodb Database connected")
// }).catch((error) => {
// 	console.log(error)
// })

const uri = "mongodb+srv://rkjrajesh2004:Rajesh123@cluster0.dszppoa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}
run().catch(console.dir);

const server = http.createServer(app)

const io = new Server(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"]
	}
});
io.on("connection", (socket) => {
	socket.on("room:join", () => {
		socket.emit('room:join', socket.id)
	});
	console.log(socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});

	socket.on("shareUser", ({ userToShare, signalData, from, name }) => {
		io.to(userToShare).emit("shareUser", { signal: signalData, from, name });
	});

	socket.on("answerScreen", (data) => {
		io.to(data.to).emit("screenAccepted", data.signal)
	});
});

server.listen(PORT, () => {
	console.log(`Server running on Port ${PORT}`)
})