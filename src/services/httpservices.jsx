import base64 from 'base-64';

const baseUrl = 'http://localhost:8000';

const service = {
    get:(url, user, password) => {
        const credentials = 'Basic ' + base64.encode(user + ":" + password);
        return fetch(baseUrl+url, {
            headers: {
                // 'Authorization': credentials,
            },
            method: 'get',
        })
            .then((response) => {
                console.log(response.status + ' -> ' +response.ok);
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
        return fetch(baseUrl + url, {
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(data)
        }).then(function(response) {
            return response;
        });
    }
};

export default service