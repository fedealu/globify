import Spotify from "@models/Spotify";

const spoti = new Spotify();

export const SONG_ACTIONS = {
  request: "SONGS_REQUEST",
  success: "SONGS_SUCCESS",
  failed: "SONGS_FAILED",
  openSongsList: "SONG_LIST_DISPLAY",
  closeSongsList: "SONG_LIST_CLOSE",
};

export const searchTracks = albumId => {
  return (dispatch, getState) => {
    console.log('hola');
    const { songsReducer } = getState();
    if (songsReducer.searchTarget.album !== albumId) {
      dispatch({
        type: SONG_ACTIONS.request,
        payload: { albumTarget: albumId }
      });
      spoti
        .getAlbumTracks(albumId)
        .then(tracks => {
          dispatch({
            type: SONG_ACTIONS.success,
            payload: { results: tracks.items }
          });
        })
        .catch(err => {
          dispatch({ type: SONG_ACTIONS.success, payload: { err } });
        });
    }
  };
};

export const songListDisplay = albumId => {
  return (dispatch, getState) => {
    const { songsReducer } = getState();
    if ( songsReducer.displaySongList ) {
      dispatch({
        type: SONG_ACTIONS.closeSongsList
      });
    } else {
      dispatch({
        type: SONG_ACTIONS.openSongsList
      });
    }
  };
};
