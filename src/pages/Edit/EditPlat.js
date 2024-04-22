import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Button, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";

function EditPlat({ route, navigation }) {
   const { id } = route.params;
   const adresseIp = "http://10.60.136.51:8000";

   const [plat, setPlat] = useState(null);

   const [name, setName] = useState("");
   const [description, setDescription] = useState("");
   const [prixUnit, setPrixUnit] = useState("");
   const [stockQtt, setStockQtt] = useState("");
   const [peremptionDate, setPeremptionDate] = useState(null);
   const [allergen, setAllergen] = useState("");
   const [selectedRegion, setSelectedRegion] = useState(null);
   const [selectedIngredient, setSelectedIngredient] = useState(null);

   const [regions, setRegions] = useState([]);
   const [ingredients, setIngredients] = useState([]);

   useEffect(() => {
      fetch(`${adresseIp}/admin/plat/${id}`)
         .then((response) => response.json())
         .then((data) => {
            setPlat(data);
            setName(data.Nom);
            setDescription(data.Description);
            setPrixUnit(data.PrixUnit.toString());
            setStockQtt(data.StockQtt.toString());
            setPeremptionDate(data.PeremptionDate);
            setAllergen(data.Allergen);
            setSelectedRegion(data.region ? data.region.id : null);
            setSelectedIngredient(data.ingredients.length ? data.ingredients[0].id : null);
         });

      fetch(`${adresseIp}/admin/region`)
         .then((response) => response.json())
         .then(setRegions);

      fetch(`${adresseIp}/admin/ingredient`)
         .then((response) => response.json())
         .then(setIngredients);
   }, [id]);

   const updatePlat = () => {
      const selectedIngredientDetails = ingredients.find((ingredient) => ingredient.id === selectedIngredient);

      const selectedIngredientObject = {
         id: selectedIngredientDetails.id,
         Nom: selectedIngredientDetails.Nom,
      };

      const updatedData = {
         Nom: name,
         Description: description,
         PrixUnit: parseFloat(prixUnit),
         StockQtt: parseFloat(stockQtt),
         PeremptionDate: peremptionDate,
         Allergen: allergen,
         region: { id: selectedRegion },
         ingredients: [selectedIngredientObject],
      };

      console.log("JSON envoyé :", JSON.stringify(updatedData));

      fetch(`${adresseIp}/admin/plat/${id}`, {
         method: "PUT",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(updatedData),
      })
         .then((response) => response.json())
         .then(() => {
            alert("Plat updated successfully");
            navigation.goBack();
         })
         .catch((error) => console.error("Error updating plat:", error));
   };

   if (!plat)
      return (
         <View>
            <Text>Loading...</Text>
         </View>
      );

   return (
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
         <View style={styles.content}>
            <Text style={{ textAlign: "center" }}>Nom : </Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nom du plat" />

            <Text style={{ textAlign: "center" }}>Description : </Text>
            <TextInput
               style={[styles.input, { minHeight: 100 }]}
               value={description}
               onChangeText={setDescription}
               placeholder="Description du plat"
               multiline={true}
            />
            <View style={{ flexDirection: "row" }}>
               <TextInput style={[styles.input, { flex: 1 }]} value={prixUnit} onChangeText={setPrixUnit} placeholder="Prix unitaire" />
               <TextInput style={[styles.input, { flex: 1 }]} value={stockQtt} onChangeText={setStockQtt} placeholder="Quantité en stock" />
            </View>
            <Text style={{ textAlign: "center" }}>Allergenes : </Text>

            <TextInput style={styles.input} value={allergen} onChangeText={setAllergen} placeholder="Allergènes" />
            <View style={{ flexDirection: "row" }}>
               <View style={{ borderWidth: 1, width: "50%" }}>
                  <Text>Region : </Text>
                  <RNPickerSelect
                     onValueChange={setSelectedRegion}
                     items={regions.map((region) => ({ label: region.Nom, value: region.id }))}
                     placeholder={{ label: "Sélectionnez une région...", value: null }}
                     value={selectedRegion}
                  />
               </View>
               <View style={{ borderWidth: 1, width: "50%" }}>
                  <Text>Ingrédient : </Text>
                  <RNPickerSelect
                     onValueChange={setSelectedIngredient}
                     items={ingredients.map((ingredient) => ({ label: ingredient.Nom, value: ingredient.id }))}
                     placeholder={{ label: "Sélectionnez un ingrédient...", value: null }}
                     value={selectedIngredient}
                  />
               </View>
            </View>

            <Button title="Mettre à jour le plat" onPress={updatePlat} />
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

export default EditPlat;
