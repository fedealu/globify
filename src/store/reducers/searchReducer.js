import { SEARCH_ACTIONS } from '@actions/searchActions';

const initialState = {
    isError: false,
    isSearching: false,
    isFinished: false,
    searchTarget: {
        type: SEARCH_ACTIONS.targets.artists,
        term: ''
    }
}

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_ACTIONS.newTarget: // Changed the search target from the sidenav
            return {
                searchTarget: {
                    ...state.searchTarget,
                    type: action.payload.newTarget
                }
            }
            break;
    
        default:
            break;
    }
    return { ...state }
}

export default searchReducer;