const jwt = require('jsonwebtoken')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const auth = async (req, res, next) => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ message: 'Token required' })
  try {
    const decoded = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET || 'secret')
    const user = await prisma.user.findUnique({ where: { id: decoded.id } })
    if (!user) return res.status(401).json({ message: 'User not found' })
    const { password, ...safe } = user
    req.user = safe
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}

const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) return res.status(403).json({ message: 'Sem permissao' })
  next()
}

module.exports = { auth, requireRole }
