import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import Store from './state/store';
import './tailwind.output.css';
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
    <Router>
      <Provider store={Store}>
        <App />
      </Provider>
    </Router>,
    document.getElementById('root')
)