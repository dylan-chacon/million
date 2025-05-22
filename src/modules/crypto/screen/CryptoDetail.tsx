import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Crypto } from '../models/Crypto';

type RootStackParamList = {
  CryptoDetail: { coin: Crypto };
};

export default function CryptoDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'CryptoDetail'>>();
  const { coin } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{coin.name} ({coin.symbol})</Text>
      <Text style={styles.info}>Price: ${coin.price_usd}</Text>
      <Text style={styles.info}>Market Cap: ${coin.market_cap_usd}</Text>
      <Text style={styles.info}>24h Change: {coin.percent_change_24h}%</Text>
      <Text style={styles.info}>7d Change: {coin.percent_change_7d}%</Text>
      <Text style={styles.info}>Supply: {coin.csupply}</Text>
      <Text style={styles.info}>Rank: {coin.rank}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  info: { fontSize: 16, marginBottom: 8 },
});
