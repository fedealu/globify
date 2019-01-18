import Spotify from '@models/Spotify';

const spoti = new Spotify();

export const SONG_ACTIONS = {
    request: 'SONGS_REQUEST',
    success: 'SONGS_SUCCESS',
    failed: 'SONGS_FAILED'
}

export const searchTracks = ( albumId ) => {
    return (dispatch, getState) => {
        dispatch({type: SONG_ACTIONS.request, payload: { albumTarget: albumId}});
        spoti.getAlbumTracks(albumId)
            .then(tracks => {
                dispatch({type: SONG_ACTIONS.success, payload: { results: tracks.items }});
            })
            .catch(err => {
                dispatch({type: SONG_ACTIONS.success, payload: { err }});
            })
    }
}