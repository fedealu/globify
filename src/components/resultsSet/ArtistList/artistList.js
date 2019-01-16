import React from 'react'

import Artist from '@components/resultsSet/ArtistList/Artist/artist';

import generalStyles from '@components/resultsSet/resultsStyles.scss';

export default (props) => {
    const { artists } = props;
    const artistBuild = Object.keys( artists ).map( key => {
        const artist = artists[key];
        return <Artist artist={ artist } click={ props.click } key={ key } />
    });

    const classes = [generalStyles.results].join('');

    return (
        <ul className={ classes }>
            { artistBuild }
        </ul>
    );
}
