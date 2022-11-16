const { Router } = require('express')
const { isAuthenticated } = require('../../../controllers/auth/middleware')

const router = Router()

router.get('/', (req, res) => {
    try {
        res.send(req.user)
    } catch (error) {
        console.log(error.response.data.error);
    }
    
   
})

module.exports = router