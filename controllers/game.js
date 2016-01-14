
var usersModel=require('../models/users');
exports.Play=function(req,res,next){
    var user_id=req.body.id;
    var character_string=req.body.string;
    var pattern= /^(x|\/|[0-9])*$/
    
    character_string=character_string.toLowerCase();
    if(!pattern.test(character_string)||character_string.split('').length<12||character_string.split('').length>21){
        res.status(400).json({status:'Invalid String'});
        return;
    
    }
     usersModel.findOne({_id:user_id},function(err,user){
          if(err){
                res.status(400).json({status:err});
                 return;
         }
          if(!user){
                res.status(400).json({status:'user not found'});
                 return;
        }
         user.frames=character_string;
         var score=user.score=playBowling(character_string);
         user.save(function(err,data){
             if(err){
                res.status(400).json({status:'user not saved'});
                 return;
             }
        
                res.status(200).json({status:'user saved',score:score});
         
         })
        
        
    
    });
  
   
    
    
    
    }
      
    

    


exports.realTimePlay=function(req,res,next){
    var user_id=req.body.id;
    var current_score=req.body.score;
    var pattern= /^(x|\/|[0-9])*$/
    if(!pattern.test(current_score)){
        res.status(400).json({status:'Invalid String'});
        return;
    
    }
    usersModel.findOne({_id:user_id},function(err,user){
        if(err){
                res.status(400).json({status:err});
                 return;
         }
          if(!user){
                res.status(400).json({status:'user not found'});
                 return;
        }
        if(user.frames){
            user.frames=user.frames+current_score;
        }
        else{
            user.frames=current_score;
        }
        user.score=playBowling(user.frames);
        user.save(function(err,data){
             if(err){
                res.status(400).json({status:'user not saved'});
                 return;
             }
        
                res.status(200).json({status:'user saved',score:user.score});
         
         })
        
        
    
    });
    

  
}

exports.score=function(req,res,next){
    var user_id=req.params.userId;
    usersModel.findOne({_id:user_id},function(err,user){
        if(err){
                res.status(400).json({status:err});
                 return;
         }
          if(!user){
                res.status(400).json({status:'user not found'});
                 return;
        }
        res.status(200).json({score:user.score,user_name:user.name});
        
    })

}

 function calculateNextThrowScore(throw_array,i,throw_count){
    if(!throw_array[i+1]){
        return 0;
    }
 
    else if(throw_array[i+1]=='x'){
        return 10;
    }
    else{
     return parseInt(throw_array[i+1]);
    }


}
 function calculateNextTwoThrows(throw_array,i,throw_count){
  if(!throw_array[i+1]){
        return 0;
    }
  else if(!throw_array[i+2]){
   					if(throw_array[i+1]=='x'){
            
              return 10;
            }
            else{
            return parseInt(throw_array[i+1])
            }
         
    }
 else if(throw_array[i+1]=='x'&&throw_array[i+2]=='x'){
     
        return 20;
    }
    else if(throw_array[i+1]=='x'&&throw_array[i+2]!='x'){
       var sum2=10+parseInt(throw_array[i+2]);
    
     return sum2;
    
    }
 		 else if(throw_array[i+2]=='/'){
     
        return 10;
    }
    else{
   
     var sum=parseInt(throw_array[i+1])+parseInt(throw_array[i+2]);
    
     return sum;
    
    }
    
 
 
 }



function playBowling(character_string){
    
    
      var throw_array=character_string.split('');//split so that  xxxx will be x,x,x,x
    var score_frame=[];
    var running_score=0;
    var throw_count=0;//number of throws per frame
    var i=0;
    for(var frame_count=0;frame_count<10;frame_count++){
              throw_count++;
        if(throw_array[i]=='x'&&throw_count==1){
            score_frame[frame_count]=10+calculateNextTwoThrows(throw_array,i,throw_count);
            
            throw_count=0;
            i++;
        }
        else if(throw_array[i]=='/'&&throw_count==2){
            score_frame[frame_count]=10+calculateNextThrowScore(throw_array,i,throw_count);
           
            throw_count=0;
            i++;
        }
        else{
            if(throw_count==1&&throw_array[i+1]&&throw_array[i+1]=='/'){
                score_frame[frame_count]=10+calculateNextThrowScore(throw_array,i+1,throw_count);
                i+=2;
                throw_count=0;
               
            
            }
            else if(throw_count==1&&throw_array[i+1]&&throw_array[i+1]!='/'){
                score_frame[frame_count]=parseInt(throw_array[i])+parseInt(throw_array[i+1]);
                i=i+2;
                throw_count=0;
               
            
            }
            else if(!throw_array[i+1]){
            	score_frame[frame_count]=parseInt(throw_array[i]);
              i=i+1;
            }
             
        }
       
        
        if(!isNaN(score_frame[frame_count])){
       
       		 running_score=running_score+score_frame[frame_count];
        
        }
       
        }
    
    return running_score;


}