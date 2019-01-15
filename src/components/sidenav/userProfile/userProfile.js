import React from 'react';

import RoundedImg from '@components/roundedImg/roundedImg';

import upStyles from './userProfile.scss';

export default ( props ) => {
    const { user } = props;

    return (
        <header className={ upStyles.up__header }>
            <RoundedImg 
                img={ { url: user.imgURL, alt: `Imagen de perfil de ${user.name}` } } 
                size={'md'}
                />
            <div className={ upStyles.up__header__info }>
                <p>{ user.name }</p>
                <a href={ user.usrURL } target="_blank">Visitar perfil de Spotify</a>
            </div>
        </header>
    )
}