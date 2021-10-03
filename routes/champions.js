const expres = require('express');
const router = expres.Router();
const { getFreeChampionsList } = require('../controllers/champiopns_controller');


router.get('/freeChampionsList', getFreeChampionsList);


module.exports = router;