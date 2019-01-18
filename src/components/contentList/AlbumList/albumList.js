import React from 'react';

import AlbumLI from '@containers/contentList/albumListItem/albumLi';

import albumListStyles from './albumList.scss';

export default (props) => {
  const {
    type,
    content
  } = props;

  const albumListItems = content.map( ( album, i ) => {
    return <AlbumLI key={ i } album={album} />
  } );

  return (
    <ul className={ albumListStyles.albumList } >
      { albumListItems }
    </ul>
  )
}
