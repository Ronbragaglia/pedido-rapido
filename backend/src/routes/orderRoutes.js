const router = require('express').Router()
const c = require('../controllers/orderController')
const { auth } = require('../middleware/auth')

router.post('/', auth, c.create)
router.get('/', auth, c.list)
router.get('/:id', auth, c.getById)
router.put('/:id/status', auth, c.updateStatus)
router.get('/:id/track', auth, c.track)

module.exports = router
