const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const Artikel = require('../models/Artikel');
var server = "http://localhost:3000";
var xId = null;
//const app = require('../app.js')

const newArticle = {
  title: 'Jainal Anak Sholeh',
  content: 'Mari Join',
  author: 'Jainal donk'
}

chai.use(chaiHttp)

describe('API endpoint create new article', function(){
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

  it('harus mengembalikan data artikel yang dipost', function(done){
    //chai.request(app)
    chai.request(server)
    .post('/artikels')
    .send(newArticle)
    .end(function(err, response) {
      response.status.should.equal(200)
      response.body.should.be.an('Object')
      response.body.should.have.property('_id')
      response.body.should.have.property('title')
      response.body.should.have.property('content')
      response.body.should.have.property('author')
      response.body.title.should.equal('Jainal Anak Sholeh')
      response.body.content.should.equal('Mari Join')
      xId=response.body._id;
      done() // async , agar semua proses cek dapat dijalankan
    })
  })

  it('should list ALL Artikel on /artikels GET', function(done) {
    chai.request(server)
      .get('/artikels')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('title');
        res.body[0].should.have.property('content');
        res.body[0].should.have.property('author');
        done();
      });
  });

  it('should list a SINGLE artikel on /artikels/<id> GET', function(done) {
    chai.request(server)
      .get(`/artikels/${xId}`)
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('title');
        res.body.should.have.property('content');
        res.body.should.have.property('author');
        done();
    });
  });

  it('should update a SINGLE artikel on /artikels/<id> PUT', function(done) {
      chai.request(server)
        .put(`/artikels/${xId}`)
        .send({'title': 'Nilai update baru'})
        .end(function(error, response){
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('object');
          response.body._id.should.have.equal(xId);
          done();
      });
  });

  it('should delete a SINGLE Artikel on /artikels /<id> DELETE', function(done) {
      chai.request(server)
        .delete(`/artikels/${xId}`)
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
