// import base64 from 'base-64';
import {BASE_URL} from '../settings/urls';
import Cookie from "js-cookie";
import {COOKIE_NAME} from '../settings/cookie';

const service = {
    get:(url) => {
        return fetch(BASE_URL+url, {
            headers: {
                // 'Authorization': Cookie.get(COOKIE_NAME)
            },
            method: 'get',
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return response.status;
                }
            })
            .catch(err => {
                console.log(err.message);
                return err.message;
            })
    },
    post:(url, data) => {
        return fetch(BASE_URL + url, {
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(data)
        }).then( (response) => {
            return response;
        });
    }
};

export default service