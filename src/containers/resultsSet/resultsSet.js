import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import resultsStyles from './resultsSet.scss';

export default class ResultsSet extends PureComponent {
  render() {
    return (
      <div className={ resultsStyles.resultsSet }>
        this is results set!
      </div>
    )
  }
}

