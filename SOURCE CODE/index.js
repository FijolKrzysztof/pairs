import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
  <React.StrictMode>
    <div id="load">
      <div id="floater"></div>
      <div id="spinner" className="spinner-grow" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <p id="loading">Loading...</p>
    </div>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
