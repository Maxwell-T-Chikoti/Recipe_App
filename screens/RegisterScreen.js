// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Registration Successful');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Registration Error', error.message);
    }
  };

  return (
    
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
          Already have an account? Login here
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#70706f', // Light background
    padding: 20,
  },
  scrollContainer: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 25, // Rounded edges
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
    elevation: 5, // For Android shadow
  },
  button: {
    backgroundColor: '#bf9d4e',
    padding: 15,
    borderRadius: 25, // Rounded edges
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width:'50%',
    alignSelf: 'center', // Center the button horizontally

    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, // For Android shadow
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold', // Bold text for better visibility
  },
  link: {
    color: '#bf9d4e', // You can change this to any color you prefer
    marginTop: 10,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default RegisterScreen;
