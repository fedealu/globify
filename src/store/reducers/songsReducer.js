import { SONG_ACTIONS } from "@actions/songActions";

const initialState = {
  isSearching: false,
  isError: false,
  isFinished: false,
  isShowingSongsList: false,
  searchTarget: {
    album: "",
    results: "",
    err: ""
  }
};

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SONG_ACTIONS.request:
      return {
        ...state,
        isSearching: true,
        isFinished: false,
        isShowingSongsList: true,
        searchTarget: {
          ...state.searchTarget,
          album: action.payload.albumTarget,
          results: ""
        }
      };

    case SONG_ACTIONS.success:
      return {
        ...state,
        isSearching: false,
        isFinished: true,
        isShowingSongsList: true,
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
        isShowingSongsList: false,
        searchTarget: {
          ...state.searchTarget,
          err: action.payload.err
        }
      };

    case SONG_ACTIONS.openSongsList:
      return {
        ...state,
        isShowingSongsList: true
      };

    case SONG_ACTIONS.closeSongsList:
      return {
        ...state,
        isShowingSongsList: false
      };
  }
  return { ...state };
};

export default songsReducer;
