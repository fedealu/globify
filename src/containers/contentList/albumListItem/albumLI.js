import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { searchTracks } from "@actions/songActions";
import RoundedImg from "@components/roundedImg/roundedImg";
import Spinner from "@components/spinner/spinner";
import SongLI from "@containers/songLI/songLI";

import contentStyles from "@components/contentList/contentStyles.scss";

class AlbumLI extends PureComponent {
  constructor(props) {
    super(props);
    this.searchTracks = this.props.searchTracks;
    this.album = this.props.album;
  }

  render() {
    const { songsReducer } = this.props;

    const img = this.album.images[2] || this.album.images[1] || this.album.images[0];

    let spinner = "",
      selected = "",
      songs = "",
      songList = "",
      openSongList = "";

    if (songsReducer.searchTarget.album === this.album.id) {
      // Build Spinner
      spinner = songsReducer.isSearching && (
        <Spinner spinnerSize="sm" spinnerPos="right" />
      );

      // Build selected Class
      selected = contentStyles.results__list_item__selected;

      if ( songsReducer.isShowingSongsList ) {
        openSongList = contentStyles.results__list_item__selected__open;
      }

      // Build Songs
      songs =
        songsReducer.isFinished &&
        !songsReducer.isError &&
        songsReducer.searchTarget.results.map(song => (
          <SongLI key={song.id} song={song} />
        ));

      songList = (
        <div className={[contentStyles.results__songs, openSongList].join(" ")}>
          <ul className={contentStyles.results__songs__list}>{songs}</ul>
        </div>
      );
    }

    return (
      <li className={[contentStyles.results__list_item, selected].join(" ")} title={ this.album.name }>
        <div
          className={contentStyles.results__list_item_header}
          onClick={() => this.onClickHandler()}
        >
          <RoundedImg size="sm" img={img} />
          <div className={contentStyles.results__list_item_info}>
            <h4>{ this.album.name }</h4>
            <small>
              {`${this.album.total_tracks}
                                ${
                                  this.album.total_tracks > 1
                                    ? " canciones"
                                    : " canción"
                                } • 
                                ${this.album.album_type} • 
                                ${formatDate(new Date(this.album.release_date))}`}
            </small>
            {spinner}
          </div>
        </div>
        {songList}
      </li>
    );
  }

  onClickHandler() {
    this.searchTracks(this.album.id);
  }

  isAlbumSelected() {
    return this.props.songsReducer.searchTarget.album === this.album.id;
  }

  isAlbumShowing() {
    return this.props.songsReducer.isShowingSongsList;
  }
}

function formatDate(date) {
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
}

const propsMapper = state => {
  return {
    songsReducer: state.songsReducer
  };
};

const actionsMapper = dispatch =>
  bindActionCreators({ searchTracks }, dispatch);

export default connect(
  propsMapper,
  actionsMapper
)(AlbumLI);
