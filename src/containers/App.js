import React, { PureComponent } from 'react';
import { connect } from 'react-redux'

import Sidenav from '@containers/sidenav/sidenav';
import ResultsSet from '@containers/resultsSet/resultsSet';
import ContentList from '@containers/contentList/contentList';
import TopBar from '@components/topBar/topBar';
import Player from '@containers/player/player';


import appStyles from './App.scss';

class App extends PureComponent {
    render() {
        return (
            <div className={ appStyles.App }>
                <Sidenav />
                <TopBar />
                <ResultsSet />
                <ContentList />
                <Player />
            </div>
        )
    }
}

const propsMapper = state => {
    return {
        player: state.playerReducer
    }
}

export default connect( propsMapper )(App);