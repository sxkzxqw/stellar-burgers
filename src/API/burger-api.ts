import { getCookie, setCookie } from './cookies';
const BURGER_API_URL = "https://norma.nomoreparties.space/api";

interface IUser {
    email?: string,
    name?: string,
    password?: string,
}

type TRequestProps = (
    endpoint: string,
    options?: RequestInit,
    isAuth?: boolean,
) => any;

type TCheckResponse = (res: Response) => any;


export class BurgerApi {
    checkReponse: TCheckResponse = (res) => {
        return res.ok ? res.json() : res.json().then((err) => Promise.reject({ ...err, statusCode: res.status }));
    };

    fetchWithRefresh = async (url: string, options) => {
        try {
            const res = await fetch(url, options);
            return await this.checkReponse(res);
        } catch (error) {
            console.log('fetchWithRefresh', error);
            if (error.statusCode === 401 || error.statusCode === 403) {
                const refreshData = await this.refreshToken();
                if (!refreshData.success) {
                    Promise.reject(refreshData)
                }

                setCookie('accessToken', refreshData.accessToken);
                setCookie('refreshToken', refreshData.refreshToken);
                options.headers.authorization = refreshData.accessToken;
                const res = await fetch(url, options);
                return await this.checkReponse(res);

            } else {
                Promise.reject(error)
            }
        }
    }

    registerUser = (data: object) => {
        return fetch(`${BURGER_API_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
        }).then(this.checkReponse)
            .then(data => {
                if (data?.success) return data;
                return Promise.reject(data)
            });
    };

    loginUser = (data: object) => {
        return fetch(`${BURGER_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
        }).then(this.checkReponse)
            .then(data => {
                if (data?.success) return data;
                return Promise.reject(data)
            });
    };

    logoutUser = (data: object) => {
        return fetch(`${BURGER_API_URL}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
        }).then(this.checkReponse)
            .then(data => {
                if (data?.success) return data;
                return Promise.reject(data)
            });
    };

    forgotPasswordEmail = (data: object) => {
        return fetch(`${BURGER_API_URL}/password-reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
        }).then(this.checkReponse)
            .then(data => {
                if (data?.success) return data;
                return Promise.reject(data)
            });
    };

    forgotPasswordNew = (data: object) => {
        return fetch(`${BURGER_API_URL}/password-reset/reset`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify(data),
        }).then(this.checkReponse)
            .then(data => {
                if (data?.success) return data;
                return Promise.reject(data)
            });
    };

    updateInfoUser = (data: object) => {
        return fetch(`${BURGER_API_URL}/auth/user`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                'authorization': getCookie('accessToken')
            },
            body: JSON.stringify(data),
        }).then(this.checkReponse)
            .then(data => {
                if (data?.success) return data;
                return Promise.reject(data)
            });
    };

    refreshToken = () => {
        return fetch(`${BURGER_API_URL}/auth/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
            body: JSON.stringify({
                token: getCookie("refreshToken"),
            }),
        }).then(this.checkReponse);
    };

    getUser = () => {
        return this.fetchWithRefresh(`${BURGER_API_URL}/auth/user`, {
            headers: {
                authorization: getCookie("accessToken"),
            },
        }).then(data => {
            if (data?.success) return data;
            return Promise.reject(data)
        });
    }

}

export default new BurgerApi()