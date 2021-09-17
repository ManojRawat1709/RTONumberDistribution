import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import RTONumberPlate from './components/RTONumberPlate'
import NumberPlateRegistration from './components/NumberPlateRegistration'

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={RTONumberPlate} />
            <Route path='/NumberPlateRegistration' component={NumberPlateRegistration} />
      </Layout>
    );
  }
}
