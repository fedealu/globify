import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Spinner from '@components/spinner/spinner';

import searchStyles from './search.scss';
import searchReducer from '../../store/reducers/searchReducer';
import searchActions from '../../store/actions/searchActions';

class Search extends PureComponent {

  constructor(props) {
    super(props);
    this.timeout = '';
    this.state = {
      searchTerm: ''
    }
  }

  onChangeHandler(e) {
    // Clear timeout if it was set
    clearTimeout(this.timeout);
    // Bind new name to props
    const {
      onNewSearch
    } = this.props;
    // Retrieving the value that has been searched for.
    const searchItem = document.querySelector('#searchTerm');
    const searchTerm = searchItem.value;
    //Building the timeout to trigger search after .5s
    this.timeout = setTimeout( searchTerm => onNewSearch(searchTerm), 500, searchTerm);
    // Setting the state to update the field value
    this.setState({...this.state, searchTerm});
  }

  render() {
    const { 
      search: {
        isSearching,
        searchTarget
      },

    } = this.props;

    const loader = isSearching ? <Spinner spinnerSize="sm" spinnerPos="right" /> : '';

    return (
      <div className={ searchStyles.search }>
        <p>Buscar</p>
        <span>|</span>
        <div className={ searchStyles.search__input }>
          <input 
            type="text" 
            id="searchTerm" 
            onChange={ (e) => this.onChangeHandler(e) } 
            value={ this.state.searchTerm }/>
          { loader }
        </div>
      </div>
    )
  }
}

const propsMapper = state => {
  return {
    search: state.searchReducer
  }
}

const actionsMapper = dispatch => {
  return {
    onNewSearch: searchTerm => searchActions.newSearch(dispatch, searchTerm)
  }
}

export default connect( propsMapper, actionsMapper )(Search);
