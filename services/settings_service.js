const fs = require('fs');
const util = require('util')

const filePath = 'config/external_request_config.json';

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);


async function getApiKey() {
    try {
        const config = await readFile(filePath, 'utf8');
        return JSON.parse(config)?.apiKey;
    } catch (err) {
        console.error(err);
    }
}

async function getGameVersion() {
    try {
        const config = await readFile(filePath, 'utf8');
        return JSON.parse(config)?.gameVersion;
    } catch (err) {
        console.error(err);
    }
}

async function setApiKey(apiKey) {
    try {
        const config = await readFile(filePath, 'utf8');
        let json = JSON.parse(config);
        json.apiKey = apiKey;
        await writeFile(filePath, JSON.stringify(json));
    } catch (err) {
        console.error(err);
    }
}

async function setGameVersion(gameVersion) {
    try {
        const config = await readFile(filePath, 'utf8');
        let json = JSON.parse(config);
        json.gameVersion = gameVersion;
        await writeFile(filePath, JSON.stringify(json));
    } catch (err) {
        console.error(err);
    }
}


module.exports = { getApiKey, getGameVersion, setApiKey, setGameVersion }