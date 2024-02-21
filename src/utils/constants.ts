export const FRONTEND_URL = process.env.NODE_ENV === "production" ? "https://carnilami.com" :  "http://localhost:5173";
export const API_URL = process.env.NODE_ENV === "production" ? "https://api.carnilami.com" :  "http://localhost:3000";

export const CDN_URL = "https://cdn.carnilami.com/";
export const PROFILE_CDN_URL = CDN_URL + "/profiles/";
