import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import { auth } from '../firebase'; // Assuming you have Firebase Authentication set up

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    const recipeSnapshot = await getDocs(collection(db, 'recipes'));
    const recipeList = recipeSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRecipes(recipeList);
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  // Function to sign out
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login'); 
      })
      .catch((error) => {
        console.log('Error signing out:', error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
   
      <TouchableOpacity 
        style={styles.signOutButton} 
        onPress={handleSignOut}
      >
        <Icon name="log-out" size={40} color="#bf9d4e" />
      </TouchableOpacity>

      
      <FlatList
        contentContainerStyle={styles.flatListContent} 
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => navigation.navigate('RecipeDetails', { recipeId: item.id })} 
            style={styles.recipeCard}
          >
            {item.imageUrl && (
              <Image 
                source={{ uri: item.imageUrl }} 
                style={styles.recipeImage} 
              />
            )}
            <Text style={styles.recipeTitle}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />

    
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('AddRecipe')}
      >
        <Icon name="add-circle" size={60} color="#bf9d4e" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  recipeCard: {
    backgroundColor: 'white',
    borderRadius: 25, 
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    position: 'absolute', 
    bottom: 90, 
    right: 30, 
    backgroundColor: 'transparent',
    borderRadius: 30,
  },
  signOutButton: {
    position: 'absolute', 
    top: 40, 
    left: 20, 
    backgroundColor: 'transparent',
    borderRadius: 30,
  },
  flatListContent: {
    paddingTop: 50, 
  },
});

export default HomeScreen;
