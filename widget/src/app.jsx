import React from 'react';
import Thread from './components/thread.jsx';
import api from './api';

export default class App extends React.Component {
    constructor(props) {
        super(props);

        api.init({
            apiServerUrl: 'sddfssdf',
            apiKey: 'afsasf',
        });

        window.opinio = {
            threadId: '123',
        };
    }

    render() {
        if (!window.opinio || !window.opinio.threadId) {
            throw new Error('Unable to determine current thread id. Please make sure you\'ve specified correct id for each page');
        }

        return (
            <Thread theadId={window.opinio.thresdadId} />
        );
    }
}
