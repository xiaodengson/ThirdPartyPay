/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Navigation from './src/Navigation';
import { Provider } from 'react-redux'
import Store from './src/store'
import FetchUtil from "./src/util/FetchUtil";
const store = Store()

type Props = {};
export default class App extends Component<Props> {

    componentWillMount() {
        FetchUtil.initHeaders(store)
    }
  render() {
    return (
        <Provider store ={store}>
          <Navigation/>
        </Provider>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
