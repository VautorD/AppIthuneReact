
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favoris = () => {
  const [favoris, setFavoris] = useState([]);

  //On recupère le favoris à partir du stockage local grace à AsyncStorage puis on les converties en objetJS grace à JSON.parse
  useEffect(() => {
    const fetchFavoris = async () => {
      try {
        const storedFavoris = await AsyncStorage.getItem('favoris');
        if (storedFavoris) {
          setFavoris(JSON.parse(storedFavoris));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavoris();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoris</Text>
      <FlatList
        data={favoris}
        keyExtractor={(item) => item.trackId.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.trackName}>{item.trackName}</Text>
            <Text style={styles.artistName}>{item.artistName}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    marginBottom: 16,
  },
  trackName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  artistName: {
    fontSize: 16,
  },
});

export default Favoris;
