import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

import React from "react";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function GetIngredient() {
   const navigation = useNavigation();

   const adresseIp = "http://10.60.136.51:8000";

   useEffect(() => {
      const fetchIngredients = async () => {
         try {
            const response = await fetch(`${adresseIp}/admin/ingredient/`);
            const data = await response.json();
            setIngredients(data);
         } catch (error) {
            console.error("Erreur lors de la récupération des ingrédients:", error);
         }
      };
      fetchIngredients();
   }, []);

   const [ingredients, setIngredients] = useState([]);

   const deleteIngredient = async (id) => {
      try {
         const response = await fetch(`${adresseIp}/admin/ingredient/${id}`, {
            method: "DELETE",
         });
         if (response.ok) {
            setIngredients(ingredients.filter((item) => item.id !== id));
            alert("Ingrédient supprimé avec succès");
         } else {
            alert("Erreur lors de la suppression de l'ingrédient");
         }
      } catch (error) {
         console.error("Erreur lors de la suppression de l'ingrédient:", error);
      }
   };

   return (
      <View style={styles.content}>
         <Text>Ingrédient</Text>

         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollViewStyle}>
            {ingredients.map((item) => (
               <TouchableOpacity key={item.id.toString()} onPress={() => navigation.navigate("EditIngredient", { id: item.id })}>
                  <View style={styles.ingredientItem}>
                     <Text style={styles.ingredientNom}>{item.Nom}</Text>
                  </View>
                  <TouchableOpacity onPress={() => deleteIngredient(item.id)} style={styles.deleteButton}>
                     <Text style={styles.deleteButtonText}>Supprimer</Text>
                  </TouchableOpacity>
               </TouchableOpacity>
            ))}
         </ScrollView>
      </View>
   );
}

const styles = StyleSheet.create({
   content: {
      display: "flex",
      minHeight: "90vh",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 0 0 1px",
   },
   scrollViewStyle: {
      flexDirection: "row",
      marginVertical: 10,
   },
   ingredientItem: {
      marginRight: 10,
   },

   ingredientItem: {
      padding: 20,
      marginVertical: 8,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 5,
      backgroundColor: "#f9f9f9",
   },
   ingredientNom: {
      fontWeight: "bold",
      color: "#2a5d84",
   },
   deleteButton: {
      padding: 3,
      backgroundColor: "red",
      borderRadius: 5,
      marginTop: 5,
   },
   deleteButtonText: {
      color: "white",
      fontWeight: "bold",
   },
});
