const { default: axios } = require('axios');
const { getChampionsNames } = require('./champions_service');
const { getApiKey, } = require('./settings_service')

async function getServerSummonerIdsByName(summonerName) {
    //const servers = ['euw1', 'ru', 'br1', 'eun1', 'jp1', 'kr', 'la1', 'la2', 'na1', 'oc1', 'tr1']
    const servers = ['euw1', 'ru']
    let serversSummonerIds = [];
    const apiKey = await getApiKey();
    try {
        for (i = 0; i < servers.length; i++) {
            let server = servers[i];
            try { 
                const uri = `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${apiKey}`;
                let { data: summIdData } = await axios.get(encodeURI(uri));
                serversSummonerIds.push({ server: server, id: summIdData?.id });
            } catch (error) {

            }
        }
        if (!serversSummonerIds) throw new Error(`Cannot get summonerId from summonerName: ${summonerName}`);
        return serversSummonerIds;
    } catch (error) {
        console.error(error);
    }
}

async function getChampionsDataBySummonerIds(serversSummonerIds) {
    let serverSummonerChampionsData = [];
    const apiKey = await getApiKey();
    for (const info of serversSummonerIds) {
        let server = info?.server;
        let summonerId = info?.id;
        try {
            let { data: summonerChampionsData } = await axios.get(`https://${server}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${apiKey}`)
            if (!summonerChampionsData) throw new Error(`Cannot get champions from summonerId: ${summonerId}`);
            serverSummonerChampionsData.push({ server, champions: summonerChampionsData })
        } catch (error) {
            console.error(error);
        }
    }
    return serverSummonerChampionsData;
}

function getGrantedChampsIds(serverSummonerChampionsData) {
    let serverChessGrantedChampionsIds = [];
    for (const serverInfo of serverSummonerChampionsData) {

        const filteredChamps = serverInfo?.champions
            .filter(({ chestGranted }) => chestGranted);

        const ids = filteredChamps
            .map(({ championId }) => championId);

        serverChessGrantedChampionsIds.push({ server: serverInfo?.server, ids })
    }
    return serverChessGrantedChampionsIds;
}

async function mapChessGrantedChampionNames(serverChampionsIds){
    const champNames = await getChampionsNames();
    let serverChampNames = []
    // {
    //     champions:[{ server: 'ru', championsNames: ['amumu', 'zix'] }, { server: 'ru', championsNames: ['amumu', 'zix'] }]
    // }

    for (const serverChamps of serverChampionsIds) {
        const server = serverChamps.server;
        const champsIds = serverChamps.ids;
        const chesGrantedChampions = champsIds.map(id=>{
            return champNames[id];
        })
        chesGrantedChampions.sort();
        serverChampNames.push({server, chesGrantedChampions})
    }

    return serverChampNames;
}

module.exports = { getServerSummonerIdsByName, getChampionsDataBySummonerIds, getGrantedChampsIds, mapChessGrantedChampionNames }