import React, { Component } from 'react';
import axios from 'axios';

class AppComponent extends Component {
  componentDidMount() {
    axios.get('/colors').then(res => console.log(res.data));
  }

  render() {
    return <div>Hello World</div>;
  }
}

export default AppComponent;
