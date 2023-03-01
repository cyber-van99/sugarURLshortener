const mongoose = require("mongoose")
const shortId = require('shortid')


const urlSchema = new mongoose.Schema({
    fullUrl :{
        type : String,
        required : true
    },
    shortUrl : {
        type : String,
        default :shortId.generate
    }
})

module.exports = mongoose.model('sugarUrl',urlSchema)