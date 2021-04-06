const PRODUCTION_DOMAIN = process.env.PRODUCTION_DOMAIN || "50.18.167.254";
const DOMAIN =
  process.env.NODE_ENV === "development" ? "localhost" : PRODUCTION_DOMAIN;

export const STATIC_ASSETS_URL = `http://${DOMAIN}:5000/static`;
export const API_ENDPOINT_URL = `http://${DOMAIN}:5000/api/v1/summoner`;
