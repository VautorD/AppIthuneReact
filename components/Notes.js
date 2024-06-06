import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//On initialise la variable rating à 0 et servira à stocker la note. setRating sera utilisé pour mettre à jour la note
const Notes = ({ onRate }) => {
  const [rating, setRating] = useState(0);

  //On appelle la fonction onRate pour lui donner la nouvelle note
  const handleRate = (newRating) => {
    setRating(newRating);
    onRate(newRating);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notez cette musique:</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((value) => (
          <Ionicons
            key={value}
            name={value <= rating ? 'star' : 'star-outline'}
            size={32}
            color={value <= rating ? 'gold' : 'gray'}
            onPress={() => handleRate(value)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
  },
  stars: {
    flexDirection: 'row',
  },
});

export default Notes;
