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

const resultsActions = {
    getArtistAlbums: (dispatch, artist) => {
        console.log('[RESULT_ACTIONS]', artist);
        dispatch({ type: RESULTS_ACTIONS.getArtistAlbumsRequest, payload: { artist } });
        spoti.getArtistAlbums( artist.id )
            .then( albums => {
                dispatch({ type: RESULTS_ACTIONS.getArtistAlbumsSuccess, payload: { albums } });
            })
            .catch( err => {
                dispatch({ type: RESULTS_ACTIONS.getArtistAlbumsFailed, payload: { err } });
            })
    }
}

export default resultsActions;