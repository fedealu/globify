import { AuthModule } from '@root/auth/auth';
//const AuthModule = require('@root/auth/auth');
//import { dispatch } from 'react-redux';

const USER_ROOT_EVT = 'USER';

const ACTION_NAMES = {
    userLogin: {
        requesting: `${USER_ROOT_EVT}_REQUEST`,
        authorized: `${USER_ROOT_EVT}_AUTHORIZED`,
        loggedIn: `${USER_ROOT_EVT}_LOGIN`, // todavia no se usa
        failed: `${USER_ROOT_EVT}_FAILED`,
        rejected: `${USER_ROOT_EVT}_REJECT`,
    }
}

const userActions = {

    names: ACTION_NAMES,

    authorize: (dispatch, getState) => {
        // Notifico al reducer que estoy solicitando autorización.
        dispatch({ type: ACTION_NAMES.userLogin.requesting });

        // Ejecuto autorizacion en el módulo
        AuthModule.isAuth()
            .then(user => {
                // Se pasaron los pasos previos de la autorización.
                dispatch({ type: ACTION_NAMES.userLogin.authorized, payload: { user } });
            })
            .catch(err => {
                // Hubo algún error en la autorización.
                if (err.err_code === 1) {
                    // Usuario negó el acceso a la aplicación
                    dispatch({ type: ACTION_NAMES.userLogin.rejected, payload: { err } });
                } else {
                    // Hubo un error en la API
                    dispatch({ type: ACTION_NAMES.userLogin.failed, payload: { err } });
                }
                
            });
    },

    logOut: (dispatch, getState) => {
        console.log('You\'re logging out');
    },
    
    login: (dispatch, getState) => {
        AuthModule.authorize();
    }
}

export default userActions;