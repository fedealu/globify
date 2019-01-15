import React, { PureComponent } from 'react';

import albumsStyle from './albumList.scss';

export default class AlbumList extends PureComponent {
    render() {
        return (
            <div className={ albumsStyle.albums }>
                this is album list
            </div>
        );
    }
}
