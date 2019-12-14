import React from 'react';
import { YellowBox, SafeAreaView, StatusBar } from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

import Routes from './src/routes';

export default function App() {
  return (
    <>
      <StatusBar barStyle={"dark-content"} backgroundColor="#fff" />
      <SafeAreaView style={{ minHeight: '100%' }} >
        <Routes />
      </SafeAreaView>
    </>
  );
}

