export const PLAYER_ACTIONS = {
    play: {
        request: 'PLAY_REQUEST',
        success: 'PLAY_SUCCESS',
        loaded: 'PLAY_SONG_LOADED',
        failed: 'PLAY_FAILED',
        resume: 'PLAY_RESUME'
    },
    pause: {
        request: 'PAUSE_REQUEST',
        success: 'PAUSE_SUCCESS',
        failed: 'PAUSE_FAILED'
    }
}

export const playSong = ( song ) => {
    return ( dispatch ) => {
        console.log('Im playing this song', song);
        //dispatch({ type: PLAYER_ACTIONS.play.request, payload: { id: songId } });
        dispatch({ type: PLAYER_ACTIONS.play.success, payload: { song } });
    }
}

export const resumeSong = () => {
    return ( dispatch ) => {
        //dispatch({ type: PLAYER_ACTIONS.play.request, payload: { id: songId } });
        dispatch({ type: PLAYER_ACTIONS.play.resume });
    }
}

export const pauseSong = ( ) => {
    return ( dispatch ) => {
        console.log('Im pausing the player');
        //dispatch({ type: PLAYER_ACTIONS.pause.request, payload: { id: songId } });
        dispatch({ type: PLAYER_ACTIONS.pause.success });
    }
}