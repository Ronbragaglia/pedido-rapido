const router = require('express').Router()
const c = require('../controllers/restaurantController')
const { auth, requireRole } = require('../middleware/auth')

router.get('/', c.list)
router.get('/:id', c.getById)
router.post('/:id/menu', auth, requireRole('RESTAURANT'), c.createMenuItem)
router.put('/:id/menu/:itemId', auth, requireRole('RESTAURANT'), c.updateMenuItem)
router.delete('/:id/menu/:itemId', auth, requireRole('RESTAURANT'), c.deleteMenuItem)

module.exports = router
