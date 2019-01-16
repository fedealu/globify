import React from 'react';

import RoundedImg from '@components/roundedImg/roundedImg';

import generalStyles from '@components/resultsSet/resultsStyles.scss';
import artistStyles from '@components/resultsSet/ArtistList/Artist/artist.scss';

export default (props) => {
    const { 
        artist, 
        click: onClickHandler } = props;

    const artistImg =   artist.images[1] || 
                        artist.images[0] || 
                        artist.images[2];

    return (
        <li 
            onClick={ () => onClickHandler(artist) }
            className={ generalStyles.results__card }
            title={ artist.name }>
            <RoundedImg img={ artistImg || {} } size="lg" />
            <h2 className={ artistStyles.artist__title }>{ artist.name }</h2>
            <div className={ generalStyles.results__card_info }>
                <p>{ artist.followers.total } Followers</p>
                <span>|</span>
                <a href={ artist.external_urls.spotify }>Ver en Spotify</a>
            </div>
            
        </li>
    );
}