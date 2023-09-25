import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { YourNavigationParamList } from './pages/Game'
import Game from './pages/Game';
import { History } from './pages/History';

const Stack = createStackNavigator();

type StackNavigation = {
   Game: undefined
  History: undefined
}

export type StackTypes = StackNavigationProp<StackNavigation>


export default function App() {

  const Stack = createStackNavigator()

  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Game" component={Game} />
        <Stack.Screen name="History" component={History} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
