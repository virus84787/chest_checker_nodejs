const { getFreeChampionsIds, mapFreeChampionsNames } = require("../services/champions_service")

async function getFreeChampionsList(req, res) {
    const freeChampionsIds = await getFreeChampionsIds();
    const freeChampionsNames = await mapFreeChampionsNames(freeChampionsIds);

    res.status(200).json(freeChampionsNames);
}

module.exports = { getFreeChampionsList }