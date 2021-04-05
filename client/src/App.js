import { useState, useEffect, useReducer } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { matchReducer, initialState } from "./reducers/matchReducer";
import MatchResult from "./components/MatchResult";
import { STATIC_ASSETS_URL, API_ENDPOINT_URL } from "./constants/urls";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  height: 100%;

  h1 {
    font-weight: 400;
    font-size: 2.5em;
  }

  .formError {
    color: #ba1a4b;
  }
  .loader {
    font-size: 5rem;
  }
`;

const Input = styled.input`
  font-size: 1.5em;
  height: 3em;
  width: 15em;
  border-radius: 0.7em;
  border: solid 0.2em black;
  margin-bottom: 1em;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #3d3d3d;
    text-align: center;
  }
  :-ms-input-placeholder {
    color: #3d3d3d;
    text-align: center;
  }
`;

function App() {
  const [staticData, setStaticData] = useState({});
  const [matchState, dispatch] = useReducer(matchReducer, initialState);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // refactor into useStaticData hook / useContext
  useEffect(() => {
    // convert to async and handle errors in one try / catch
    fetch(`${STATIC_ASSETS_URL}/queues.json`)
      .then((response) => response.json())
      .then((data) =>
        setStaticData((prevState) => ({ ...prevState, queuesData: data })),
      )
      .catch((error) => console.error(error));

    fetch(`${STATIC_ASSETS_URL}/11.6.1/data/en_US/champion.json`)
      .then((response) => response.json())
      .then((data) =>
        setStaticData((prevState) => ({ ...prevState, championsData: data })),
      )
      .catch((error) => console.error(error));

    fetch(`${STATIC_ASSETS_URL}/11.6.1/data/en_US/summoner.json`)
      .then((response) => response.json())
      .then((data) =>
        setStaticData((prevState) => ({ ...prevState, summonerData: data })),
      )
      .catch((error) => console.error(error));

    fetch(`${STATIC_ASSETS_URL}/11.6.1/data/en_US/runesReforged.json`)
      .then((response) => response.json())
      .then((data) =>
        setStaticData((prevState) => ({ ...prevState, runesData: data })),
      )
      .catch((error) => console.error(error));
  }, []);

  const onSubmit = (data) => {
    reset();

    dispatch({ type: "FETCHING" });
    fetch(API_ENDPOINT_URL, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "post",
      body: `summonerName=${data.summonerName}`,
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "RESPONSE_COMPLETE", payload: { data } });
      })
      .catch((error) => {
        if (error.statusCode === 504) {
          dispatch({
            type: "ERROR",
            payload: { error: "Request timed out, please try again." },
          });
        }
        console.error(error);
      });
  };

  return (
    <Main>
      <h1>league stats</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors?.summonerName && (
          <div className={"formError"}> Field is required.</div>
        )}
        <Input
          autoFocus={true}
          placeholder={"enter summoner name"}
          {...register("summonerName", { required: true })}
        />
      </form>
      {matchState.loading && <span className={"loader"}>Fetching data!</span>}
      {!matchState.firstLoad &&
      !matchState.loading &&
      matchState.matches.length === 0
        ? "No results"
        : matchState.matches.map((match) => (
            <MatchResult
              key={match.gameId}
              match={match}
              staticData={staticData}
            />
          ))}
    </Main>
  );
}

export default App;
