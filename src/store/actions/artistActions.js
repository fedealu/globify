import Spotify from '@models/Spotify';

export const ARTIST_ACTIONS = {
    request: 'ARTIST_REQUEST',
    success: 'ARTIST_SUCCESS',
    failed: 'ARTIST_FAILED'
}

const ArtistActions = {
    searchArtists: (dispatch, searchTerm) => {
        const spoti = new Spotify();
        spoti.search(searchTerm, spoti.getTypes().search.artist)
            .then( results => {
                dispatch({ type: SEARCH_ACTIONS.success, payload: { results } })
            })
            .catch( err => {
                dispatch({ type: SEARCH_ACTIONS.err, payload: { err } })
            });
    }
}