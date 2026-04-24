require('dotenv').config()
const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

const app = express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: '*' } })

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }))

app.set('io', io)

app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/restaurants', require('./routes/restaurantRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))
app.use('/api/driver', require('./routes/driverRoutes'))

app.get('/api/health', (_, res) => res.json({ status: 'ok' }))

io.on('connection', (socket) => {
  socket.on('join', (room) => socket.join(room))
  socket.on('leave', (room) => socket.leave(room))
})

const PORT = process.env.PORT || 4000
server.listen(PORT, () => console.log(`PedidoRapido API running on port ${PORT}`))
