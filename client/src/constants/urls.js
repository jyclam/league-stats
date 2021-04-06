const DOMAIN =
  process.env.NODE_ENV === "development" ? "localhost" : "54.183.157.168";

export const STATIC_ASSETS_URL = `http://${DOMAIN}:5000/static`;
export const API_ENDPOINT_URL = `http://${DOMAIN}:5000/api/v1/summoner`;
