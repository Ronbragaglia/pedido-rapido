const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.list = async (req, res) => {
  const { search, category } = req.query
  const where = {}
  if (search) where.name = { contains: search, mode: 'insensitive' }
  if (category) where.category = category
  const restaurants = await prisma.restaurant.findMany({ where, orderBy: { rating: 'desc' } })
  res.json({ restaurants })
}

exports.getById = async (req, res) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: Number(req.params.id) },
    include: { menuItems: { where: { available: true } } },
  })
  if (!restaurant) return res.status(404).json({ message: 'Restaurante nao encontrado' })
  res.json({ restaurant })
}

exports.createMenuItem = async (req, res) => {
  const item = await prisma.menuItem.create({
    data: { ...req.body, restaurantId: Number(req.params.id) },
  })
  res.status(201).json({ item })
}

exports.updateMenuItem = async (req, res) => {
  const item = await prisma.menuItem.update({
    where: { id: Number(req.params.itemId) },
    data: req.body,
  })
  res.json({ item })
}

exports.deleteMenuItem = async (req, res) => {
  await prisma.menuItem.delete({ where: { id: Number(req.params.itemId) } })
  res.json({ message: 'Item removido' })
}
