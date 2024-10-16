import React, { useState } from 'react';
import { View, TextInput, Alert, Image, StyleSheet, TouchableOpacity, Text, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { collection, addDoc } from 'firebase/firestore';
import { db, storage } from '../firebase';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const AddRecipeScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [time, setTime] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleAddRecipe = async () => {
    if (!title.trim() || !ingredients.trim() || !steps.trim() || !time || !imageUri) {
      Alert.alert('Please fill out all fields and pick an image.');
      return;
    }

    try {
      setLoading(true); // Start loading

      const imageResponse = await fetch(imageUri);
      const imageBlob = await imageResponse.blob();
      const imageRef = ref(storage, `recipes/${Date.now()}`);

      await uploadBytes(imageRef, imageBlob);
      const imageUrl = await getDownloadURL(imageRef);

      await addDoc(collection(db, 'recipes'), {
        title,
        ingredients,
        steps,
        time,
        imageUrl,
      });

      Alert.alert('Recipe added successfully');
      navigation.navigate('Home'); 
    } catch (error) {
      Alert.alert('Error adding recipe', error.message);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextInput
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />
        <TextInput
          placeholder="Ingredients"
          value={ingredients}
          onChangeText={setIngredients}
          style={styles.input}
          multiline // Enable multiline input
          numberOfLines={4} // Set number of visible lines
        />
        <TextInput
          placeholder="Preparation Steps"
          value={steps}
          onChangeText={setSteps}
          style={styles.input}
          multiline // Enable multiline input for steps as well
        />
        <TextInput
          placeholder="Cooking Time (minutes)"
          value={time}
          onChangeText={setTime}
          keyboardType="numeric"
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick an Image</Text>
        </TouchableOpacity>

        {imageUri && (
          <Image
            source={{ uri: imageUri }}
            style={styles.image}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={handleAddRecipe}>
          <Text style={styles.buttonText}>Add Recipe</Text>
        </TouchableOpacity>

        {loading && ( // Display loading indicator when loading is true
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#bf9d4e" />
            <Text style={styles.loadingText}>Adding recipe...</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
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
    width: '65%',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginVertical: 15,
  },
  loadingContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default AddRecipeScreen;
