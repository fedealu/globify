import USR_ACTIONS from '@actions/userActions';
//const USR_ACTIONS = require('@actions/userActions');

const initialState = {
    isRequesting: false,
    isLoggedIn: false,
    isError: false,
    isRejected: false,
    user: null
};

const userReducer = (state = initialState, action) => {
    switch ( action.type ) {
        case USR_ACTIONS.names.userLogin.failed:
            return {
                ...state,
                isError: true,
                isRequesting: false,
                err: { ...action.payload.err }
            }

        case USR_ACTIONS.names.userLogin.rejected:
            return {
                ...state,
                isRejected: true,
                isRequesting: false,
                err: { ...action.payload.err }
            }

        case USR_ACTIONS.names.userLogin.requesting:
            return {
                ...state,
                isRequesting: true,
                isLoggedIn: false,
            }

        case USR_ACTIONS.names.userLogin.authorized:
            return {
                ...state,
                isRequesting: false,
                isLoggedIn: true,
                user: {
                    ...action.payload.user
                }
            }
    }

    return {...state};
}

export default userReducer;