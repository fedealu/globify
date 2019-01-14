import USR_ACTIONS from '@actions/userActions';
//const USR_ACTIONS = require('@actions/userActions');

const initialState = {
    user: {
        isRequesting: false,
        isLoggedIn: false
    }
};

const userReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case USR_ACTIONS.names.userLogin.failed:
            return {
                ...state,
                user: {
                    ...state.user,
                    isRequesting: false,
                    isLoggedIn: false
                }
            }

        case USR_ACTIONS.names.userLogin.requesting:
            return {
                ...state,
                user: {
                    isRequesting: true,
                    isLoggedIn: false
                }
            }

        case USR_ACTIONS.names.userLogin.authorized:
            return {
                ...state,
                user: {
                    isRequesting: false,
                    isLoggedIn: true
                }
            }
    }

    return {...state};
}

export default userReducer;