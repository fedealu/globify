import React from 'react';

import SearchContainer from '@containers/searchContainer/searchContainer';

import topBarStyles from './topBar.scss';

import ReactSVG from 'react-svg';

//import logo from '@img/logo/gl.svg';

export default (props) => {
    return (
        <div className={ topBarStyles.topbar }>
            <div className={ topBarStyles.topbar__logo }>
                { /* Logo */ }
            </div>
            <SearchContainer />
        </div>
    );
}