const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    userId:{type: mongoose.Types.ObjectId, ref:'User'},
    title:{type: String, requuired: true},
    category:{type: String, required: true},
    image:{type: String, required: true},
    desc:{type: String, required: true},
    likes:{type:[string], default:[]},
    views:{type: Number, default: 0}
},{timestamps: true})

module.exports = mongoose.model('Blog', blogSchema)