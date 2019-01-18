import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators} from 'redux';

import Icon from '@components/icon/icon'
import { resumeSong, pauseSong } from '@actions/playerActions';

import playerStyles from './player.scss';

class Player extends PureComponent {
  render() {

    const {
        player,
        onPauseHandler,
        onPlayHandler
    } = this.props;

    const mainHandler = ( player.isPlaying && <Icon style={ playerStyles.player__handlers_main } icon='fas fa-pause' clickHandler={ () => { onPauseHandler() } }/> ) ||
                        <Icon style={ playerStyles.player__handlers_main } icon='fas fa-play' clickHandler={ () => { onPlayHandler() } }/> ;

    const songInfo = (
        <div className={ playerStyles.player__info }>
            { player.songLoaded ? <a href={ player.songLoaded.external_urls.spotify } target="_blank">{ `${ player.songLoaded.track_number }. ${ player.songLoaded.name }` }</a>  : '' }
            <div className={ playerStyles.player__info__artist }>
            {
                player.songLoaded ? player.songLoaded.artists
                    .map( artist => 
                        <a key={ artist.id } href={ artist.external_urls.spotify } target="_blank" title={ `Ver ${ artist.name } en Spotify` }>
                            { artist.name }
                        </a>
                    ) : ''
            }
            </div>
        </div>
    )

    const actions = (
        <div className={ playerStyles.player__actions }>
            <Icon style={ playerStyles.player__actions__action } icon="fas fa-person-booth" clickHandler={ () => {console.log('Ir a artista en spotify')} }/>
            <Icon style={ playerStyles.player__actions__action } icon="fas fa-guitar" clickHandler={ () => {console.log('Ir a canción en spotify')} }/>
        </div>
    )

    const handler = (
        <div className={ playerStyles.player__handlers }>
            <Icon style={ playerStyles.player__handlers_secondary } icon='fas fa-step-backward' clickHandler={ () => {} }/>
            { mainHandler }
            <Icon style={ playerStyles.player__handlers_secondary } icon='fas fa-step-forward' clickHandler={ () => {} }/>
        </div>
    );

    return (
      <section className={ playerStyles.player }>
        { songInfo }
        { handler }
        { actions }
      </section>
    )
  }
}

const mapStateToProps = state => {
    return {
        player: state.playerReducer
    }
}

const mapStateToActions = dispatch => bindActionCreators({  onPlayHandler: resumeSong, 
                                                            onPauseHandler: pauseSong }, 
                                                            dispatch)

export default connect(mapStateToProps, mapStateToActions)(Player)