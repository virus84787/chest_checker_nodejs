const { getServerSummonerIdsByName, getChampionsDataBySummonerIds, getGrantedChampsIds, mapChessGrantedChampionNames  } = require("../services/summoner_service");

async function getChessGrantedChempionsBySummonerName(req, res) {
    const summonerName = req.params?.summonerName;
    const serverSummonerIds = await getServerSummonerIdsByName(summonerName);
    const summonerChampionsData = await getChampionsDataBySummonerIds(serverSummonerIds);
    const summonerChessGrantedCpampionIds = await getGrantedChampsIds(summonerChampionsData);
    const summonerChessGrantedCpampions = await mapChessGrantedChampionNames(summonerChessGrantedCpampionIds);

    res.status(200).json({ summonerChessGrantedCpampions })
}


module.exports = { getChessGrantedChempionsBySummonerName }