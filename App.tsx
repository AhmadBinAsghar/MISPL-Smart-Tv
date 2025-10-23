import { StatusBar} from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'
import { store } from './src/redux/store'
import { Provider } from 'react-redux'
import AppStack from './src/navigations/AppStack'
import { NavigationContainer } from '@react-navigation/native'
import { init } from '@noriginmedia/norigin-spatial-navigation';
import SystemNavigationBar from 'react-native-system-navigation-bar'
import KeepAwake from '@sayem314/react-native-keep-awake'

init({
  debug: true, // Enable debug logs in console
  visualDebug: true, // Set to true to see focus outlines
  distanceCalculationMethod: 'center',
});

SystemNavigationBar.stickyImmersive();
const App = () => {
  let persistor = persistStore(store);
  return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <SafeAreaProvider style={{ flex: 1 }}>
              <StatusBar
              hidden
              />
              <KeepAwake />
              <NavigationContainer>
              <AppStack />
              </NavigationContainer>
            </SafeAreaProvider>
        </PersistGate>
      </Provider>
  )
}

export default App