import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const RecipeDetailsScreen = ({ route }) => {
  const { recipeId } = route.params;
  const [recipe, setRecipe] = useState(null);

  const fetchRecipeDetails = async () => {
    const recipeDoc = await getDoc(doc(db, 'recipes', recipeId));
    setRecipe(recipeDoc.data());
  };

  useEffect(() => {
    fetchRecipeDetails();
  }, []);

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{recipe.title}</Text>
        </View>
        <Image source={{ uri: recipe.imageUrl }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Ingredients:</Text>
          <Text style={styles.detailsText}>{recipe.ingredients}</Text>
          <Text style={styles.sectionTitle}>Steps:</Text>
          <Text style={styles.detailsText}>{recipe.steps}</Text>
          <Text style={styles.sectionTitle}>Cooking Time:</Text>
          <Text style={styles.detailsText}>{recipe.time} minutes</Text>
        </View>
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
  titleContainer: {
    backgroundColor: '#bf9d4e', 
    borderRadius: 25, 
    width: '65%', 
    alignSelf: 'center', 
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', 
    textAlign: 'center',
  },
  image: {
    width: '60%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    alignSelf: 'center', 

    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, 
  },
  detailsContainer: {
    backgroundColor: 'white',
    borderRadius: 25, 
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  detailsText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default RecipeDetailsScreen;
