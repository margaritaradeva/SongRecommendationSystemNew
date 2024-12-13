import React from 'react';
import { StyleSheet, Platform, Text, View, ScrollView } from 'react-native';
import LottieView from 'lottie-react-native';

export default function Home() {
  return (
    
      <View style={styles.container}>
        <View style={styles.sound}>
          <LottieView
            source={require('./assets/lottie/sound.json')} 
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
        <Text style={styles.title}>Song Recommendation System</Text>
        <Text style={styles.subtitle}>Group Alpha</Text>
        <Text style={styles.description}>
          Welcome to our Song Recommendation Engine. To get started please select "Recommend" tab on the menu below.
          When you go to the Recommendation page you can get song recommendations for a given userID, which you can either select from a 
          dropdown menu or enter manually. Additionally, you can select how many recommendations to be displayed. To get the recommendations, press the "Get Recommendations" button. If you wish to add a new user,
          select "New" and enter a new username and song IDs. Press the "Register" button to add this new user. To get the recommmendations for that
          user go back to "existing", and select "Enter manually". Then, type out the username you created and press "Get Recommendations".
        </Text>
        <View style={styles.lottieContainer}>
          <LottieView
            source={require('./assets/lottie/littleMan.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        </View>
      </View>
  
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: Platform.OS === 'web' ? '100%' : '100%',
    backgroundImage: Platform.OS === 'web' ? 'linear-gradient(to right top, #26cebd, #0dd9a8, #41e288, #74e85c, #a8eb12)' : undefined,
    padding: 20,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 54 : 24,
    fontWeight: 'bold',
    marginBottom: 8,
    marginTop: 20,
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
    width: 150, 
    height: 150, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: '25%',
  },
  lottie: {
    width: 150, 
    height: 150, 
  },
  sound: {
    marginTop: '25%',
    width: 120,
    height: 120,
  },
});
