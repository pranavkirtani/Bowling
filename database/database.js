var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Bowling');
module.exports=mongoose;