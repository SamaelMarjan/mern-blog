const { createBlog, getAllBlog, getSingleBLog, updateBlog, deleteBlog, likeBlog } = require('../controllers/blogController')
const { verifyToken } = require('../middlewares/verifyToken')
const multer = require('multer')
const router = require('express').Router()

//img storage path
const imgconfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        callback(null, `image-${file.originalname}`)
    }
})

//img filter
const isImage = (req, res, callback) => {
    if(file.mimetype.startsWith('image')) {
        callback(null, true)
    } else {
        callback(new Error('Only image is allowed'))
    }
}

const upload = multer({
    storage: imgconfig,
    filefilter: isImage
})

//create blog route
router.post('/create', upload.single('image'), verifyToken, createBlog)

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