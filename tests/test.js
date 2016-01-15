var should = require('should'); 
var assert = require('assert');
var request = require('supertest');
var config=require('../config/config');
var mongoose = require('mongoose');
describe('Test Suite for Testing Bowling Rest API', function() {
  var url = config.test_url+':'+config.port;

 
  describe('Test for Adding new User ', function() {
    it('should add a user', function(done) {
      var profile = {
            id:4,
            name:"pranav"
      };

    request(url)
	.post('/addUser')
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.equal(200);
          done();
        });
    });
      
    it('Adding duplicate user fails', function(done) {
      var profile = {
            id:4,
            name:"pranav"
      };

    request(url)
	.post('/addUser')
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.equal(400);
          done();
        });
    });  
   
  });
    
    
  describe('Testing the realTimePlay function ', function() {
    it('should return  the running score of the user', function(done) {
      var profile = {
            id:4,
            score:'x'
      };

    request(url)
	.post('/realTimePlay')
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.equal(200);
          res.body.score.should.equal(10);
           
          done();
        });
    });
      
     it('should fail if incorrect user id is provided', function(done) {
      var profile = {
            id:9,
            score:'x'
      };

    request(url)
	.post('/realTimePlay')
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.equal(400);
           
          done();
        });
    });
      
      
     it('should fail if invalid string is passed as value of throw', function(done) {
      var profile = {
            id:4,
            score:'a'
      };

    request(url)
	.post('/realTimePlay')
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.equal(400);
           
          done();
        });
    }); 
      
      it('should update score of existing user based on value of the current throw', function(done) {
      var profile = {
            id:4,
            score:'2'
      };

    request(url)
	.post('/realTimePlay')
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.equal(200);
          res.body.score.should.equal(14);
           
          done();
        });
    });
      
      
      
   
   
  });
    
    
    
    describe('Testing the score function ', function() {
    it('should return correct score and username of user ', function(done) {

    request(url)
	.get('/score/4')
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.equal(200);
          res.body.score.should.equal(14);
          res.body.user_name.should.equal('pranav');
          done();
        });
    });
        
   it('should throw an error if user does not exist', function(done) {

    request(url)
	.get('/score/6')
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.equal(400);
          done();
        });
    });
      
   
   
  });
    
    
    
    describe('Testing the play function', function() {
    it('XXXXXXXXXXXX should return 300', function(done) {
      var profile = {
            id:4,
            string:"XXXXXXXXXXXX"
      };

    request(url)
	.post('/play')
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.body.score.should.equal(300);
          res.status.should.equal(200);
          done();
        });
    });
        
        
    it('90909090909090909090 should return 90', function(done) {
      var profile = {
            id:4,
            string:"90909090909090909090"
      };

    request(url)
	.post('/play')
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.body.score.should.equal(90);
          res.status.should.equal(200);
          done();
        });
    });
        
    it('5/5/5/5/5/5/5/5/5/5/5 should return 150', function(done) {
      var profile = {
            id:4,
            string:"5/5/5/5/5/5/5/5/5/5/5"
      };

    request(url)
	.post('/play')
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.body.score.should.equal(150);
          res.status.should.equal(200);
          done();
        });
    });
    
    it('X7/729/XXX236/7/3 should return 168', function(done) {
      var profile = {
            id:4,
            string:"X7/729/XXX236/7/3"
      };

    request(url)
	.post('/play')
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.body.score.should.equal(168);
          res.status.should.equal(200);
          done();
        });
    });
        
    it('00000000000000000000 should return 0', function(done) {
      var profile = {
            id:4,
            string:"00000000000000000000"
      };

    request(url)
	.post('/play')
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.body.score.should.equal(0);
          res.status.should.equal(200);
          done();
        });
    });
        
    it('01273/X5/7/345400X70 should return 113', function(done) {
      var profile = {
            id:4,
            string:"01273/X5/7/345400X70"
      };

    request(url)
	.post('/play')
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.body.score.should.equal(113);
          res.status.should.equal(200);
          done();
        });
    });
        
    it('X7/90X088/06XXX81 should return 167', function(done) {
      var profile = {
            id:4,
            string:"X7/90X088/06XXX81"
      };

    request(url)
	.post('/play')
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.body.score.should.equal(167);
          res.status.should.equal(200);
          done();
        });
    });
        
        
        it('Passing an invalid string should throw an error', function(done) {
      var profile = {
            id:4,
            string:"xa001"
      };

    request(url)
	.post('/play')
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          
          res.status.should.equal(400);
          done();
        });
    });
      
   
   
  });
    
    
    
    
    
    describe('Test for deleting existing User ', function() {
    it('should delete a user', function(done) {
      var profile = {
            id:4
      };

    request(url)
	.delete('/delUser')
	.send(profile)
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          res.status.should.equal(200);
          done();
        });
    });
        
        
       
      
   
   
  });
    
    
    
    
    
});


////


