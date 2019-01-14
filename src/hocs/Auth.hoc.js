import React, { Component } from 'react';
import { connect } from 'react-redux';

// Redux user actions
import usrActions from '@actions/userActions';
import Spinner from "@components/spinner/spinner";

class Auth extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onAuthorize();
    }
    
    render() {
        
        if ( !this.props.user.isRequesting ) {
            this.toRender = this.props.user.isLoggedIn ? (
                <div>
                    <h1>This is the App</h1>
                    { this.props.children }
                </div>
            ) : (
              <div>
                    <h1>Error en login</h1>
                    <button onClick={ this.props.onButtonClick }>click me!</button>
                </div>
            )
        } else {
            this.toRender = <Spinner />
        }

        return this.toRender
    }
}

const propsMapper = state => {
    return {
        user: state.userReducer.user
    }
}

const actionsMapper = dispatch => {
    return {
        onAuthorize: () => usrActions.authorize(dispatch),
        onButtonClick: () => usrActions.login(dispatch)
    }
}

export default connect(propsMapper, actionsMapper)(Auth)
