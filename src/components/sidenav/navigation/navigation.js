import React from 'react';

import navStyles from './navigation.scss';

import { SEARCH_ACTIONS } from '@actions/searchActions';

export default (props) => {

    // Map to convert every search target possible to an JSX element
    const liItems = Object.keys( SEARCH_ACTIONS.targets ).map( (key) => {
        const target = SEARCH_ACTIONS.targets[ key ];
        let selected = '';
        // Determine which item is selected. By default is 'Artist'. This is defined in the SearchReducer
        if ( props.selected === target) {
            selected = navStyles.selected;
        }
        // Build the HTML component with the data passed
        return (
            <li className={ selected } key={ key }>
                <button alt="Buscar por Artistas" onClick={ () => { props.clickHandler(target) } }>{ capitalize(target) }</button>
            </li>
        );
    })

    return (
        <nav className={ navStyles.nav }>
            <ul>
                { liItems /* Print search target list */ }
            </ul>
        </nav>
    );
}

const capitalize = ( str ) => {
    return str.toLowerCase().charAt(0).toUpperCase() + str.toLowerCase().slice(1);
}