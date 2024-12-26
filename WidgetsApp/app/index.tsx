import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import AuthorSelectionScreen from './screens/AuthorSelectionScreen';
import PoetSelectionScreen from './screens/PoetSelectionScreen';
import VerseDetailsScreen from './screens/VerseDetailsScreen';

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Stack = createStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
    });
    
    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (

            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Author Selection" component={AuthorSelectionScreen} />
                <Stack.Screen name="Poet Selection" component={PoetSelectionScreen} />
                <Stack.Screen name="Verse Details" component={VerseDetailsScreen} />
            </Stack.Navigator>

    );
}