var usersModel=require('../models/users');
exports.addUser=function(req,res,next){
    var user={}
    user.id=req.body.id;
    user.name=req.body.name;
    user.score=0;
    var users= new usersModel(user);
    users.save(function(err,data){
        if(err){
            res.status(400).json({status:'user not saved'});
            return;
        }
        
        res.status(200).json({status:'user saved'});
    });
}


exports.deleteUser=function(req,res,next){

    var id=req.body.id;
    usersModel.find({id:id}).remove(function(err,data){
        if(err){
            res.status(400).json({status:'user not deleted'});
            return;
        }
        
        res.status(200).json({status:'user deleted'});
    });
}