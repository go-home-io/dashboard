// eslint-disable-next-line
const IS_DEV = process.env.NODE_ENV === "development";

const BASE_URL = window.location.hostname +
                (IS_DEV ? ":8000" : ((window.location.port ? ":" + window.location.port : ""))) + "/api/v1";

export const STATE_URL = window.location.protocol + "//" + BASE_URL + "/state";
export const SOCKET_URL = (window.location.protocol === "https:" ? "wss" :"ws")  + "://" + BASE_URL + "/ws";
export const STATUS_URL = window.location.protocol + "//" + BASE_URL + "/status";
export const WORKER_URL = window.location.protocol + "//" + BASE_URL + "/worker";
export const LOGS_URL = window.location.protocol + "//" + BASE_URL + "/logs";
