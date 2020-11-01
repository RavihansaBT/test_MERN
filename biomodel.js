const { Mongoose } = require("mongoose")
const mongoose = require('mongoose');

var bioSchema = mongoose.Schema({
    bio_id : {
        type : String
    },
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    created_at : {
        type : Date,
        default: Date.now
    },
    upload_files : {
        type : Array,
    }
});

var Bio = module.exports = mongoose.model('bio',bioSchema);

module.exports.get = function (callback, limit) {
    Bio.find(callback).limit(limit); 
 }