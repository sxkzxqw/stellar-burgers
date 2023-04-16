import { getCookie, setCookie } from './cookies';
const BURGER_API_URL = "https://norma.nomoreparties.space/api";

export interface IUser {
    email?: string,
    name?: string,
    password?: string,
    accessToken?: string,
    refreshToken?: string,
}

export interface IUserReq {
    user?: IUser,
    success: boolean,
    accessToken: string,
    refreshToken: string,
}

export type TUserResponse = {
    success: boolean,
    user?: IUser,
    accessToken: string,
    refreshToken: string,
}



export class BurgerApi {
    checkReponse = (res: Response): Promise<any> => {
        return res.ok ? res.json() : res.json().then((err) => Promise.reject({ ...err, statusCode: res.status }));
    };

    fetchWithRefresh = async (url: string, options: any) => {
        try {
            const res = await fetch(url, options);
            return await this.checkReponse(res);
        } catch (error: any) {
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

    registerUser = (data: IUser): Promise<IUserReq> => {
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

    loginUser = (data: IUser): Promise<IUserReq> => {
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

    logoutUser = (data: any) => {
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

    forgotPasswordEmail = (data: any) => {
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

    forgotPasswordNew = (data: any) => {
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

    updateInfoUser = (data: any) => {
        return fetch(`${BURGER_API_URL}/auth/user`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                'authorization': getCookie('accessToken')
            } as HeadersInit,
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

    getUser = (): Promise<TUserResponse> => {
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