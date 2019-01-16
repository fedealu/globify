import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import contentsStyle from './contentList.scss';

class ContentList extends PureComponent {
    render() {

        const {
            isSearching,
            isError,
            isFinished,
            searchTarget: {
                type,
                searchFor,
                results,
                err
            }
        } = this.props.results;

        return (
            <section className={ contentsStyle.container }>
                { isSearching ? 'estoy buscando' : 'termine de buscar'}
            </section>
        );
    }
}

const propsMapper = state => {
    return {
        results: state.resultsReducer
    }
}

export default connect( propsMapper )( ContentList );
