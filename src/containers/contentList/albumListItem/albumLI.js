import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { searchTracks } from '@actions/songActions';
import RoundedImg from '@components/roundedImg/roundedImg';
import Spinner from '@components/spinner/spinner';
import SongLI from '@containers/songLI/songLI';

import contentStyles from '@components/contentList/contentStyles.scss';

class AlbumLI extends PureComponent {

    render() {
        const { 
            album,
            onClickHandler,
            songsReducer } = this.props;

        const img = album.images[2] || album.images[1] || album.images[0];

        // const spinner = songsReducer.isSearching && 
        //                 songsReducer.searchTarget.album === album.id && 
        //                 <Spinner spinnerSize="sm" spinnerPos="right" />;
        
        // const selectedClass = songsReducer.searchTarget.album === album.id ? contentStyles.results__list_item__selected : '';
        // const buildSongs = '';

        let spinner = '', 
            selected = '', 
            songs = '', 
            songList = '';

        if (songsReducer.searchTarget.album === album.id) {
            // Build Spinner
            spinner = songsReducer.isSearching && <Spinner spinnerSize="sm" spinnerPos="right" />;
            
            // Build selected Class
            selected = contentStyles.results__list_item__selected;

            // Build Songs
            songs =  songsReducer.isFinished && !songsReducer.isError && 
                        songsReducer.searchTarget.results.map( song => <SongLI key={ song.id } song={ song } /> )
            
            songList = (
                            <div className={ contentStyles.results__songs }>
                                <ul>
                                    { songs }
                                </ul>
                            </div>
                        )
        }

        return (
            <li className={ [contentStyles.results__list_item, selected].join(' ') } >
                <div className={ contentStyles.results__list_item_header } onClick={() => onClickHandler( album.id ) }>
                    <RoundedImg size="sm" img={ img } />
                    <div className={ contentStyles.results__list_item_info }>
                        <h4>{ album.name }</h4>
                        <small>
                            {`${ album.total_tracks }
                                ${ album.total_tracks > 1 ? ' canciones' : ' canción' } • 
                                ${ album.album_type } • 
                                ${ formatDate(new Date(album.release_date)) }`}
                        </small>
                        { spinner }
                    </div>
                </div>
                { songList }
            </li>
        )
    }
}

function formatDate(date) {
    return date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
}


const propsMapper = state => {
    return {
        songsReducer: state.songsReducer,
    }
}

const actionsMapper = dispatch => bindActionCreators({ onClickHandler: searchTracks }, dispatch);
  
export default connect(propsMapper, actionsMapper)(AlbumLI);