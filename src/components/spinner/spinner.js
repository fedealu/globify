import React from 'react';
import styles from './spinner.scss';

const spinner = (props) => {
    let spinnerSize = props.spinnerSize ? props.spinnerSize : styles.fullScreen;

    const classes = `${styles.Spinner} ${spinnerSize} fadeIn`;
    console.log(styles);

    return (
        <div className={ classes }>
            <div className={ styles.Spinner__element }></div>
            <p>Loading all your music</p>
        </div>
    )
}

export default spinner