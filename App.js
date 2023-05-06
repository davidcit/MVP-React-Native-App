// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import Search from './components/Search';
// import Navigation from './Navigation/Navigation';

// export default function App() {
//   return (
    
//     <View style={styles.container}>
//       {<Search />     }
//       {<StatusBar style="auto" />}
//       {/* <Navigation /> */}
//     </View>
//   );
// }
// In App.js in a new project

import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Search from './components/Search';
import FilmDetail from './components/FilmDetail';

function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Search navigation={navigation}/>
      <StatusBar style="auto" />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'TMDB Movie' }}/>
        <Stack.Screen style={styles.detailScreen}name="FilmDetail" component={FilmDetail}  options={{ title: 'Détail du film' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2A65A',
    flex: 1,
  },
  paragraph: {
    color: '#fff'
  },
  detailScreen: {
    backgroundColor: '#000',
    color: '#fff'
  }
});
