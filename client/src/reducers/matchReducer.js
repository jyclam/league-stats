export const matchReducer = (state, action) => {
  if (action.type === "FETCHING") {
    return {
      firstLoad: false,
      matches: [],
      loading: true,
      error: null,
    };
  }
  if (action.type === "RESPONSE_COMPLETE") {
    return {
      firstLoad: false,
      matches: action.payload.data,
      loading: false,
      error: null,
    };
  }
  if (action.type === "ERROR") {
    return {
      firstLoad: false,
      matches: [],
      loading: false,
      error: action.payload.error,
    };
  }
  return state;
};

export const initialState = {
  firstLoad: true,
  matches: [],
  loading: false,
  error: null,
};
