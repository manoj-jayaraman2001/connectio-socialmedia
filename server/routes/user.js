const express = require('express')
const {getUser, getUserFriends} = require('../controllers/user')
const verifyToken = require('../middlewares/auth')

const router = express.Router()

// read (get req)
router.get('/:id', verifyToken, getUser)
router.get('/:id/friends', verifyToken, getUserFriends)
// router.patch('/:id/update-profile', verifyToken, updateProfile)
module.exports = router