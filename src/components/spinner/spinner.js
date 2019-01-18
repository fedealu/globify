import React from 'react';
import styles from './spinner.scss';

const spinner = (props) => {
    let spinnerSize = props.spinnerSize ? props.spinnerSize : styles.fullScreen;
    let spinnerPos = props.spinnerPos ? props.spinnerPos : '';

    switch (spinnerSize) {
        case 'sm':
            spinnerSize = styles.sm;
            break;
        
        case 'cover':
            spinnerSize = styles.cover;
            break;
    
        default:
            break;
    }

    switch (spinnerPos) {
        case 'right':
            spinnerPos = styles.right;
            break;
    }

    const classes = `${ styles.Spinner } ${ spinnerSize } ${ spinnerPos } fadeIn`;

    return (
        <div className={ classes }>
            <div className={ styles.Spinner__element }></div>
            <p>Loading all your music</p>
        </div>
    )
}

export default spinner