import React from 'react';
import { YellowBox, SafeAreaView, Platform } from 'react-native';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

import Routes from './src/routes';

export default function App() {
  return (
    <SafeAreaView style={{ minHeight: '100%' }} >
      <Routes />
    </SafeAreaView>
  );
}

