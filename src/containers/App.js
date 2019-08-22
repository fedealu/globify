import React, { PureComponent } from 'react';
import { connect } from 'react-redux'

import SidenavContainer from '@containers/sidenavContainer/sidenavContainer';
import SearchResultContainer from '@containers/searchResultContainer/searchResultContainer';
import ContentList from '@containers/contentList/contentList';
import TopBar from '@components/topBar/topBar';
import PlayerContainer from '@containers/playerContainer/playerContainer';


import appStyles from './App.scss';

class App extends PureComponent {
    render() {
        return (
            <div className={ appStyles.App }>
                <SidenavContainer />
                <TopBar />
                <SearchResultContainer />
                <ContentList />
                <PlayerContainer />
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