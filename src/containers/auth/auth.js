import React, { Component } from 'react';
import { connect } from 'react-redux';

// Redux user actions
import usrActions from '@actions/userActions';
import Spinner from "@components/spinner/spinner";

// Styles
import authStyles from './auth.scss';

class Auth extends Component {

    componentDidMount() {
        this.props.onAuthorize();
    }
    
    render() {
        // Destructuting the props variable
        const { 
            children,
            onRequestingLogin,
            user : {
                isLoggedIn, 
                isRejected, 
                isRequesting 
                }
            } = this.props;
        
        const alert = isRejected ? (<div className="alert error">No iniciaste sesión en Spotify. No podremos reproducir música para vos.</div>) : '';

        const loader = isRequesting ? <Spinner /> : '';

        this.toRender = isLoggedIn ? (
            <div>
                { children }
            </div>
        ) : (
            <div className={ authStyles.Auth__form_container }>
                { alert }
                <div className={ authStyles.Auth__login_form }>
                    <p>Debe iniciar sesión en Spotify para continuar.</p>
                    <button onClick={ onRequestingLogin }>Quiero mi música ya!</button>
                    { loader }
                </div>
            </div>
        )

        return this.toRender
    }
}

const propsMapper = state => {
    return {
        user: state.userReducer
    }
}

const actionsMapper = dispatch => {
    return {
        onAuthorize: () => usrActions.authorize(dispatch),
        onRequestingLogin: () => usrActions.login(dispatch)
    }
}

export default connect(propsMapper, actionsMapper)(Auth)
