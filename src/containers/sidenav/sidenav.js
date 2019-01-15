import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import SearchActions from '@actions/searchActions';
import UserActions from '@actions/userActions';

import sidenavStyles from './sidenav.scss';
import UserProfile from '@components/sidenav/userProfile/userProfile';
import Navigation from '@components/sidenav/navigation/navigation';


class Sidenav extends PureComponent {

  render() {
    const { 
            // States
            user,
            searchTarget,
            // Actions
            onNavClick,
            onLogOut } = this.props;

    return (
        <aside className={ sidenavStyles.sidenav }>
            <UserProfile user={ user } />
            <Navigation clickHandler={ onNavClick } selected={ searchTarget.type }/>
            <button onClick={ onLogOut } className={sidenavStyles.sidenav__logout}>
                <i className="fas fa-times"></i>
                <p>Cerrar Sesión</p>
            </button>
        </aside>
    )
  }
}

const propsMapper = state => {
    return {
        user: state.userReducer.user,
        searchTarget: state.searchReducer.searchTarget
    }
}

const actionsMapper = dispatch => {
    return {
        onLogOut: () => UserActions.logOut(dispatch),
        onNavClick: ( newObj ) => SearchActions.switchSearchObjective(dispatch, newObj)
    }
}

export default connect(propsMapper, actionsMapper)(Sidenav);
