import { Text, View, ScrollView, TextInput, Button } from "react-native";
import { StyleSheet } from "react-native";
import { API_URL } from "@env";

import React from "react";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function CreateIngredient() {
   const [ingredient, setIngredient] = useState([]);
   const [newIngredientName, setNewIngredientName] = useState("");
   const navigation = useNavigation();

   const addIngredient = async () => {
      try {
         const response = await fetch(`${API_URL}admin/ingredients/`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ Nom: newIngredientName }),
         });
         const data = await response.json();
         if (response.ok) {
            setIngredient([...ingredient, data]);
            setNewIngredientName("");
            alert("Ingredient updated successfully");
            navigation.goBack();
         } else {
            console.error("Erreur lors de l'ajout de la ingrédient:", data);
         }
      } catch (error) {
         console.error("Erreur lors de l'envoi de la requête:", error);
      }
   };

   return (
      <View style={styles.content}>
         <TextInput style={styles.input} value={newIngredientName} onChangeText={setNewIngredientName} placeholder="Nom du nouvel ingrédient" />
         <Button title="Ajouter Ingrédient" onPress={addIngredient} />
      </View>
   );
}

const styles = StyleSheet.create({
   content: {
      display: "flex",
      minHeight: "100%",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 0 0 1px",
      borderWidth: 1,
   },

   input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
   },
});
