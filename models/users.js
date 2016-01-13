var mongoose = require('../database/database.js');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    id:Number,
    name:String,
    score:Number
    
});
var User = mongoose.model('User', userSchema);
module.exports=User;