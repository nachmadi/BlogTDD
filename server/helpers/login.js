module.exports = {
    isAdmin:function(req,res,next) {
        if(req.body.user_id.role==="admin" ){
          next();
        }else{
          res.send('Role tidak dijinkan');
        }
    },
    isUser:function(req,res,next) {
        if(req.body.user_id.role==="user" ){
          next();
        }else{
          res.send('Role tidak dijinkan');
        }
    }
}
