const { fetchSummonerLatestMatches } = require("../../services/riot");

exports.post = async (req, res) => {
  // cache calls
  const { summonerName } = req.body;
  console.log({ summonerName });
  const result = await fetchSummonerLatestMatches(summonerName);
  res.status(200).json(result);
};
