import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Alert, ScrollView, SafeAreaView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpeg')} // got this image from pinterest https://www.pinterest.com/pin/644014815450794894/
      style={styles.background}
      imageStyle={styles.backgroundImage} 
    >
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image
            source={require('../assets/logo.png')} // generated this logo on https://looka.com as a logo this is a tool that generates logos 
            style={styles.logo}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text onPress={() => navigation.navigate('Register')} style={styles.link}>
            Don't have an account? Register here
          </Text>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    resizeMode: 'stretch',
   
  },
  container: { flex: 1 },
  scrollContainer: { padding: 20, justifyContent: 'center', flexGrow: 1 },
  logo: {
    width: '100%',
    height: 250, 
    resizeMode: 'contain',
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 25, 
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, 
  },
  button: {
    backgroundColor: '#bf9d4e',
    padding: 15,
    borderRadius: 25, 
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, 
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold', 
  },
  link: {
    color: '#bf9d4e',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default LoginScreen;
