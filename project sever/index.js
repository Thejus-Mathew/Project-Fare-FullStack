require('dotenv').config()

const express = require('express')
const cors = require('cors')

const router = require('./Router/router')
require('./DB/connection')
const server = express()

server.use(cors())
server.use(express.json())

server.use(router)

server.use('/uploads',express.static('./uploads'))

const PORT = process.env.PORT || 3000


server.listen(PORT,()=>{
    console.log('server started running at PORT:',`http://localhost:${PORT}`);
})

server.get('/',(req,res)=>{
    res.status(200).send('<h1>Server started running and waiting for the client request</h1>')
})


