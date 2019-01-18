import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ArtistList from '@components/resultsSet/ArtistList/artistList';

import resultsStyles from './resultsSet.scss';
import searchActions, { SEARCH_ACTIONS } from '@actions/searchActions';
import { getArtistAlbums, RESULT_ACTIONS } from '@actions/resultsActions';

class ResultsSet extends PureComponent {
  render() {
    // Props destructuring
    const {
      onArtistClick,
      search: {
        isError,
        isSearching,
        isFinished,
        searchTarget: {
          term,
          type, 
          results,
          err
        }
      }
    } = this.props;

    // Build header
    const searchFor = ( isSearching || isFinished ) && term != '' ? ''.concat(` - `, term) : '';
    const header = <h1>{ `${ capitalize(type) }${ searchFor }` }</h1>;

    let resultBuild = '';
    if (results !== '') {
      switch (type) {
        case SEARCH_ACTIONS.targets.search.artist:
            resultBuild = <ArtistList artists={ results.items } click={ onArtistClick } />
            break;
      }  
    }
  
    return (
      <section className={ resultsStyles.resultsSet }>
        <header>
          { header }
        </header>
        <main>
          { resultBuild }
        </main>
      </section>
    )
  }
}

const capitalize = ( str ) => {
  return str.toLowerCase().charAt(0).toUpperCase() + str.toLowerCase().slice(1);
}

const propsMapper = state => {
  return {
    search: state.searchReducer
  }
}

const actionsMapper = dispatch => bindActionCreators({ onArtistClick: getArtistAlbums }, dispatch);

export default connect( propsMapper, actionsMapper )(ResultsSet)

