import React, { Component } from 'react';
import request from '../utils/request';

class AppComponent extends Component {
  componentDidMount() {
    request('/colors').then(res => console.log(res.data));
  }

  render() {
    return <div>Hello World</div>;
  }
}

export default AppComponent;
