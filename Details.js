import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notes from './components/Notes';

const Details = ({ route, navigation }) => {
  const { item } = route.params;

  //On ajoute aux favoris en utilisant AsyncStorage
  //On recupère la liste des fav pour y ajouter le morceau et en suitre on met à jour la liste
  const addToFavoris = async () => {
    try {
      const favoris = JSON.parse(await AsyncStorage.getItem('favoris')) || [];
      favoris.push(item);
      await AsyncStorage.setItem('favoris', JSON.stringify(favoris));
      alert('Ajout effectué');
    } catch (error) {
      console.error(error);
      alert('Failed to add to favoris');
    }
  };

  //Meme principe que la fonction d avant sauf que cette fois ci c est pour enregistrer la note
  const handleRate = async (note) => {
    try {
      const notes = JSON.parse(await AsyncStorage.getItem('notes')) || {};
      notes[item.trackId] = note;
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
      alert('Votre note a bien été sauvegardé !');
    } catch (error) {
      console.error(error);
      alert('Failed to save rating');
    }
  };

  // Fonction pour convertir la durée du morceau qui etait en millisecondes en minutes
    const millisToMinutesAndSeconds = (millis) => {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
    };

  return (
    <View style={styles.container}>
         <Image
        source={{ uri: item.artworkUrl100 }}
        style={styles.artwork}
      />
      <Text style={styles.artistName}>{item.artistName}</Text>
      <Text style={styles.trackName}>Artiste: {item.trackName}</Text>
      <Text style={styles.genre}>Genre: {item.primaryGenreName}</Text>
      <Text style={styles.duration}>Durée: {millisToMinutesAndSeconds(item.trackTimeMillis)}</Text>
      <Button title="Ajouter aux favoris" onPress={addToFavoris} />
      <Notes onRate={handleRate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  trackName: {
    fontSize: 18,
    marginBottom: 8,
  },
  artistName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  genre: {
    fontSize: 16,
    marginBottom: 8,
  },
  duration: {
    fontSize: 16,
    marginBottom: 16,
  },
  artwork: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 16,
  },
});

export default Details;
