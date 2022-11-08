import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.scss'

// This is for React 18, which introduces a new root API
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
