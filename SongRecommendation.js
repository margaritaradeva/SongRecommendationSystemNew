import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Platform } from 'react-native';
import { Button } from 'react-native-web';
import userData from './assets/data.json'; // ensure this path is correct

export default function SongRecommendation() {
    const [userStatus, setUserStatus] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [songId, setSongId] = useState('');
    const [playCount, setPlayCount] = useState('');
    const [numRecommendations, setNumRecommendations] = useState(10);
    const [recommendations, setRecommendations] = useState([]);
    const [users, setUsers] = useState(userData.unique_users || []);

    const handleAddUser = async () => {
        try {
          const response = await fetch('https://task3-applied-ai-2.onrender.com/add_user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: newUserName,
              song_ids: [songId], // Assuming songId is managed similarly to newUserName
            }),
          });
          const data = await response.json();
          if (data.error) {
            alert(data.error);
          } else {
            alert('User added successfully');
          }
        } catch (error) {
          alert('Failed to add user: ' + error.message);
        }
      };

      const handleGetRecommendations = async () => {
        if (!selectedUser) {
            alert('Please select a user first.');
            return; // Early return if no user is selected
        }
        try {
            const url = `https://task3-applied-ai-2.onrender.com/recommendations?user_id=${encodeURIComponent(selectedUser)}&n=${numRecommendations}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.error) {
                alert(data.error);
            } else {
                setRecommendations(data); // Store the fetched data in state
                console.log('Recommendations fetched successfully');
                console.log(data);
            }
        } catch (error) {
            alert('Failed to fetch recommendations: ' + error.message);
            console.error('Fetch error:', error);
        }
    };
      
      return (
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Are you a new or existing user?</Text>
            <View style={styles.radioContainer}>
              <label style={styles.radioLabel}>
                <input type="radio" value="existing" checked={userStatus === 'existing'} onChange={() => setUserStatus('existing')} />
                Existing
              </label>
              <label style={styles.radioLabel}>
                <input type="radio" value="new" checked={userStatus === 'new'} onChange={() => setUserStatus('new')} />
                New
              </label>
            </View>
      
            {userStatus === 'existing' && (
              <>
                <View style={styles.selectWrapper}>
                  <Text style={styles.label}>Select User:</Text>
                  <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} style={styles.select}>
                                <option value="">Please select...</option>
                                {users.map((user) => (
                                    <option key={user} value={user}>{user}</option>
                                ))}
                            </select>
                  <Text style={styles.label}>Number of Recommendations:</Text>
                  <select value={numRecommendations} onChange={(e) => setNumRecommendations(e.target.value)} style={styles.select}>
                    {[...Array(10).keys()].map(num => (
                      <option key={num + 1} value={num + 1}>{num + 1}</option>
                    ))}
                  </select>
                  <Button title="Get Recommendations" onPress={handleGetRecommendations} />
                </View>
                <View style={styles.resultsContainer}>
                  {recommendations.map((item, index) => (
                    <Text key={index} style={styles.resultItem}>
                      {item.artist} - {item.title}
                    </Text>
                  ))}
                </View>
              </>
            )}
      
            {userStatus === 'new' && (
              <View style={styles.textInputWrapper}>
                <Text style={styles.label}>Enter your username:</Text>
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
  resultsContainer: {
    marginTop: 20,
  },
  resultItem: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
});
