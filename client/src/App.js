import { useState, useReducer } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { uiReducer, initialState } from "./reducers/uiReducer";
import MatchResult from "./components/MatchResult";
import { API_ENDPOINT_URL } from "./constants/urls";
import useStaticData from "./hooks/useStaticData";

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
    animation: blinker 1s linear infinite;
  }

  @keyframes blinker {
    50% {
      opacity: 0;
    }
  }

  .noResults {
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
  const [matches, setMatches] = useState([]);
  const [uiState, dispatch] = useReducer(uiReducer, initialState);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const staticData = useStaticData();

  const onSubmit = (data) => {
    reset();

    dispatch({ type: "LOADING" });
    fetch(API_ENDPOINT_URL, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "post",
      body: `summonerName=${data.summonerName}`,
    })
      .then((response) => response.json())
      .then((data) => {
        setMatches(data);
        dispatch({ type: "READY" });
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
      {uiState.loading && <span className="loader">Fetching data!</span>}

      {uiState.ready &&
        (matches.length === 0 ? (
          <span className="noResults">No results</span>
        ) : (
          matches.map((match) => (
            <MatchResult
              key={match.gameId}
              match={match}
              staticData={staticData}
            />
          ))
        ))}
    </Main>
  );
}

export default App;
