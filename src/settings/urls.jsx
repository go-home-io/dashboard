export const STATE_URL = process.env.NODE_ENV === "development" ? "http://localhost:8000/state" :
                                                                  "production url"  ;

export const SOCKET_URL = process.env.NODE_ENV === "development" ? "ws://localhost:8000/websocket" :
                                                                   "production socket url";
