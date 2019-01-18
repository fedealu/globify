import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Spinner from '@components/spinner/spinner';
import ContentHeader from '@components/contentList/contentHeader/contentHeader';
import AlbumList from '@components/contentList/AlbumList/albumlist';
import { RESULTS_ACTIONS } from '@actions/resultsActions';

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

        const styles = {
            overflow: 'hidden',
            height: '100%',
            display: 'flex',
            flexFlow: 'column'
        }

        const buildContent = ( isSearching && <Spinner spinnerSize="cover" /> ) || 
                             ( 
                                (isFinished && type === RESULTS_ACTIONS.type.albums && 
                                    (   
                                        <div style={styles}>
                                            <ContentHeader content={ searchFor } type={ type }/>
                                            <AlbumList type="list" content={ results } />
                                        </div>
                                    ))
                             );

        return (
            <section className={ contentsStyle.container }>
                { buildContent }
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
