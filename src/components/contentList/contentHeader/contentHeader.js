import React from 'react';

import RoundedImg from '@components/roundedImg/roundedImg';

import contentStyles from '@components/contentList/contentStyles.scss';

export default ( props ) => {
    const img = props.content.images[1] || props.content.images[2] || props.content.images[0];

    const content = (
        <header className={ contentStyles.results }>
            <h2>{ capitalize( props.type ) }</h2>
            <div className={ contentStyles.results__header_content }>
                <RoundedImg size="md" img={ img } />
                <div className={ contentStyles.results__header_info }>
                    <div className={ contentStyles.results__header_info_title }>
                        <h3>{ props.content.name }</h3>
                        <a href={ props.content.external_urls.spotify }>Ver en Spotify</a>
                    </div>
                    <div className={ contentStyles.results__header_info_followers }>
                        <p>{ props.content.followers.total }</p>
                        <small>followers</small>
                    </div>
                </div>
            </div>
        </header>
    );

    return content;
}

const capitalize = ( str ) => {
    return str.toLowerCase().charAt(0).toUpperCase() + str.toLowerCase().slice(1);
}
