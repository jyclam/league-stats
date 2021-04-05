import { useReducer } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { matchReducer, initialState } from "./reducers/matchReducer";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  height: 100%;

  .formError {
    color: #ba1a4b;
  }
`;

const MatchResult = ({ match }) => <div> {match.gameId}</div>;

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [matchState, dispatch] = useReducer(matchReducer, initialState);

  const onSubmit = (data) => {
    reset();

    dispatch({ type: "FETCHING" });
    fetch("http://localhost:5000/api/v1/summoner", {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      method: "post",
      body: `summonerName=${data.summonerName}`,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        {errors?.summonerName && (
          <div className={"formError"}> Field is required.</div>
        )}
        <input
          autoFocus={true}
          placeholder={"enter summoner name"}
          {...register("summonerName", { required: true })}
        />
      </form>
      {matchState.matches.length === 0
        ? "No results"
        : matchState.matches.map((match) => (
            <MatchResult key={match.gameId} match={match} />
          ))}
    </Main>
  );
}

export default App;
