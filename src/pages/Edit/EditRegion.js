import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Button, StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import RNPickerSelect from "react-native-picker-select";

function EditRegion({ route, navigation }) {
   const { id } = route.params;
   const adresseIp = "http://10.60.136.51:8000";

   const [region, setRegion] = useState(null);

   const [name, setName] = useState("");

   useEffect(() => {
      fetch(`${adresseIp}/admin/region/${id}`)
         .then((response) => response.json())
         .then((data) => {
            setRegion(data);
            setName(data.Nom);
            console.log(name);
         });
   }, [id]);

   const updateRegion = () => {
      const updatedData = {
         nom: name,
      };

      console.log("JSON envoyé :", JSON.stringify(updatedData)); // Ajout du console.log pour afficher le JSON envoyé

      fetch(`${adresseIp}/admin/region/${id}`, {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(updatedData),
      })
         .then((response) => response.json())
         .then(() => {
            alert("Region updated successfully");
            navigation.goBack();
         })
         .catch((error) => console.error("Error updating region:", error));
   };

   if (!region)
      return (
         <View>
            <Text>Loading...</Text>
         </View>
      );

   return (
      <View style={styles.container}>
         <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nom de la région" />

         <Button title="Mettre à jour le plat" onPress={updateRegion} />
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

export default EditRegion;
