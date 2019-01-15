import { PLAYER_ACTIONS } from '@actions/playerActions';

const initialState = {
    player : {
        playing: false,
        loaded: false
    }
}

const playerReducer = (state = initialState, action) => {
    return { ...state }
}

export default playerReducer;