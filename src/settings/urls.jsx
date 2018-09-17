const IS_DEV = process.env.NODE_ENV === "development";

const BASE_URL = window.location.hostname + (IS_DEV ? ":8000" : ((window.location.port ? ":" + window.location.port : ""))) + "/api/v1";

export const STATE_URL = window.location.protocol + "//" + BASE_URL + "/state";
export const SOCKET_URL = (window.location.protocol === "https:" ? "wss" :"ws")  + "://" + BASE_URL + "/ws";

// export const STATE_URL = process.env.NODE_ENV === "development" ? "http://localhost:8000/state" :
//                                                                   "production url"  ;

// export const SOCKET_URL = process.env.NODE_ENV === "development" ? "ws://localhost:8000/websocket" :
//                                                                    "production socket url";
