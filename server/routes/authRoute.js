const { createUser, loginUser } = require('../controllers/authController')

const router = require('express').Router()

//user create route
router.post('/register', createUser)

//user login route
router.post('/login', loginUser)

module.exports = router