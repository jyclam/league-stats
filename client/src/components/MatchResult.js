import styled from "styled-components";

const MatchDiv = styled.div`
  border: black solid thin;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
`;

const Container = styled.div`
  flex: 1 1 20%;
  font-size: 1.5rem;
`;

const GameStats = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;

  .victory {
    color: #1a78a2;
  }
`;

const ChampionInfo = styled(Container)`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
`;

const SummonerContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeroImg = styled.img`
  height: 8rem;
  width: 8rem;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const SquareImg = styled.img`
  height: 4rem;
  width: 4rem;
  border-radius: 10%;
  margin-bottom: 0.3rem;
  margin-right: 0.3rem;
`;

const RoundImg = styled(SquareImg)`
  border-radius: 50%;
`;

const MatchResult = ({ match, staticData }) => {
  const { championsData, queuesData, summonerData, runesData } = staticData;

  const queueObject = findQueueObject(queuesData, match.queueId);

  const gameDurationInMinutesSeconds = `${Math.floor(
    match.gameDuration / 60,
  )}m ${match.gameDuration % 60}s`;

  const [champion] = Object.values(championsData.data).filter(
    (championInfo) => parseInt(championInfo.key) === match.championId,
  );

  const summonerSpells = Object.values(summonerData.data).filter(
    (summonerInfo) =>
      parseInt(summonerInfo.key) === match.spell1Id ||
      parseInt(summonerInfo.key) === match.spell2Id,
  );

  console.log({ summonerSpells });
  console.log(match.spell1Id);
  console.log(match.spell2Id);
  console.log(summonerData);

  const runes = [match.stats.perk0, match.stats.perkSubStyle].flatMap((rune) =>
    findRuneObject(runesData, rune),
  );

  return (
    <MatchDiv>
      <GameStats>
        <div>{cleanseGameModeName(queueObject.description)}</div>
        <div>{match.gameCreation}</div>
        <div />
        <div className={`${match.stats.win && "victory"}`}>
          {match.stats.win ? "Victory" : "Defeat"}
        </div>
        <div>{gameDurationInMinutesSeconds}</div>
      </GameStats>
      <ChampionInfo>
        <SummonerContainer>
          <HeroImg
            src={`http://localhost:5000/static/11.6.1/img/champion/${champion.name}.png`}
          />
          <div>
            {summonerSpells.map((spell) => (
              <SquareImg
                key={spell.id}
                src={`http://localhost:5000/static/11.6.1/img/spell/${spell.image.full}`}
              />
            ))}
          </div>
          <div>
            {runes.map((rune) => (
              <RoundImg
                key={rune.id}
                className={"runes"}
                src={`http://localhost:5000/static/img/${rune.icon}`}
              />
            ))}
          </div>
        </SummonerContainer>
        <div>{champion.name}</div>
      </ChampionInfo>
      <Container>2</Container>
      <Container>3</Container>
      <Container>4</Container>
    </MatchDiv>
  );
};

const findQueueObject = (queuesData, id) =>
  queuesData.find((queue) => queue.queueId === parseInt(id));

const cleanseGameModeName = (name) =>
  name
    .split(" ")
    .filter((word) => word !== "5v5" && word !== "games")
    .join(" ");

const findRuneObject = (runesData, id) => {
  let rune;

  rune = Object.values(runesData).filter(
    (runeCategory) => runeCategory.id === parseInt(id),
  );

  if (rune.length > 0) {
    return rune;
  } else {
    const allRunesObjects = Object.values(runesData).flatMap(
      (runeCategory) => runeCategory.slots,
    );

    const res = allRunesObjects
      .flatMap((obj) => obj.runes)
      .filter((rune) => rune.id === id);

    return res;
  }
};

export default MatchResult;
