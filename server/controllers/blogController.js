const blogModel = require('../models/blog')

//create blog controller
module.exports.createBlog  = async(req, res) => {
    try {
        const {title, category, desc} = req.body
        const {filename} = req.file
        //valodations
        if(!title) return res.json({message: "Title is required"})
        if(!category) return res.json({message: "Category is required"})
        if(!filename) return res.json({message: "Image is required"})
        if(!desc) return res.json({message: "Description is required"})
        //create
        const blog = await blogModel({title, category, image: filename, desc, userId: req.user._id}).save()
        res.status(200).json({
            success: true, message: 'Blog created successfully', blog
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: 'Something wrong when creating blog'
        })
    }
}

//get all blogs controller
module.exports.getAllBlog = async(req, res) => {
    try {
        const blog = await blogModel.find().populate('userId', '-password -confirmpassword')
        res.status(200).json({
            success: true, message: "All blogs", blog
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: 'Something wrong when getting all blogs'
        })
    }
}

//get single blog by id
module.exports.getSingleBLog = async(req, res) => {
    try {
        const {id} = req.params
        const blog = await blogModel.findById(id).populate('userId', '-password -confirmpassword')
        blog.views += 1
        await blog.save()
        res.status(200).json({
            success: true, message: "Single blog", blog
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: 'Something wrong when getting single blog'
        })
    }
}

//update blog controller
module.exports.updateBlog = async(req, res) => {
    try {
        const {id} = req.params
        const {title, category, desc, image} = req.body
        const {filename} = req.file
        const updateBlog = await blogModel.findById(id)
        //validate only user can update blog
        if(updateBlog.userId.toString() !== req.user._id.toString()) {
            return res.status(404).json({message: "Only user can update blog"})
        }
        //update blog
        const blog = await blogModel.findByIdAndUpdate(id, {title, category, desc, image: filename}, {new: true})
        res.status(200).json({
            success: true, message: 'Successfully updated blog', blog
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: 'Something wrong when updating blog'
        })
    }
}

//delete blog controller
module.exports.deleteBlog = async(req, res) => {
    try {
        const {id} = req.params
        const blogDelete = await blogModel.findById(id)
        //validate only user can delete blog
        if(blogDelete.userId.toString() !== req.user._id.toString()) {
            return res.status(404).json({message: "Only user can delete blog"})
        }
        //delete
        const blog = await blogModel.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "Deleted successfully"})
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: 'Something wrong when deleting blog'
        })
    }
}

//like blog
module.exports.likeBlog = async(req, res) => {
    try {
        const {id} = req.params
        const blog = await blogModel.findById(id)
        if(blog.likes.includes(req.user._id)) {
            blog.likes = blog.likes.filter((userId) => userId !== req.user._id)
            await blog.save()
            return res.status(200).json({
                message: 'Successfully unliked blog',
                blog: blog
            })
        } else {
            blog.likes.push(req.user._id)
            await blog.save()
            return res.status(200).json({message: 'Successfully like blog', blog: blog})
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success: false, message: 'Something wrong when try to like blog'
        })
    }
}