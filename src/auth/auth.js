//import Spotify, { ACC_URL, BASE_URL } from "./Spotify";
import { config } from "./config";

export const AuthModule = (() => {
    const ACC_URL = 'https://accounts.spotify.com/api/';
    let settings = {};

    const ERR_CODES = {
        access_denied: {
            err_code: 1,
            msg: 'Permiso denegado por el usuario'
        },
        spoti_error: {
            err_code: 2,
            msg: 'Ocurrió un error con la plataforma de Spotify'
        },
        request_access: {
            err_code: 3,
            msg: 'El usuario nunca dió acceso a la aplicación'
        }
    }

    const isLoggedIn = () => {
        // Busca en la LS por los access tokens
        const tokenInfo = JSON.parse(localStorage.getItem('token'));
        if (tokenInfo !== null) { // Esta seteada. Puede estar expirada o no. El refresh lo hará 'getToken'
            return true;
        } else {
            return false;
        }
    }

    const configDefault = (options) => {
        settings = Object.assign(config, options);
    }

    const getId = () => {
        return config.AUTHORIZE_ID;
    }

    const logOutId = () => {
        return config.LOGOUT_ID;
    }

    /**
     * Valida Autorización del usuario. Si está logueado, devuelve los datos de un usuario. Si la autorización
     * se venció, la refresca. Si la autorización nunca se hizo comienza el proceso de autenticación.
     * 
     */
    const isAuth = () => {
        return new Promise((resolve, reject) => {
            if (isLoggedIn()) {
                getUser()
                    .then(user => {
                        resolve(user);
                    })
                    .catch(err => {
                        reject(err)
                    })
            } else {
                if (canAuthorize()) {
                    authorize()
                        .then(user => {
                            resolve(user);
                        })
                        .catch(err => {
                            reject(err);
                        })
                } else {
                    const currURL = new URL(document.URL);
                    let errCode = currURL.searchParams.get('error');
                    switch (errCode) {
                        case 'access_denied':
                            reject(ERR_CODES.access_denied);
                            break;
                        default:
                            reject(ERR_CODES.request_access);
                            break;
                    }
                }
            }
        })
    }

    function canAuthorize() {
        const currURL = new URL(document.URL);
        let authCode = currURL.searchParams.get('code');
        if (authCode)
            return true;
        return false;
    }

    const logOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    const authorize = () => {
        const currURL = new URL(document.URL);
        let authCode = currURL.searchParams.get('code');
        let errCode = currURL.searchParams.get('error');
        if (!authCode) {
            getAuthCode(); // Go to Spotify
        } else {
            if (!errCode) {
                return exchangeCodeForToken(authCode)
                    .then((result) => {
                        history.pushState({}, 'Globify', config.REDIRECT_URI)
                        const expiracyDateMS = (new Date().getTime() + result.expires_in * 1000);
                        localStorage.setItem('token', JSON.stringify({
                            aToken: result.access_token,
                            rToken: result.refresh_token,
                            expiracy: expiracyDateMS
                        }));
                        return getUser();
                    })
                    .catch((err) => {
                        throw new Error(err)
                    });
            } else {
                return new Promise((resolve, reject) => {
                    switch (errCode) {
                        case 'access_denied':
                            reject(ERR_CODES.access_denied);
                            break;
                        default:
                            reject(ERR_CODES.spoti_error);
                            break;
                    }
                    
                })
            }
        }
    }

    const getUserInfo = () => {

    }

    const getAuthCode = () => {
        // Spotify scopes
        window.location.replace('https://accounts.spotify.com/authorize' +
            '?response_type=code' +
            '&client_id=' + config.CLIENTID +
            '&redirect_uri=' + encodeURIComponent(config.REDIRECT_URI) +
            '&scope=' + encodeURIComponent(config.SCOPES));
    }

    const getUser = () => {
        return new Promise((resolve, reject) => {
            getToken()
                .then(ACCESS_TOKEN => {
                    fetch(`https://api.spotify.com/v1/me`, {
                            headers: new Headers({
                                Accept: "application/json",
                                Authorization: `Bearer ${ACCESS_TOKEN}`
                            })
                        })
                        .then(resp => resp.json())
                        .then(data => {
                            const userInfo = {
                                name: data.display_name,
                                usrURL: data.external_urls.spotify,
                                followers: data.followers,
                                id: data.id,
                                imgURL: data.images[0] ? data.images[0].url : './assets/img/boy.svg'
                            };
                            localStorage.setItem('user', JSON.stringify(userInfo));
                            resolve(userInfo)
                        })
                        .catch(err => err);
                })
        })
    }

    const getToken = async() => {
        let tokenInfo = JSON.parse(localStorage.getItem('token'));
        if (tokenInfo.expiracy > new Date().getTime()) { // If it's not expired
            return tokenInfo.aToken;
        } else { // If it's expired
            return refreshToken(tokenInfo.rToken)
                .then(newToken => newToken.aToken)
                .catch(err => {
                    console.log(err)
                })
        }
    }

    function refreshToken(rToken) {
        return new Promise((resolve, reject) => {
            const encodedClient = btoa(`${config.CLIENTID}:${config.CLIENT_SECRET}`);
            fetch(`https://cors-anywhere.herokuapp.com/${ACC_URL}token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                        Authorization: `Basic ${encodedClient}`
                    },
                    body: `grant_type=refresh_token&refresh_token=${rToken}`
                })
                .then(resp => resp.json())
                .then(newToken => {
                    let tokenInfo = {};
                    tokenInfo.aToken = newToken.access_token;
                    tokenInfo.expiracy = new Date().getTime() + newToken.expires_in * 1000;
                    tokenInfo.rToken = rToken;
                    localStorage.setItem('token', JSON.stringify(tokenInfo))
                    return resolve(tokenInfo);
                })
                .catch(err => reject(err))
        })
    }

    const exchangeCodeForToken = (code) => {
        return new Promise((resolve, reject) => {
            const encodedClient = btoa(`${config.CLIENTID}:${config.CLIENT_SECRET}`)
            fetch(`https://cors-anywhere.herokuapp.com/${ACC_URL}token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                        Authorization: `Basic ${encodedClient}`
                    },
                    body: `grant_type=authorization_code&code=${code}&redirect_uri=${config.REDIRECT_URI}`
                })
                .then(resp => resp.json())
                .then(data => resolve(data))
                .catch(err => reject(err))
        })
    }

    return {
        isAuth: isAuth,
        authorize: authorize,
        getId: getId,
        getToken: getToken,
        getUserInfo: getUserInfo,
        logOut: logOut,
        logOutId: logOutId
    }
})()