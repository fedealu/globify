import { SONG_ACTIONS } from '@actions/songActions';

const initialState = {
    isSearching: false,
    isError: false,
    isFinished: false,
    searchTarget: {
        album: '',
        results: '',
        err: '',
    }
}

const songsReducer = (state = initialState, action) => {
    switch( action.type ) {
        case SONG_ACTIONS.request:
            return {
                ...state,
                isSearching: true,
                isFinished: false,
                searchTarget: {
                    ...state.searchTarget,
                    album: action.payload.albumTarget,
                    results: ''
                }
            };
        
        case SONG_ACTIONS.success:
            return {
                ...state,
                isSearching: false,
                isFinished: true,
                searchTarget: {
                    ...state.searchTarget,
                    results: action.payload.results
                }
            };

        case SONG_ACTIONS.failed:
            return {
                ...state,
                isSearching: false,
                isFinished: true,
                isError: true,
                searchTarget: {
                    ...state.searchTarget,
                    err: action.payload.err
                }
            }
    }
    return {...state}
}

export default songsReducer;