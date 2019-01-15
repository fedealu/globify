export const SEARCH_ACTIONS = {
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
    }
}

export default searchActions;