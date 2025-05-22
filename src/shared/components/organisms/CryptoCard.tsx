import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Crypto } from '../../../modules/crypto/models/Crypto';

interface Props {
  coin: Crypto;
}

const CryptoCard = React.memo(({ coin }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {coin.name} ({coin.symbol})
      </Text>
      <Text>Price: ${coin.price_usd}</Text>
      <Text>Market Cap: ${coin.market_cap_usd}</Text>
      <Text>24h Change: {coin.percent_change_24h}%</Text>
    </View>
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
