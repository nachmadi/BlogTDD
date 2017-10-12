const mongoose = require('mongoose');

const ArtikelSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String
  }, {
    timestamps: true
  })

Artikel = mongoose.model('Artikel', ArtikelSchema);

module.exports = Artikel;
