var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var userController=require('./controllers/users');
var gameController=require('./controllers/game');
var config=require('./config/config');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.post('/addUser',userController.addUser);
app.delete('/delUser',userController.deleteUser);
app.post('/play',gameController.Play);
app.post('/realTimePlay',gameController.realTimePlay);
app.get('/score/:userId',gameController.score);
app.listen(config.port||3000);
console.log('listening on specified port');
module.exports=app;//exporting the app object so it the entire app can be used as a module