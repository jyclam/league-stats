const PRODUCTION_DOMAIN = process.env.PRODUCTION_DOMAIN || "50.18.167.254";
const DOMAIN =
  process.env.NODE_ENV === "development" ? "localhost" : PRODUCTION_DOMAIN;

export const STATIC_ASSETS_URL = `http://${DOMAIN}:5000/static`;
export const API_ENDPOINT_URL = `http://${DOMAIN}:5000/api/v1/summoner`;
export const DDRAGON_ENDPOINT_URL = `https://ddragon.leagueoflegends.com/cdn`;

/*
  TODO:
    - periodically (daily?) scan versions to update version
    - fetch resources directly from ddragon using info below:

    http://ddragon.leagueoflegends.com/api/versions.json
    http://static.developer.riotgames.com/docs/lol/queues.json
    http://ddragon.leagueoflegends.com/cdn/11.7.1/data/en_US/champion.json
    http://ddragon.leagueoflegends.com/cdn/11.7.1/data/en_US/summoner.json
    http://ddragon.leagueoflegends.com/cdn/11.7.1/data/en_US/item.json
    http://ddragon.leagueoflegends.com/cdn/11.7.1/data/en_US/runesReforged.json

    http://ddragon.leagueoflegends.com/cdn/11.7.1/img/item/1001.png
    http://ddragon.leagueoflegends.com/cdn/11.7.1/img/spell/FlashFrost.png

    perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png

    http://raw.communitydragon.org/latest/game/assets/perks/styles/domination/darkharvest/darkharvest.png

*/
