import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Picker, StyleSheet, Modal, ScrollView, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { API_URL } from "@env";
import { useNavigation } from "@react-navigation/native";

export default function AjouterPlat() {
   const [nom, setNom] = useState("");
   const [description, setDescription] = useState("");
   const [prixUnit, setPrixUnit] = useState("");
   const [stockQtt, setStockQtt] = useState("");
   const [allergen, setAllergen] = useState("");
   const [region, setRegion] = useState("");
   const [ingredients, setIngredients] = useState([]);
   const [allIngredients, setAllIngredients] = useState([]);
   const [allRegions, setAllRegions] = useState([]);
   const navigation = useNavigation();
   useEffect(() => {
      fetch(`${API_URL}admin/ingredients`)
         .then((response) => response.json())
         .then((data) => setAllIngredients(data))
         .catch((error) => console.error("Erreur lors de la récupération des ingrédients:", error));

      fetch(`${API_URL}admin/regions`)
         .then((response) => response.json())
         .then((data) => setAllRegions(data))
         .catch((error) => console.error("Erreur lors de la récupération des régions:", error));
   }, []);

   const handleSubmit = async () => {
      const plat = {
         nom: nom,
         description: description,
         prix_unit: parseFloat(prixUnit),
         stock_qtt: parseInt(stockQtt, 10),
         allergen: allergen,
         region: { id: parseInt(region, 10) },
         ingredients: ingredients.map((id) => ({ id: parseInt(id, 10) })),
      };

      try {
         const response = await fetch(`${API_URL}admin/recipes/`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(plat),
         });

         if (!response.ok) {
            throw new Error("Something went wrong");
         }

         const result = await response.json();
         alert("Ingredient updated successfully");
         navigation.goBack();
      } catch (error) {
         console.error("Erreur lors de l’ajout du plat:", error);
      }
   };

   const IngredientSelector = ({ visible, onClose, ingredients, selectedIngredients, setSelectedIngredients }) => {
      const toggleIngredient = (id) => {
         if (selectedIngredients.includes(id)) {
            setSelectedIngredients(selectedIngredients.filter((item) => item !== id));
         } else {
            setSelectedIngredients([...selectedIngredients, id]);
         }
      };

      return (
         <Modal visible={visible} transparent={true} animationType="slide" style={modal.modalOverlay}>
            <View style={modal.modalView}>
               <ScrollView style={modal.scrollView}>
                  {ingredients.map((ingredient) => (
                     <TouchableOpacity
                        key={ingredient.id}
                        onPress={() => toggleIngredient(ingredient.id)}
                        style={[
                           styles.button,
                           {
                              backgroundColor: selectedIngredients.includes(ingredient.id) ? "green" : "grey",
                           },
                        ]}
                     >
                        <Text style={styles.buttonText}>{ingredient.Nom}</Text>
                     </TouchableOpacity>
                  ))}
               </ScrollView>
               <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Fermer</Text>
               </TouchableOpacity>
            </View>
         </Modal>
      );
   };

   const [ingredientModalVisible, setIngredientModalVisible] = useState(false);

   return (
      <>
         <ScrollView style={styles.container}>
            <TextInput style={styles.input} placeholder="Nom du plat" value={nom} onChangeText={setNom} />
            <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
            <TextInput style={styles.input} placeholder="Prix unitaire" value={prixUnit} onChangeText={setPrixUnit} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Quantité en stock" value={stockQtt} onChangeText={setStockQtt} keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Allergène" value={allergen} onChangeText={setAllergen} />
            <Text> Région</Text>
            <RNPickerSelect
               selectedValue={region}
               onValueChange={(itemValue) => setRegion(itemValue)}
               items={allRegions.map((region) => ({
                  label: region.Nom,
                  value: region.id,
                  key: region.id,
               }))}
            />

            <TouchableOpacity style={styles.button} onPress={() => setIngredientModalVisible(true)}>
               <Text style={styles.buttonText}>Ajouter des ingrédients</Text>
            </TouchableOpacity>
            <IngredientSelector
               visible={ingredientModalVisible}
               onClose={() => setIngredientModalVisible(false)}
               ingredients={allIngredients}
               selectedIngredients={ingredients}
               setSelectedIngredients={setIngredients}
            />

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
               <Text style={styles.buttonText}>Ajouter le plat</Text>
            </TouchableOpacity>
         </ScrollView>
      </>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,

      padding: 20,
   },
   scrollView: {
      width: "100%",
      paddingHorizontal: 20,
   },
   input: {
      height: 40,
      width: "100%",
      marginVertical: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      paddingHorizontal: 10,
   },
   button: {
      backgroundColor: "blue",
      padding: 10,
      marginVertical: 10,
      borderRadius: 5,
      width: "100%",
   },
   buttonText: {
      color: "white",
      textAlign: "center",
      fontSize: 16,
   },
   closeButton: {
      backgroundColor: "red",
      padding: 10,
      marginVertical: 10,
      borderRadius: 5,
      width: "100%",
   },
   closeButtonText: {
      color: "white",
      textAlign: "center",
      fontSize: 16,
   },
});

const modal = StyleSheet.create({
   modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
   },
   modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      position: "absolute",
      bottom: "10%",
      alignSelf: "center",
   },
   scrollView: {
      maxHeight: 200,
      marginBottom: 10,
   },
});
