import React from 'react';
import {Input, Spin} from 'antd';
import api from '../api';

const {TextArea} = Input;

export default class Thread extends React.Component {
    componentDidMount() {
        return api.thread.getById(this.props.threadId)
            .then(thread => this.setState({thread}));
    }

    render() {
        return (
            <div>
                <Spin spinning>
                    <TextArea rows={4} />
                    {/* {comments} */}
                </Spin>
            </div>
        );
    }
}
