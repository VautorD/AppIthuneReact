import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';
import Recherche from './Recherche';
import Details from './Details';
import Favoris from './Favoris';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Recherche">
        <Stack.Screen 
          name="Recherche" 
          component={Recherche} 
          options={({ navigation }) => ({ 
            title: 'Search Tracks',
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('Favoris')}
                title="Voir vos favoris"
              />
            ),
          })}
        />
        <Stack.Screen 
          name="Detail" 
          component={Details} 
          options={({ route }) => ({ title: route.params.item.trackName })}
        />
        <Stack.Screen 
          name="Favoris" 
          component={Favoris} 
          options={{ title: 'Favorites' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
