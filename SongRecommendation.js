import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Platform, TouchableOpacity, ScrollView } from 'react-native';
import userData from './assets/data.json';

export default function SongRecommendation() {
    // State variables
    const [userStatus, setUserStatus] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [newUserName, setNewUserName] = useState('');
    const [songIdsInput, setSongIdsInput] = useState('');
    const [numRecommendations, setNumRecommendations] = useState(10);
    const [recommendations, setRecommendations] = useState([]);
    const [users, setUsers] = useState(userData.unique_users || []);
    const [manualUserId, setManualUserId] = useState('');
    const [inputMethod, setInputMethod] = useState('select');

    // Function to handle adding a new user from the flask API backend
    // including some error handling
    const handleAddUser = async () => {
        if (!newUserName || !songIdsInput) {
            alert('Please enter a username and provide at least one song ID.');
            return;
        }
        const songIds = songIdsInput.split(',').map(id => id.trim());

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

    // Function to handle fetching song recommendations from the flask API backend
    // including some error handling
    const handleGetRecommendations = async () => {
        const userId = inputMethod === 'select' ? selectedUser : manualUserId;
        if (!userId) {
            alert('Please select or enter a user ID.');
            return;
        }
        try {
            const url = `https://task3-applied-ai-2.onrender.com/recommendations?user_id=${encodeURIComponent(userId)}&n=${numRecommendations}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.error) {
                alert(data.error);
            } else {
                setRecommendations(data);
                console.log('Recommendations fetched successfully');
                console.log(data);
            }
        } catch (error) {
            alert(`Failed to fetch recommendations: ${error.message}`);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Song Recommendation System</Text>
                <Text style={styles.subtitle}>Group Alpha</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Are you a new or existing user?</Text>
                    <View style={styles.radioContainer}>
                        {/* Radio buttons for selecting user status */}
                        <label style={styles.radioLabel}>
                            <input type="radio" value="existing" checked={userStatus === 'existing'} onChange={() => setUserStatus('existing')} />
                            Existing
                        </label>
                        <label style={styles.radioLabel}>
                            <input type="radio" value="new" checked={userStatus === 'new'} onChange={() => setUserStatus('new')} />
                            New
                        </label>
                    </View>

                    {/* Form for new users */}
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
                            <TouchableOpacity style={styles.button} onPress={handleAddUser}>
                                <Text style={styles.buttonText}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Form for existing users */}
                    {userStatus === 'existing' && (
                        <>
                            <Text style={styles.label}>How would you like to enter the user ID?</Text>
                            <View style={styles.radioContainer}>
                                {/* Radio buttons for selecting input method */}
                                <label style={styles.radioLabel}>
                                    <input type="radio" value="select" checked={inputMethod === 'select'} onChange={() => setInputMethod('select')} />
                                    Select from list
                                </label>
                                <label style={styles.radioLabel}>
                                    <input type="radio" value="manual" checked={inputMethod === 'manual'} onChange={() => setInputMethod('manual')} />
                                    Enter manually
                                </label>
                            </View>
                            {/* Dropdown for selecting user from list */}
                            {inputMethod === 'select' ? (
                                <select value={selectedUser} onChange={e => setSelectedUser(e.target.value)} style={styles.select}>
                                    <option value="">Please select...</option>
                                    {users.map(user => <option key={user} value={user}>{user}</option>)}
                                </select>
                            ) : (
                                // Text input for manual user ID entry
                                <TextInput
                                    style={styles.textInput}
                                    value={manualUserId}
                                    onChangeText={setManualUserId}
                                    placeholder="Enter User ID"
                                />
                            )}
                            <Text style={styles.label}>Number of Recommendations:</Text>
                            {/* Dropdown for selecting number of recommendations */}
                            <select value={numRecommendations} onChange={(e) => setNumRecommendations(e.target.value)} style={styles.select}>
                                {[...Array(10).keys()].map(num => (
                                    <option key={num + 1} value={num + 1}>{num + 1}</option>
                                ))}
                            </select>
                            {/* Button to get recommendations from backend*/}
                            <TouchableOpacity style={styles.button} onPress={handleGetRecommendations}>
                                <Text style={styles.buttonText}>Get Recommendations</Text>
                            </TouchableOpacity>
                            <View style={styles.resultsContainer}>
                                {/* Displaying recommendations */}
                                {recommendations.map((item, index) => (
                                    // Displaying each recommendation's artist, song, and score
                                    <View key={index} style={styles.resultItem}>
                                        <Text>Artist: {item.artist}</Text>
                                        <Text>Song: {item.title}</Text>
                                        <Text>Score: {item.score.toFixed(3)}</Text>
                                        <Text>==========================</Text>
                                    </View>
                                ))}
                            </View>
                        </>
                    )}
                </View>
            </View>
        </ScrollView>
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
    title: {
        fontSize: Platform.OS === 'web' ? 34 : 24,
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
    button: {
        backgroundColor: '#26cebd',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
