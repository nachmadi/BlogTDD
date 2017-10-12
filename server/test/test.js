const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const user = require('../models/User');
var server = "http://localhost:3000";
var xId = null;
var xEmail=null;
//const app = require('../app.js')

const newUser = {
  user_id: "nachmadi",
  user_pass: "123",
  nama: "Noor Achmadi",
  email: "nachmadi@mail.com"
}

chai.use(chaiHttp)

describe('API endpoint create new User', function(){
  // beforeEach(function(done){
  //   done();
  // });
  //
  // afterEach(function(done){
  //   var mongoose = require("mongoose");
  //   var con = mongoose.connect('mongodb://localhost/tdd');
  //       mongoose.connection.on('open', function(){
  //       con.connection.db.dropDatabase(function(err, result){
  //         if(err){
  //           console.log("eererer",err);
  //           done();
  //         }else{
  //           console.log("sukses",result);
  //           done();
  //         }
  //       });
  //   });
  // });

  it('Harus mengembalikan data user yang dipost', function(done){
    //chai.request(app)
    chai.request(server)
    .post('/users/signup')
    .send(newUser)
    .end(function(err, response) {
      response.status.should.equal(200)
      response.body.should.be.an('Object')
      response.body.should.have.property('_id')
      response.body.should.have.property('user_id')
      response.body.should.have.property('user_pass')
      response.body.should.have.property('nama')
      response.body.should.have.property('email')
      response.body.should.have.property('salt')
      response.body.user_id.should.equal('nachmadi')
      response.body.email.should.equal('nachmadi@mail.com')
      xId=response.body._id;
      xEmail=response.body.email;
      done() // async , agar semua proses cek dapat dijalankan
    })
  })

  it('should list ALL users on /users GET', function(done) {
    chai.request(server)
      .get('/users')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('user_id');
        res.body[0].should.have.property('email');
        done();
      });
  });

  it('should list a SIG-IN user on /users/<id> GET', function(done) {
    chai.request(server)
      .get(`/users`)
      .send({email:"nachmadi", user_pass: "123"})
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        // res.body.should.have.property('user_id');
        // res.body.should.have.property('email');
        done();
    });
  });

  it('should list a SINGLE user on /users/<id> GET', function(done) {
    chai.request(server)
      .get(`/users/${xId}`)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('user_id');
        res.body.should.have.property('email');
        done();
    });
  });

  it('should update a SINGLE user on /users/<id> PUT', function(done) {
      chai.request(server)
        .put(`/users/${xId}`)
        .send({'nama': 'Nachmadi'})
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body._id.should.have.equal(xId);
          done();
      });
  });

  it('should delete a SINGLE user on /users /<id> DELETE', function(done) {
      chai.request(server)
        .delete(`/users/${xId}`)
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body.n.should.have.equal(1);
          response.body.ok.should.have.equal(1);
          done();
      });
  });



})
