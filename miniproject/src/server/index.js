// add dependencies
const express = require('express') 
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')

const app = express() // เรียกใช้ express
const PORT =  process.env.PORTSERVER || 3001// client port
app.use(cors()) // เรียกใช้ cors

const server = http.createServer(app) //สร้าง server โดยทำการเชื่อม app เข้ากับ server
const hostDefault = 'http://localhost:3000' // port react
const io = new Server(server, {
	cors: {
		origin: hostDefault,
		methods: ['GET', 'POST'],
	},

});          
//kittiphat
io.on('connection', (socket) => {

	console.log('User connected:' + socket.id)

	//เข้าาร่วมห้อง
	socket.on('join_room', (data) => {
		socket.join(data)
		console.log('User ID: ' + socket.id + 'join Room:'+ data)

	}) 
	
	//ส่งข้อมูล
	socket.on('send_message', (data) => {
		socket.to(data.room).emit('receive_message', data)
	})

	//ยกเลิกการเชื่อมต่อ
	socket.on('disconnect', () =>{
		console.log('User Disconnected', socket.id)
	})
})
//เชื่อมต่อ PORT แล้วรัน server 
server.listen(PORT, () => {
	console.log('SERVER IS RUN localhost:'+PORT);
})
