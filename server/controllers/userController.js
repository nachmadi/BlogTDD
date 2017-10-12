const user = require('../models/User');
const halper = require('../helpers/util');
var jwt = require('jsonwebtoken');

module.exports = {
  // login
  signin : (req,res) => {
    user.findOne({
      email: req.body.email
    })
    .then(datauser => {
      let saltFrmDb = datauser.salt;
      let passFromCli = helper.getPassWithSalt(req.body.user_password,saltFrmDb);
      if(datauser.user_pass===passFromCli){
        jwt.sign({
                    user_id: datauser.user_id,
                    email: datauser.email,
                    nama: datauser.nama,
                    id: datauser._id
        }, process.env.SECRET_TOKEN,// modul require('dotenv').config() letak file di root
        { expiresIn: 60 * 60 },(err,token)=>{
             if(!err){
                res.send(token);
             }else{
                res.send(err);
             }
        });
      } else {
        res.send('password anda salah')
      }
    })
    .catch(err => {
      res.send(err)
    })
  },
  //daftar user baru
  signup : (req,res, next) => {
        user.findOne({
          email: req.body.email
        })
        .then(datauser=>{
          salt = helper.getRandom(5);
          md5_pass = halper.getPassWithSalt(req.body.user_pass, salt);
          user.create({
            user_id: req.body.user_id,
            user_pass: md5_pass,
            nama: req.body.nama,
            email: req.body.email,
            salt: salt
          })
          .then(data => {
            next();
          })
        })
        .catch(err => {
          res.send(err)
        })
  },
  getallUser : (req,res) => {
        user.find({})
        .then(datauser => {
          res.send(datauser)
        })
        .catch(err => {
          res.send(err)
        })
  },
  deleteUser : (req,res) => {
        user.deleteOne({_id:req.params.id})
        .then(result => {
          res.send(result)
        })
        .catch(err => {
          res.send(err)
        })
  },
  updateUser : (req,res) => {
      salt = helper.getRandom(5);
      md5_pass = halper.getPassWithSalt(req.body.user_pass, salt);
      user.findOneAndUpdate({email:req.params.email},{
        user_id: req.body.user_id,
        user_pass: md5_pass,
        nama: req.body.nama,
        salt:salt
      })
      .then(result=>{
          res.send(result);
      })
      .catch(err=>{
          res.send(err);
      })
  }

}
