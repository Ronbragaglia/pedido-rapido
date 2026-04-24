const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const sign = (id) => jwt.sign({ id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' })

exports.register = async (req, res) => {
  try {
    const { name, email, password, role = 'CUSTOMER' } = req.body
    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) return res.status(400).json({ message: 'Email ja cadastrado' })
    const hashed = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({ data: { name, email, password: hashed, role } })
    const token = sign(user.id)
    res.status(201).json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: 'Credenciais invalidas' })
    const token = sign(user.id)
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, token })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.me = async (req, res) => {
  res.json({ user: req.user })
}
