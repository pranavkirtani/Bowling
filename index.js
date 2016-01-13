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
app.get('/realTimePlay/:score/:userId',gameController.realTimePlay);
app.get('/score/:userId',gameController.score);
app.listen(config.port||3000);