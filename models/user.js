var mongoose = require('mongoose'),
    Schema = mongoose.Schema

    var field = {
        name: {type: String},
        mobile_no: {type: String},
        email_id:{type: String},
        address:{type:String},
        profile:{type: String},
        hobbies:[],
        area_in_interest:[]
    }

    var userSchema = new Schema(field, {timestamps: true})
    module.exports = mongoose.model('User', userSchema)