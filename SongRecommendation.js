import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Platform, Button } from 'react-native';
import userData from './assets/data.json';

export default function SongRecommendation() {
    const [userStatus, setUserStatus] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [songIdsInput, setSongIdsInput] = useState('');
    const [numRecommendations, setNumRecommendations] = useState(10);
    const [recommendations, setRecommendations] = useState([]);
    const [users, setUsers] = useState(userData.unique_users || []);
    const [manualUserId, setManualUserId] = useState('');
    const [inputMethod, setInputMethod] = useState('select');

    const handleAddUser = async () => {
        if (!newUserName || !songIdsInput) {
            alert('Please enter a username and provide at least one song ID.');
            return;
        }
        const songIds = songIdsInput.split(',').map(id => id.trim());  // Assuming IDs are separated by commas

        try {
            const response = await fetch('https://task3-applied-ai-2.onrender.com/add_user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: newUserName,
                    song_ids: songIds,
                }),
            });
            const data = await response.json();
            alert(data.error ? data.error : 'User added successfully');
        } catch (error) {
            alert(`Failed to add user: ${error.message}`);
        }
    };

    const handleGetRecommendations = async () => {
        const userId = inputMethod === 'select' ? selectedUser : manualUserId;
        if (!userId) {
            alert('Please select or enter a user ID.');
            return;
        }
        try {
            const url = `https://task3-applied-ai-2.onrender.com/recommendations?user_id=${encodeURIComponent(userId)}&n=10`;
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
            alert(`Failed to fetch recommendations: ${error.message}`);
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

                {userStatus === 'new' && (
                    <View style={styles.textInputWrapper}>
                        <Text style={styles.label}>Enter your username:</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={setNewUserName}
                            value={newUserName}
                            placeholder="Username"
                        />
                        <Text style={styles.label}>Enter Song IDs (comma separated):</Text>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={setSongIdsInput}
                            value={songIdsInput}
                            placeholder="e.g., SOLXVQY12A6D4F477A, SOAYCLH12A81C22D59"
                            multiline
                        />
                        <Button title="Register" onPress={handleAddUser} />
                        
                    </View>
                )}

{userStatus === 'existing' && (
                <>
                    <Text style={styles.label}>How would you like to enter the user ID?</Text>
                    <View style={styles.radioContainer}>
                        <label style={styles.radioLabel}>
                            <input type="radio" value="select" checked={inputMethod === 'select'} onChange={() => setInputMethod('select')} />
                            Select from list
                        </label>
                        <label style={styles.radioLabel}>
                            <input type="radio" value="manual" checked={inputMethod === 'manual'} onChange={() => setInputMethod('manual')} />
                            Enter manually
                        </label>
                    </View>
                    {inputMethod === 'select' ? (
                        <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)} style={styles.select}>
                            <option value="">Please select...</option>
                            {users.map(user => <option key={user} value={user}>{user}</option>)}
                        </select>
                    ) : (
                        <TextInput
                            style={styles.textInput}
                            value={manualUserId}
                            onChangeText={setManualUserId}
                            placeholder="Enter User ID"
                        />
                    )}
                            <Button title="Get Recommendations" onPress={handleGetRecommendations} />
                        
                        <View style={styles.resultsContainer}>
                            {recommendations.map((item, index) => (
                                <Text key={index} style={styles.resultItem}>
                                    {item.artist} - {item.title}
                                </Text>
                            ))}
                        </View>
                    </>
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
