import React from 'react';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import combineReducers from '@store';

// Components
import App from '@containers/App';
import Auth from '@hocs/Auth.hoc';
import Spinner from '@components/spinner/spinner';

// General Styles
import styles from '@styles/styles.scss';

const store = createStore(
    combineReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={ store }>
        <Auth>
            <App />
        </Auth>
    </Provider>,
    document.getElementById('root')
)
