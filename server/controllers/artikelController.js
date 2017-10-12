const Artikel= require('../models/Artikel');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
  createArtikel : (req,res)=>{
               Artikel.create({
                  title:req.body.title,
                  content: req.body.content,
                  author: req.body.author
                })
                .then(data=>{
                   res.send(data);
                })
                .catch(err=>{
                  res.send(err);
                })
  },
  getAllArtikel:(req, res)=> {
               Artikel.find()
               .then(artikel => {
                  //res.send({students:allStudents});
                  res.send(artikel);
               })
               .catch(err=>{
                 res.send(err);
               })
  },
  getOneArtikel: (req, res)=>{
              var id = req.params._id;
              var o_id = new ObjectId(id);
              var query = {_id:o_id}
              Artikel.findOne(query)
              .then(artikel => {
                  res.send(artikel);
              })
              .catch(err=>{
                res.send(err);
              })
  },
  delOneArtikel: (req, res)=>{
              var id = req.params._id;
              var o_id = new ObjectId(id);
              var query = {_id:o_id}
              Artikel.deleteOne(query)
              .then(result => {
                  res.send(result);
              })
              .catch(err=>{
                res.send(err);
              })
  },
  updateArtikel: (req, res)=>{
              var id = req.params.id;
              var query = {_id:id}
              Artikel.findOneAndUpdate(query,{
                    title : req.body.title,
                    content : req.body.content,
                    author : req.body.author
              })
              .then(result=>{
                  res.send(result);
              })
              .catch(err=>{
                  res.send(err);
              })
  }
}
