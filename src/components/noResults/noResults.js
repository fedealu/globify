import React from 'react';

import styles from './noResults.scss';

export default (props) => {
    
    return (
        <div className={ styles.noResults }>
            <p>No hay resultados para la búsqueda actual.</p>
        </div>
    );
}