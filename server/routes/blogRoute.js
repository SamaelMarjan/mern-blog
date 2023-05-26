const { createBlog, getAllBlog, getSingleBLog, updateBlog, deleteBlog, likeBlog } = require('../controllers/blogController')
const { verifyToken } = require('../middlewares/verifyToken')

const router = require('express').Router()

//create blog route
router.post('/create', verifyToken, createBlog)

//get all blog route
router.get('/get', getAllBlog)

//get single blog route
router.get('/get/:id', getSingleBLog)

//upadte blog route
router.put('/edit/:id', verifyToken, updateBlog)

//delete blog route
router.delete('/delete/:id', verifyToken, deleteBlog)

//like blog route
router.put('/like/:id', verifyToken, likeBlog)

module.exports = router