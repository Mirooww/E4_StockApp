import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Button, StyleSheet } from "react-native";
import { API_URL } from "@env";
import { useNavigation } from "@react-navigation/native";

export default function EditIngredient({ route }) {
   const { id } = route.params;
   const [ingredient, setIngredient] = useState(null);
   const [name, setName] = useState("");
   const navigation = useNavigation();
   useEffect(() => {
      fetch(`${API_URL}admin/ingredients/${id}`)
         .then((response) => response.json())
         .then((data) => {
            setIngredient(data);
            setName(data.Nom);
         });
   }, [id]);
   const updateIngredient = () => {
      const updatedData = {
         Nom: name,
      };

      console.log("JSON envoyé :", JSON.stringify(updatedData));

      fetch(`${API_URL}admin/ingredients/${id}`, {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(updatedData),
      })
         .then((response) => response.json())
         .then(() => {
            alert("Ingredient updated successfully");
            navigation.goBack();
         })
         .catch((error) => console.error("Error updating ingredientt:", error));
   };

   const deleteIngredient = () => {
      try {
         const response = fetch(`${API_URL}admin/ingredients/${id}`, {
            method: "DELETE",
         });
         alert("Ingrédient supprimé avec succès");
         navigation.navigate("Ingredients");
      } catch (error) {
         console.error("Erreur lors de la suppression de l'ingrédient:", error);
      }
   };

   if (!ingredient)
      return (
         <View>
            <Text>Loading...</Text>
         </View>
      );

   return (
      <View style={styles.container}>
         <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nom de l'ingrédient" />
         <Button title="Mettre à jour l'ingrédient" onPress={updateIngredient} />
         <Button title="Supprimer l'ingrédient" onPress={deleteIngredient} color={"red"} />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      padding: 10,
   },
   input: {
      height: 50,
      margin: 12,
      borderWidth: 1,
      padding: 10,
   },
});
