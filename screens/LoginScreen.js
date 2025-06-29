import React, { useState } from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import { TextInput, Button, Card, useTheme } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Install AsyncStorage for secure storage

export default function LoginScreen({ navigation }) {
  const { colors } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Validation Error', 'Please enter both username and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('https://localhost:5071/api/Maintenance/login', {
        username,
        password,
      });

      if (response.status === 200 && response.data.success) {
        const { token } = response.data;

        // Store token securely in AsyncStorage
        await AsyncStorage.setItem('authToken', token);

        Alert.alert('Login Successful', `Welcome, ${response.data.username}!`, [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Dashboard'),
          },
        ]);
      } else {
        Alert.alert('Login Failed', response.data.message || 'Invalid credentials.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Login Error',
        'An error occurred during login. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={require('../assets/fv.png')} // Replace with your actual logo path
        style={styles.logo}
        resizeMode="contain"
      />
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
            mode="outlined"
            disabled={loading}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            mode="outlined"
            secureTextEntry
            disabled={loading}
          />
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            loading={loading}
            disabled={loading}
          >
            Login
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    padding: 10,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 50,
  },
});
