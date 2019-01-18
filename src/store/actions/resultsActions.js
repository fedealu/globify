import Spotify from '@models/Spotify';

export const RESULTS_ACTIONS = {
    getArtistAlbumsRequest: 'RESULTS_ARTIST_ALBUMS_REQUEST',
    getArtistAlbumsError: 'RESULTS_ARTIST_ALBUMS_FAILED',
    getArtistAlbumsSuccess: 'RESULTS_ARTIST_ALBUMS_SUCCESS',
    type: {
        albums: 'ALBUMS',
        songs: 'SONGS'
    }
}

const spoti = new Spotify();

export const getArtistAlbums = ( artist ) => {
    return (dispatch) => {
        dispatch({ type: RESULTS_ACTIONS.getArtistAlbumsRequest, payload: { artist, type: RESULTS_ACTIONS.type.albums } });
        spoti.getArtistAlbums( artist.id )
            .then( albums => {
                dispatch({ type: RESULTS_ACTIONS.getArtistAlbumsSuccess, payload: { albums } });
            })
            .catch( err => {
                dispatch({ type: RESULTS_ACTIONS.getArtistAlbumsFailed, payload: { err } });
            })
    }
}