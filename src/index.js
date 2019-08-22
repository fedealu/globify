import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import store from '@store';

// Components
import App from '@containers/App';
import AuthContainer from '@containers/authContainer/authContainer';
import Spinner from '@components/spinner/spinner';

// General Styles
import styles from '@styles/styles.scss';

document.addEventListener('click', (e) => {
    if (e.target.nodeName === 'A' && e.target.classList.contains('inner-link')) {
        e.preventDefault();
    }
})

document.querySelector('#root').classList.add(styles.root);

ReactDOM.render(
    <Provider store={ store }>
        <AuthContainer>
            <App />
        </AuthContainer>
    </Provider>,
    document.querySelector('#root')
)
