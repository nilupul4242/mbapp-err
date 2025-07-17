import React, { useState } from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import { TextInput, Button, Card, useTheme } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-root-toast';
import BASE_URL from '../utils/apiConfig';

export default function LoginScreen({ navigation }) {
  const { colors } = useTheme();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Toast.show('Please enter both username and password.', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/Maintenance/login`, {
        username,
        password,
      });

      if (response.status === 200 && response.data.success) {
        const { token, hotelId } = response.data;

        // Store session info
        await AsyncStorage.setItem('authToken', token);
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('hotelid', hotelId);

        Toast.show('Login Successful!', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
        });

        navigation.navigate('Dashboard');
      } else {
        Alert.alert('Login Failed', response.data.message || 'Invalid credentials.');
      }
    } catch (error) {
      console.error('Login Error:', error);
      Alert.alert('Login Error', 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={require('../assets/fv.png')}
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
