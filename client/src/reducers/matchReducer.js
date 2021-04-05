export const matchReducer = (state, action) => {
  if (action.type === "FETCHING") {
    return {
      matches: [],
      loading: true,
      error: null,
    };
  }
  if (action.type === "RESPONSE_COMPLETE") {
    const sta = {
      matches: action.payload.data,
      loading: false,
      error: null,
    };

    console.log(sta);

    return sta;
  }
  if (action.type === "ERROR") {
    return {
      matches: [],
      loading: false,
      error: action.payload.error,
    };
  }
  return state;
};

export const initialState = {
  matches: [],
  loading: false,
  error: null,
};
