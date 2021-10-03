const expres = require('express')
const router = expres.Router();
const { getChessGrantedChempionsBySummonerName } = require('../controllers/summoner_contoller');

router.get('/:summonerName', getChessGrantedChempionsBySummonerName);







module.exports = router;