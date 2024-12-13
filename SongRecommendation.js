import React from 'react';
import { StyleSheet, Platform, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function SongRecommendation() {
  return (
    <View style={styles.container}>
      <View style={styles.sound}>
        <LottieView
          source={require('./assets/lottie/sound.json')} // Ensure the path is correct
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
      <Text style={styles.title}>Song Recommendation System</Text>
      <Text style={styles.subtitle}>Group Alpha</Text>
      <Text style={styles.description}>
        Welcome to our Song Recommendation Engine. This tool recommends songs based on your
        listening preferences, helping you discover music that resonates with your taste.
      </Text>
      <View style={styles.lottieContainer}>
        <LottieView
          source={require('./assets/lottie/littleMan.json')} // Ensure the path is correct
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: Platform.OS === 'web' ? '100%' : '100%',
    backgroundImage: Platform.OS === 'web' ? 'linear-gradient(to right top, pink, #74e85c, #a8eb12)' : undefined,
    padding: 20,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 54 : 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 28,
    fontStyle: 'italic',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
    width: '100%',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 24,
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    width: '100%',
  },
  lottieContainer: {
    width: 600, // Set width of the container
    height: 600, // Set height of the container
    justifyContent: 'center', // Center the LottieView vertically
    alignItems: 'center', // Center the LottieView horizontally
  },
  lottie: {
    width: 150, // Set the width of the LottieView
    height: 150, // Set the height of the LottieView
  },
  sound: {
    width: 150,
    height: 150,
  },
});
