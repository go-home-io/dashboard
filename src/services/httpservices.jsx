// import base64 from 'base-64';
import BASE_URL from '../settings/baseUrl'


const service = {
    get:(url, user, password) => {
        // console.log(user+':'+password);
        // const credentials = 'Basic ' + base64.encode(user + ":" + password);
        return fetch(BASE_URL+url, {
            headers: {
                // 'Authorization': credentials
            },
            method: 'get',
        })
            .then((response) => {
                // console.log(response.status + ' -> ' +response.ok);
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