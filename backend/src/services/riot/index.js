const { Kayn } = require("kayn");

const { riotLolApiKey } = require("../../config");

const kayn = Kayn(riotLolApiKey)();

const fetchSummonerLatestMatches = async (name, numberOfMatches = 5) => {
  try {
    const accountId = await kayn.Summoner.by
      .name(name)
      .then((summoner) => summoner.accountId);

    const latestMatchIds = await kayn.Matchlist.by
      .accountID(accountId)
      .then((response) =>
        response.matches.slice(0, numberOfMatches).map((match) => match.gameId),
      );

    const latestMatches = await Promise.all(latestMatchIds.map(kayn.Match.get));

    return latestMatches.map((match) => extractDataFromMatch(match, accountId));
  } catch (error) {
    if (error.statusCode === 404) {
      return [];
    }
    console.error(error);
  }
};

const extractDataFromMatch = (match, accountId) => {
  const {
    gameId,
    platformId,
    gameCreation,
    gameDuration,
    queueId,
    mapId,
    seasonId,
    gameVersion,
    gameMode,
    gameType,
  } = match;

  // find participantId by accountId
  const participantId = match.participantIdentities.find(
    (participant) => participant.player.accountId === accountId,
  ).participantId;

  // find relevant participant data
  const playerData = match.participants.find(
    (participant) => participant.participantId === participantId,
  );

  const {
    championId,
    spell1Id,
    spell2Id,
    stats: {
      win,
      item0,
      item1,
      item2,
      item3,
      item4,
      item5,
      item6,
      kills,
      deaths,
      assists,
      totalMinionsKilled,
      neutralMinionsKilled,
      champLevel,
      perk0,
      perkSubStyle,
    },
  } = playerData;

  return {
    gameId,
    platformId,
    gameCreation,
    gameDuration,
    queueId,
    mapId,
    seasonId,
    gameVersion,
    gameMode,
    gameType,
    championId,
    spell1Id,
    spell2Id,
    stats: {
      win,
      item0,
      item1,
      item2,
      item3,
      item4,
      item5,
      item6,
      kills,
      deaths,
      assists,
      totalMinionsKilled,
      neutralMinionsKilled,
      champLevel,
      perk0,
      perkSubStyle,
    },
  };
};

module.exports = {
  fetchSummonerLatestMatches,
};
