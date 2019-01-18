import Spotify from '@models/Spotify';

const spoti = new Spotify();

export const SEARCH_ACTIONS = {
    // Search management
    request: 'SEARCH_REQUEST',
    success: 'SEARCH_SUCCESS',
    failed: 'SEARCH_FAILED',
    empty: 'SEARCH_EMPTY',
    // Target management
    newTarget: 'NEW_TARGET',
    targets: { ...spoti.getTypes() }
}

export const switchSearchObjective = newTarget => {
    return ( dispatch, getState ) => {
        dispatch({ type: SEARCH_ACTIONS.newTarget, payload: { newTarget } })
        const currentState = getState().searchReducer;
        if (currentState.searchTarget.term != '') {
            // Fire new search on switching Search Objective
            newSearch(currentState.searchTarget.term)(dispatch, getState);
        }
    }
}

export const newSearch = searchTerm => {
    return ( dispatch, getState ) => {
        if ( searchTerm === '' ) {
            dispatch({ type: SEARCH_ACTIONS.empty })
            //TODO: BUSCAR FAVORITOS
        } else {
            const currentState = getState().searchReducer;
            dispatch({ type: SEARCH_ACTIONS.request, payload: { searchTerm } })
            const type = currentState.searchTarget.type;
            spoti.search(searchTerm, type)
                .then( results => {
                    dispatch({ type: SEARCH_ACTIONS.success, payload: { results } })
                })
                .catch( err => {
                    dispatch({ type: SEARCH_ACTIONS.err, payload: { err } })
                });
        }
    }
}