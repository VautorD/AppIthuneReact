import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { searchiTunes } from './api';

const Recherche = ({ navigation }) => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  //On s assure que la recherche n est pas vide 
  const handleSearch = async () => {
    if (!term.trim()) {
      Alert.alert('Error', 'Please enter a search term');
      return;
    }

    //puis on effectue les recherches par artiste et par musique
    setLoading(true);
    try {
      const artistResults = await searchiTunes(term, 'musicArtist');
      const trackResults = await searchiTunes(term, 'musicTrack');
      setResults([...artistResults, ...trackResults]);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch results. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Rechercher un artiste ou une musique"
        value={term}
        onChangeText={setTerm}
      />
      <Button title="Rechercher" onPress={handleSearch} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
        data={results.filter(item => item.trackName)}
        keyExtractor={(item) => {
            
          return item.trackId ? item.trackId.toString() : `${item.collectionId}-${item.artistId}`;
        }}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Detail', { item })}>
            <Text style={styles.resultText}>
              {item.trackName} - {item.artistName ? item.artistName : 'Unknown Artist'}
            </Text>
          </TouchableOpacity>
        )}
      />
      
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 10,
  },
  resultText: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Recherche;
