import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';

const createContainerElement = () => {
    const widgetId = 'opinio-widget';
    let containerElement = document.getElementById(widgetId);
    if (!containerElement) {
        console.log('container element was not found');
        containerElement = document.createElement('div');
        document.body.appendChild(containerElement);
    }

    return containerElement;
};

ReactDOM.render(
    <App />, createContainerElement()
);