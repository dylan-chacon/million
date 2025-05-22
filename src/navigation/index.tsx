import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CryptoListScreen from '../modules/crypto/screen/CryptoList';
import CryptoDetailScreen from '../modules/crypto/screen/CryptoDetail';
import { Crypto } from '../modules/crypto/models/Crypto';

export type RootStackParamList = {
  CryptoList: undefined;
  CryptoDetail: { coin: Crypto };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CryptoList">
        <Stack.Screen name="CryptoList" component={CryptoListScreen} options={{ title: 'Cryptos' }} />
        <Stack.Screen name="CryptoDetail" component={CryptoDetailScreen} options={{ title: 'Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
