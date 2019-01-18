import { SEARCH_ACTIONS } from '@actions/searchActions';

const initialState = {
    isError: false,
    isSearching: false,
    isFinished: false,
    searchTarget: {
        type: SEARCH_ACTIONS.targets.search.artist,
        term: '',
        results: '',
        err: '',
    }
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_ACTIONS.newTarget: // Changed the search target from the sidenav
            return {
                searchTarget: {
                    ...state.searchTarget,
                    type: action.payload.newTarget,
                    results: ''
                }
            }

        case SEARCH_ACTIONS.request: // Changed the search term
            return {
                ...state,
                isSearching: true,
                searchTarget: {
                    ...state.searchTarget,
                    term: action.payload.searchTerm
                }
            }
        
        case SEARCH_ACTIONS.success: // Changed the search term
            return {
                ...state,
                isSearching: false,
                isFinished: true,
                searchTarget: {
                    ...state.searchTarget,
                    results: action.payload.results
                }
            }
        
        case SEARCH_ACTIONS.empty: // Changed the search term
            return {
                ...state,
                isSearching: false,
                isFinished: true,
                searchTarget: {
                    ...state.searchTarget,
                    results: ''
                }
            }
        
        case SEARCH_ACTIONS.failed: // Changed the search term
            return {
                ...state,
                isError: true,
                isSearching: false,
                isFinished: true,
                searchTarget: {
                    ...state.searchTarget,
                    err: action.payload.err
                }
            }
    
        default:
            break;
    }
    return { ...state }
}

export default searchReducer;