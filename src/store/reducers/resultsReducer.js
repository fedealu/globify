import { RESULTS_ACTIONS } from '@actions/resultsActions';

const initialState = {
    isError: false,
    isSearching: false,
    isFinished: false,
    searchTarget: {
        type: RESULTS_ACTIONS.type.albums,
        searchFor: '',
        results: '',
        err: '',
    }
}

const resultsReducer = (state = initialState, action) => {
    switch (action.type) {

        case RESULTS_ACTIONS.getArtistAlbumsRequest: 
            return {
                ...state,
                isSearching: true,
                searchTarget: {
                    ...state.searchTarget,
                    searchFor: action.payload.artist
                }
            };
        
        case RESULTS_ACTIONS.getArtistAlbumsSuccess:
            return {
                ...state,
                isSearching: false,
                isFinished: true,
                searchTarget: {
                    ...state.searchTarget,
                    results: action.payload.albums
                }
            };
        
        case RESULTS_ACTIONS.getArtistAlbumsFailed:
        return {
                ...state,
                isSearching: false,
                isError: true,
                searchTarget: {
                    ...state.searchTarget,
                    err: action.payload.err
                }
            };
        
        default:
            break;
    }
    return { ...state }
}

export default resultsReducer;