import { AuthModule } from '@root/auth/auth';
//const AuthModule = require('@root/auth/auth');
//import { dispatch } from 'react-redux';

const USER_ROOT_EVT = 'USER';

export const USER_ACTIONS = {
    userLogin: {
        requesting: `${USER_ROOT_EVT}_REQUEST`,
        authorized: `${USER_ROOT_EVT}_AUTHORIZED`,
        loggedIn: `${USER_ROOT_EVT}_LOGIN`, // todavia no se usa
        failed: `${USER_ROOT_EVT}_FAILED`,
        rejected: `${USER_ROOT_EVT}_REJECT`,
    }
}

export const authorize = () => {

    console.log('llegue');
    return (dispatch, getState) => {
        // Notifico al reducer que estoy solicitando autorización.
        dispatch({ type: USER_ACTIONS.userLogin.requesting });

        // Ejecuto autorizacion en el módulo
        AuthModule.isAuth()
            .then(user => {
                // Se pasaron los pasos previos de la autorización.
                dispatch({ type: USER_ACTIONS.userLogin.authorized, payload: { user } });
            })
            .catch(err => {
                console.log('hubo un error');
                // Hubo algún error en la autorización.
                if (err.err_code === 1) {
                    // Usuario negó el acceso a la aplicación
                    dispatch({ type: USER_ACTIONS.userLogin.rejected, payload: { err } });
                } else {
                    // Hubo un error en la API
                    dispatch({ type: USER_ACTIONS.userLogin.failed, payload: { err } });
                }
                
            });
    }
}

export const logOut = () => {
    return (dispatch, getState) => {
        console.log('You\'re logging out');
    }
}

export const logIn = () => {
    AuthModule.authorize();
}