const config = {
    url: 'https://norma.nomoreparties.space/api/ingredients',
    headers: {
        'content-type': 'application/json'
    }
};

 class GetApi {
    static promiseCall(res) {
        return res.ok ? res.json() : res.json().then((data) =>  Promise.reject(data));
    }
    async getAll() {
        return fetch(`${config.url}`, {
            method: 'GET',
            headers: config.headers
        })
        .then(GetApi.promiseCall)
    }
}

export default new GetApi(config);