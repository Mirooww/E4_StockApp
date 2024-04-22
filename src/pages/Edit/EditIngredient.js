import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Button, StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function EditIngredient({ route, navigation }) {
   const { id } = route.params;
   const adresseIp = "http://10.60.136.51:8000";

   const [ingredient, setIngredient] = useState(null);

   const [name, setName] = useState("");

   useEffect(() => {
      fetch(`${adresseIp}/admin/ingredient/${id}`)
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

      fetch(`${adresseIp}/admin/ingredient/${id}`, {
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
