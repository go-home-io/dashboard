import {STATE_URL} from "../settings/urls";
import Cookie from "js-cookie";
import {COOKIE_NAME} from "../settings/cookie";

const service = {
    get:(url) => {
        return fetch( url, {
            headers: {
                "Authorization": Cookie.get(COOKIE_NAME)
            },
            method: "get",
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.status;
                }
            })
            .catch(err => {
                // eslint-disable-next-line
                console.error("Error during server connection:", err.messageInfo);
                return 404;
            });
    },
    post:(url, data) => {
        return fetch(STATE_URL + url, {
            headers: {
                "Accept": "text/plain",
                "Content-Type": "application/json"
            },
            method: "post",
            body: JSON.stringify(data)
        }).then( (response) => {
            return response;
        });
    }
};

export default service;