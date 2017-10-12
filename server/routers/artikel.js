let express =require('express');
let router = express.Router();

let  controllerArtikels = require('../controllers/artikelController'); // ada .js atau tidak sama saja

//router.post('/login',controllerUsers.getLogin);
router.get('/',controllerArtikels.getAllArtikel);
router.get('/:_id',controllerArtikels.getOneArtikel);
router.post('/',controllerArtikels.createArtikel);
router.delete('/:_id',controllerArtikels.delOneArtikel);
router.put('/:id',controllerArtikels.updateArtikel);

module.exports = router;
