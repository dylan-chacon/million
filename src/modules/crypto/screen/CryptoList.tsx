import React, { useCallback } from 'react';
import { View, TextInput, FlatList, ActivityIndicator, Text, StyleSheet } from 'react-native';
import CryptoCard from '../../../shared/components/organisms/CryptoCard';
import { useFetchCryptos } from '../hooks/useGetCrypto';
import { useCryptoStore } from '../store/useCryptoStore';

export default function CryptoListScreen() {
  const { isLoading, error, hasNextPage, fetchNextPage } = useFetchCryptos();

  const { filtered, search, setSearch } = useCryptoStore();

  const loadMore = useCallback(() => {
    if (hasNextPage) {fetchNextPage();}
  }, [hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }
  if (error) {
    return <Text style={styles.errorText}>Error al cargar datos</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search coin..."
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CryptoCard coin={item} />}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        initialNumToRender={20}
        maxToRenderPerBatch={20}
        windowSize={10}
        removeClippedSubviews
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  loader: {
    flex: 1,
  },
  errorText: {
    flex: 1,
    textAlign: 'center',
  },
});
