const express = require('express');
const app = express();

const summoner = require('./routes/summoner');
const settings = require('./routes/settings');
const champions = require('./routes/champions');

const ROUTES = {
    summoner: '/summoner',
    settings: '/settings',
    champions: '/champions'
}

const PORT = 3000;

app.use(express.json());

app.use(ROUTES.summoner, summoner);
app.use(ROUTES.settings, settings);
app.use(ROUTES.champions, champions);

app.listen(PORT,() => {
    console.log(`Server up and runing: ${PORT}`);
});