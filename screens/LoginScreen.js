import React, { useContext, useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { TextInput, Button, Card, useTheme, Text } from 'react-native-paper';
import { AuthContext } from '../contexts/AuthContext';

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const { colors } = useTheme(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login({ username, password });
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
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            mode="outlined"
            secureTextEntry
          />
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
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
