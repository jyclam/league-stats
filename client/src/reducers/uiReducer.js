export const uiReducer = (state, action) => {
  if (action.type === "LOADING") {
    return {
      ...state,
      loading: true,
    };
  }
  if (action.type === "READY") {
    return {
      ...state,
      ready: true,
      loading: false,
    };
  }
  if (action.type === "ERROR") {
    return {
      ...state,
      error: action.payload.error,
    };
  }
  return state;
};

export const initialState = {
  ready: false,
  loading: false,
  error: null,
};
