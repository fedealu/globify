import React from 'react';
import noImage from '@img/no_image.png';

import styles from './roundedImg.scss';

export default (props) => {
    const { img, size } = props;

    let classes = styles.RoundedImg;
    
    switch (size) {
        case 'sm':
            classes = `${classes} ${styles.sm}`
            break;

        case 'md':
            classes = `${classes} ${styles.md}`
            break;

        case 'lg':
            classes = `${classes} ${styles.lg}`
            break;

        default:
            break;
    }

    return (
        <div className={ classes }>
            <img src={ img && img.url || noImage } alt={ img && img.alt || 'Este usuario no tiene imagen de perfil'}/>
        </div>
    );
}