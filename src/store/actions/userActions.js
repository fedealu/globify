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
                dispatch({ type: ACTION_NAMES.userLogin.authorized, payload: { user } })
            })
            .catch(err => {
                // Hubo algún error en la autorización.
                dispatch({ type: ACTION_NAMES.userLogin.failed });
            });
    },
    
    login: (dispatch, getState) => {
        dispatch({ type: ACTION_NAMES.userLogin.requesting });
        AuthModule.authorize();
    }
}

export default userActions;