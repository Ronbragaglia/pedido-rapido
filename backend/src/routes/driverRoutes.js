const router = require('express').Router()
const { PrismaClient } = require('@prisma/client')
const { auth, requireRole } = require('../middleware/auth')
const prisma = new PrismaClient()

router.get('/available', auth, requireRole('DRIVER'), async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { status: 'READY', driverId: null },
    include: { restaurant: true, items: { include: { menuItem: true } } },
    orderBy: { createdAt: 'desc' },
  })
  res.json({ orders })
})

router.post('/accept/:orderId', auth, requireRole('DRIVER'), async (req, res) => {
  const order = await prisma.order.update({
    where: { id: Number(req.params.orderId) },
    data: { driverId: req.user.id, status: 'DELIVERING' },
    include: { restaurant: true, items: { include: { menuItem: true } } },
  })
  const io = req.app.get('io')
  io.to(`order:${order.id}`).emit('order:status', { orderId: order.id, status: 'DELIVERING' })
  res.json({ order })
})

router.put('/location', auth, requireRole('DRIVER'), async (req, res) => {
  const { lat, lng, orderId } = req.body
  const io = req.app.get('io')
  io.to(`order:${orderId}`).emit('driver:location', { lat, lng, driverId: req.user.id })
  res.json({ ok: true })
})

router.put('/complete/:orderId', auth, requireRole('DRIVER'), async (req, res) => {
  const order = await prisma.order.update({
    where: { id: Number(req.params.orderId) },
    data: { status: 'DELIVERED' },
  })
  const io = req.app.get('io')
  io.to(`order:${order.id}`).emit('order:status', { orderId: order.id, status: 'DELIVERED' })
  res.json({ order })
})

module.exports = router
