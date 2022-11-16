const { Router } = require('express')
const { isAuthenticated } = require('../../../controllers/auth/middleware')

const router = Router()

router.get('/', isAuthenticated)

module.exports = router