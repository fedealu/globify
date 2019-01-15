import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import searchStyles from './search.scss';

class Search extends PureComponent {

  render() {
    const { 
      search 
    } = this.props; 

    return (
      <div className={ searchStyles.search }>
        <p>Buscar</p>
        <input type="text" onChange={ this.onChangeHandler } value={ search.searchTerm } class={ searchStyles.search__input }/>
      </div>
    )
  }
}

const propsMapper = state => {
  return {
    search: state.searchReducer.searchTarget
  }
}

export default connect(propsMapper)(Search);
