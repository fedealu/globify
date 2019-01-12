import React from 'react';
import { createStore } from 'redux';
import ReactDOM from 'react-dom';

import App from '@containers/App';
import Auth from '@hocs/Auth.hoc';

ReactDOM.render(
    <Auth>
        <App />
    </Auth>,
    document.getElementById('root')
)
