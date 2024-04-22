import { Text, View, ScrollView, TextInput, Button } from "react-native";
import { StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import React from "react";
import { useState, useEffect } from "react";

export default function CreatePlat() {
   const adresseIp = "http://10.60.136.51:8000";

   const [Plat, setPlat] = useState([]);

   const [newPlatName, setNewPlatName] = useState("");

   const [newPlatDescription, setNewPlatDescription] = useState("");

   const [newPlatPrixUnit, setNewPlatPrixUnit] = useState("");

   const [newPlatStockQtt, setNewPlatStockQtt] = useState("");

   const [newPlatPeremptionDate, setNewPlatPeremptionDate] = useState(null);

   const [newPlatAllergen, setNewPlatAllergen] = useState("");

   const [selectedRegion, setSelectedRegion] = useState();
   const [regions, setRegions] = useState([]);

   const [selectedIngredients, setSelectedIngredients] = useState([]);

   const [ingredients, setIngredients] = useState([]);

   // Fetch regions
   const fetchRegions = async () => {
      try {
         const response = await fetch(`${adresseIp}/admin/region`);
         const data = await response.json();
         if (response.ok) {
            setRegions(data);
         } else {
            console.error("Erreur HTTP:", response.status);
         }
      } catch (error) {
         console.error("Erreur lors de la récupération des régions:", error);
      }
   };

   // Fonction pour récupérer les ingrédients
   const fetchIngredients = async () => {
      try {
         const response = await fetch(`${adresseIp}/admin/ingredient`);
         const data = await response.json();
         if (response.ok) {
            setIngredients(data);
         } else {
            console.error("Erreur HTTP:", response.status);
         }
      } catch (error) {
         console.error("Erreur lors de la récupération des ingrédients:", error);
      }
   };

   useEffect(() => {
      fetchRegions();
      fetchIngredients();
   }, []);

   const addPlat = async () => {
      try {
         const requestBody = {
            Nom: newPlatName,
            Description: newPlatDescription,
            PrixUnit: parseFloat(newPlatPrixUnit),
            StockQtt: parseFloat(newPlatStockQtt),
            peremption_date: newPlatPeremptionDate,
            Allergen: newPlatAllergen,
            region: {
               id: selectedRegion,
            },
            ingredient: selectedIngredients,
         };

         console.log("JSON envoyé :", JSON.stringify(requestBody));

         const response = await fetch(`${adresseIp}/admin/plat/`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
         });
         const data = await response.json();
         if (response.ok) {
            setPlat([...Plat, data]);
            setNewPlatName("");
            setNewPlatDescription("");
            setNewPlatPrixUnit("");
            setNewPlatStockQtt("");
            setNewPlatAllergen("");
            setSelectedIngredients([]);
         } else {
            console.error("Erreur lors de l'ajout de la région:", data);
         }
      } catch (error) {
         console.error("Erreur lors de l'envoi de la requête:", error);
      }
   };

   return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
         <View style={styles.content}>
            <TextInput style={styles.input} value={newPlatName} onChangeText={setNewPlatName} placeholder="Nom du nouveau plat" />
            <TextInput
               style={[styles.input, { minHeight: 100 }]}
               value={newPlatDescription}
               onChangeText={setNewPlatDescription}
               placeholder="Description du nouveau plat"
               multiline={true}
            />
            <View style={{ flexDirection: "row" }}>
               <TextInput style={styles.input} value={newPlatPrixUnit} onChangeText={setNewPlatPrixUnit} placeholder="Prix du nouveau plat" />
               <TextInput style={styles.input} value={newPlatStockQtt} onChangeText={setNewPlatStockQtt} placeholder="Stock du nouveau plat" />
            </View>
            <TextInput style={styles.input} value={newPlatAllergen} onChangeText={setNewPlatAllergen} placeholder="Allergen du nouveau plat" />
            <View style={{ flexDirection: "row" }}>
               <View style={{ borderWidth: 1, width: "50%" }}>
                  <Text>Region : </Text>

                  <RNPickerSelect
                     onValueChange={(value) => setSelectedRegion(value)}
                     items={regions.map((region) => ({
                        label: region.Nom,
                        value: region.id,
                     }))}
                     placeholder={{ label: "Sélectionnez une région...", value: null }}
                  />
               </View>
               <View style={{ borderWidth: 1, width: "50%" }}>
                  <Text>Liste : {JSON.stringify(selectedIngredients)}</Text>
                  <RNPickerSelect
                     onValueChange={(value) => {
                        if (value) {
                           const selectedIngredient = ingredients.find((ingredient) => ingredient.id === value);
                           if (selectedIngredient && !selectedIngredients.some((item) => item.id === selectedIngredient.id)) {
                              setSelectedIngredients([...selectedIngredients, { id: selectedIngredient.id }]);
                           }
                        }
                     }}
                     items={ingredients.map((ingredient) => ({
                        label: ingredient.Nom,
                        value: ingredient.id,
                     }))}
                     placeholder={{ label: "Sélectionnez un ingrédient...", value: null }}
                  />
               </View>
            </View>

            <Button title="Ajouter Plat" onPress={addPlat} />
         </View>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   scrollViewContent: {
      flexGrow: 1,
      justifyContent: "center",
   },
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
