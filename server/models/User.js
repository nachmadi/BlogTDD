const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema(
  {
    user_id: String,
    user_pass: String,
    nama: String,
    email: String,
    salt: String
  }
)

User = mongoose.model('User', UserSchema);

module.exports = User;
