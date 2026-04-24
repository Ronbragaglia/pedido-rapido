const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.create = async (req, res) => {
  try {
    const { restaurantId, items, address, lat, lng } = req.body
    const menuItems = await prisma.menuItem.findMany({
      where: { id: { in: items.map((i) => i.menuItemId) } },
    })
    const total = items.reduce((sum, item) => {
      const mi = menuItems.find((m) => m.id === item.menuItemId)
      return sum + (mi ? mi.price * item.quantity : 0)
    }, 0)

    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        restaurantId,
        total,
        address,
        lat,
        lng,
        items: {
          create: items.map((item) => {
            const mi = menuItems.find((m) => m.id === item.menuItemId)
            return { menuItemId: item.menuItemId, quantity: item.quantity, price: mi?.price || 0 }
          }),
        },
      },
      include: { items: { include: { menuItem: true } }, restaurant: true },
    })

    const io = req.app.get('io')
    io.to(`restaurant:${restaurantId}`).emit('order:new', order)

    res.status(201).json({ order })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.list = async (req, res) => {
  const where = {}
  if (req.user.role === 'CUSTOMER') where.userId = req.user.id
  else if (req.user.role === 'RESTAURANT') {
    const rest = await prisma.restaurant.findFirst({ where: { userId: req.user.id } })
    if (rest) where.restaurantId = rest.id
  }
  const orders = await prisma.order.findMany({
    where,
    include: { items: { include: { menuItem: true } }, restaurant: true },
    orderBy: { createdAt: 'desc' },
  })
  res.json({ orders })
}

exports.getById = async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { id: Number(req.params.id) },
    include: { items: { include: { menuItem: true } }, restaurant: true },
  })
  if (!order) return res.status(404).json({ message: 'Pedido nao encontrado' })
  res.json({ order })
}

exports.updateStatus = async (req, res) => {
  const { status } = req.body
  const order = await prisma.order.update({
    where: { id: Number(req.params.id) },
    data: { status },
    include: { items: { include: { menuItem: true } }, restaurant: true },
  })
  const io = req.app.get('io')
  io.to(`order:${order.id}`).emit('order:status', { orderId: order.id, status })
  res.json({ order })
}

exports.track = async (req, res) => {
  const order = await prisma.order.findUnique({
    where: { id: Number(req.params.id) },
    include: { restaurant: true },
  })
  if (!order) return res.status(404).json({ message: 'Pedido nao encontrado' })
  res.json({ order })
}
