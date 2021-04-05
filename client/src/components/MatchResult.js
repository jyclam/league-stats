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

const MatchResult = ({ match, staticData }) => {
  const { championsData, queuesData, summonerData, runesData } = staticData;

  const queueObject = findQueueObject(queuesData, match.queueId);

  const gameDurationInMinutesSeconds = `${Math.floor(
    match.gameDuration / 60,
  )}m ${match.gameDuration % 60}s`;

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
      <Container>1</Container>
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

export default MatchResult;
