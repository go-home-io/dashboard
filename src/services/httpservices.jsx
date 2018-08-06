//import Fetch from 'whatwg-fetch'

const baseUrl = 'http://localhost:8000';

const service = {
    get:(url) => {
        return fetch(baseUrl + url)
            .then((response) => {
                return response.json();
            })
    },
    post: function(url, ingredient) {
        console.log(JSON.stringify(ingredient));
        return fetch(baseUrl + url, {
            headers: {
                'Accept': 'text/plain',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(ingredient)
        }).then(function(response) {
            return response;
        });
    }
};

export default service