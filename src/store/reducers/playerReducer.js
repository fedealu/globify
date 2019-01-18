import { PLAYER_ACTIONS } from '@actions/playerActions';

const initialState = {
    isLoading: false,
    isPlaying: false,
    songLoading: '',
    songLoaded: ''
}

const playerReducer = (state = initialState, action) => {
    switch (action.type) {
        case PLAYER_ACTIONS.play.success:
            return {
                ...state,
                isPlaying: true,
                songLoading: '',
                songLoaded: action.payload.song
            }
        
        case PLAYER_ACTIONS.play.resume:
            return {
                ...state,
                isPlaying: true,
            }

        case PLAYER_ACTIONS.pause.success:
            return {
                ...state,
                isPlaying: false
            }
    
        default:
            break;
    }
    return { ...state }
}

export default playerReducer;