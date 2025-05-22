import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Crypto } from '../../../modules/crypto/models/Crypto';

type RootStackParamList = {
  CryptoDetail: { coin: Crypto };
};

interface Props {
  coin: Crypto;
}

const CryptoCard = React.memo(({ coin }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable onPress={() => navigation.navigate('CryptoDetail', { coin })}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {coin.name} ({coin.symbol})
        </Text>
        <Text>Price: ${coin.price_usd}</Text>
        <Text>Market Cap: ${coin.market_cap_usd}</Text>
        <Text>24h Change: {coin.percent_change_24h}%</Text>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CryptoCard;
