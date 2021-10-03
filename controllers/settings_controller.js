const { setApiKey, setGameVersion  } = require("../services/settings_service");

async function updateSettings(req, res) {
    const param = req.query;
    for (const key of Object.keys(param)) {
        if(key !== 'apiKey' && key !== 'gameVersion') {
            res.status(404).json({"message": `${key} - unsupport settings parrams`})
        }

        if(key === 'apiKey' ) {
            setApiKey(param[key]);
        }

        if(key === 'gameVersion' ) {
            setGameVersion(param[key]);
        }

    }
    res.status(200).json({"result": "succes"})
}


module.exports = { updateSettings }