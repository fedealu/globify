import Spotify from '@models/Spotify';

export const SEARCH_ACTIONS = {
    // Search management
    request: 'SEARCH_REQUEST',
    success: 'SEARCH_SUCCESS',
    failed: 'SEARCH_FAILED',
    
    // Target management
    newTarget: 'NEW_TARGET',
    targets: {
        artists:    'ARTISTS',
        albums:     'ALBUMS',
        songs:      'SONGS',
        playlists:  'PLAYLISTS'
    }
}

const searchActions = {
    switchSearchObjective: ( dispatch, newTarget ) => {
        dispatch({ type: SEARCH_ACTIONS.newTarget, payload: { newTarget } })
        history.pushState({}, 'asdasdasd', document.URL + '/' + newTarget);
    },

    newSearch: ( dispatch, searchTerm ) => {
        if ( searchTerm === '' ) {
            dispatch({ type: SEARCH_ACTIONS.request, payload: { searchTerm } })
            //TODO: BUSCAR FAVORITOS
        } else {
            dispatch({ type: SEARCH_ACTIONS.request, payload: { searchTerm } })
            const spoti = new Spotify();
            spoti.search(searchTerm)
                .then( results => {
                    dispatch({ type: SEARCH_ACTIONS.success, payload: { results } })
                })
                .catch( err => {
                    dispatch({ type: SEARCH_ACTIONS.err, payload: { err } })
                });
        }
    },
}

export default searchActions;