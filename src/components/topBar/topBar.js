import React from 'react';

import Search from '@containers/search/search';

import topBarStyles from './topBar.scss';

import ReactSVG from 'react-svg';

//import logo from '@img/logo/gl.svg';

export default (props) => {
    return (
        <div className={ topBarStyles.topbar }>
            <div className={ topBarStyles.topbar__logo }>
                { /* Logo */ }
            </div>
            <Search />
        </div>
    );
}