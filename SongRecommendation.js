import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Platform } from 'react-native';
import { Button } from 'react-native-web';

export default function SongRecommendation() {
  const [userStatus, setUserStatus] = useState('');  // 'new' for new user, 'existing' for existing user
  const [selectedUser, setSelectedUser] = useState('');
  const [newUserName, setNewUserName] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Are you a new or existing user?</Text>
        <View style={styles.radioContainer}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              value="existing"
              checked={userStatus === 'existing'}
              onChange={() => setUserStatus('existing')}
            />
            Existing
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              value="new"
              checked={userStatus === 'new'}
              onChange={() => setUserStatus('new')}
            />
            New
          </label>
        </View>

        {userStatus === 'existing' && (
          <View style={styles.selectWrapper}>
            <Text style={styles.label}>Select User:</Text>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              style={styles.select}
            >
              <option value="">Please select...</option>
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
              <option value="user3">User 3</option>
            </select>
            <Button title="Get Recommendations" onPress={() => alert('Recommendations fetched!')} />
          </View>
        )}

        {userStatus === 'new' && (
          <View style={styles.textInputWrapper}>
            <Text style={styles.label}>Enter your username:</Text>
            <TextInput
              value={newUserName}
              onChangeText={setNewUserName}
              style={styles.textInput}
              placeholder="Username"
            />
            <View style={styles.selectWrapper}>
            <Text style={styles.label}>Select a song you want to add to your playlist:</Text>
            <select
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
              style={styles.select}
            >
              <option value="">Song</option>
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
              <option value="user3">User 3</option>
            </select>
          </View>
          <Text style={styles.label}>Enter how many times you listened to this song:</Text>
            <TextInput
              value={newUserName}
              onChangeText={setNewUserName}
              style={styles.textInput}
              placeholder="Number of listens"
            />
            <Button title="Add Song" onPress={() => alert('Song added!')} />
          </View>
        )}
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
    height: '100%',
    padding: 20,
    height: Platform.OS === 'web' ? '100%' : '100%',
    backgroundImage: Platform.OS === 'web' ? 'linear-gradient(to right top, #26cebd, #0dd9a8, #41e288, #74e85c, #a8eb12)' : undefined,
  },
  inputContainer: {
    width: '80%',
    maxWidth: 300,
    padding: 10,
    justifyContent: 'left',
    alignItems: 'left',

    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#9effd8',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004d1f',
  },
  radioContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    color: '#004d1f',
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: 'normal',
    color: '#333',
  },
  selectWrapper: {
    marginBottom: 20,
  },
  select: {
    width: '100%',
    padding: 8,
    backgroundColor: '#deffeb',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  textInputWrapper: {
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    padding: 10,
    backgroundColor: '#deffeb',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
});
