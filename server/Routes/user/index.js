const {Router} = require('express')

const buy = require('./buysell/buy')
const sell = require('./buysell/sell')
const portfolio = require('./portfolio/portfolio')
const webportfolio = require('./portfolio/webport')
const chart = require('./portfolio/chart')
const createPortfolio = require('./userData/createPortfolio')
const checkUser = require('./userData/checkUser')
const getUserData = require('./userData/getUserData')

const router = Router()

router.use('/buy', buy)
router.use('/sell', sell)
router.use('/createPortfolio', createPortfolio)
router.use('/portfolio', portfolio)
router.use('/webportfolio', webportfolio)
router.use('/checkUser', checkUser)
router.use('/chart', chart)
router.use('/getCred', getUserData)

module.exports = router