import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Icon from '@components/icon/icon';
import { playSong, pauseSong } from '@actions/playerActions';

import songStyles from './songLI.scss';

class songLI extends PureComponent {
  render() {
    const {
      song,
      playerReducer,
      onPlayHandler,
      onPauseHandler
    } = this.props;

    let actions = <Icon icon='fas fa-play' clickHandler={ () => onPlayHandler(song) }/>;
    let selected = '';

    if ( playerReducer.songLoaded.id === song.id ) {
      selected = songStyles.song__selected;
      if ( playerReducer.isPlaying ) {
        actions = { ...actions, props: { icon: 'fas fa-pause', clickHandler: () => onPauseHandler() }};
      }
    }
  
    return (
      <li className={ [songStyles.song, selected].join(' ') }>
        <p>
          <span className={ songStyles.song__title }>{ `${ song.track_number }. ${ song.name }` }</span>
          <span className={ songStyles.song__duration }>{ `${new Date(song.duration_ms).getMinutes()}:${ addZero(new Date(song.duration_ms).getSeconds()) }` }</span>
        </p>
        <div className={ songStyles.song__actions }>
          { actions }
        </div>
      </li>
    )
  }
}

function addZero(i) {
  if (i < 10) {
      i = "0" + i;
  }
  return i;
}

const mapStateToProps = state => {
    return {
        playerReducer: state.playerReducer
    }
}

const mapStateToActions = dispatch => bindActionCreators({  onPlayHandler: playSong, 
                                                            onPauseHandler: pauseSong }, 
                                                            dispatch);

export default connect(mapStateToProps, mapStateToActions)(songLI)
