const { default: axios } = require('axios');
const { getApiKey, getGameVersion } = require('./settings_service')


async function getFreeChampionsIds() {

    const apiKey = await getApiKey();
    try {
        let { data } = await axios.get(`https://ru.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${apiKey}`);
        return (data?.freeChampionIds);
    } catch (error) {
        console.error(error);
    }
}


async function mapFreeChampionsNames(freeChampionsIds) {
    const champNames = await getChampionsNames();
    let freeChampions = [];
    for (const championId of freeChampionsIds) {
        freeChampions.push(champNames[championId]);
    }

    return freeChampionsNamesList = { freeChampions };
}

async function getChampionsNames() {
    const gameVersion = await getGameVersion();
    let campionsNames = {};
    try {
        let { data } = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${gameVersion}/data/en_US/champion.json`);
        let championsData = Object.entries(data.data);
        championsData.forEach(([key, champion]) => {
            campionsNames[champion.key] = champion.name;
        })
    } catch (error) {
        console.error(error);
    }

    return campionsNames;
}


module.exports = { getFreeChampionsIds, getChampionsNames, mapFreeChampionsNames }