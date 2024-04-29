import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Modal, ScrollView, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { API_URL } from "@env";

export default function EditerPlat({ route }) {
   const { id } = route.params;
   const [plat, setPlat] = useState(null);

   const [nom, setNom] = useState("");
   const [description, setDescription] = useState("");
   const [prixUnit, setPrixUnit] = useState("");
   const [stockQtt, setStockQtt] = useState("");
   const [allergen, setAllergen] = useState("");
   const [region, setRegion] = useState("");
   const [allRegions, setAllRegions] = useState([]);
   const [allIngredients, setAllIngredients] = useState([]);
   const [ingredientSelected, setIngredientSelected] = useState([]);
   const [newIngredientSelected, setNewIngredientSelected] = useState([]);

   useEffect(() => {
      fetch(`${API_URL}admin/recipes/${id}`)
         .then((response) => response.json())
         .then((data) => {
            setPlat(data);
            setNom(data.Nom);
            setDescription(data.Description);
            setPrixUnit(data.PrixUnit.toString());
            setStockQtt(data.StockQtt.toString());
            setAllergen(data.Allergen);
            setRegion(data.region ? data.region.id : null);
         });
      fetch(`${API_URL}admin/regions`)
         .then((response) => response.json())
         .then((data) => setAllRegions(data))
         .catch((error) => console.error("Erreur lors de la récupération des régions:", error));
      fetch(`${API_URL}admin/ingredients`)
         .then((response) => response.json())
         .then((data) => setAllIngredients(data))
         .catch((error) => console.error("Erreur lors de la récupération des ingrédients:", error));
      fetch(`${API_URL}admin/recipe/${id}/compo`)
         .then((response) => response.json())
         .then((data) => setIngredientSelected(data))
         .catch((error) => console.error("Erreur lors de la récupération des ingrédients du plat:", error));
   }, [id]);

   const updatePlat = async () => {
      const platModify = {
         Nom: nom,
         Description: description,
         PrixUnit: parseFloat(prixUnit),
         StockQtt: parseInt(stockQtt, 10),
         Allergen: allergen,
         region: { id: parseInt(region, 10) },
      };

      try {
         const response = await fetch(`${API_URL}admin/recipes/${id}`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(platModify),
         });

         if (!response.ok) {
            throw new Error("Something went wrong");
         }

         const result = await response.json();
         console.log("Plat modifié avec succès:", result);
      } catch (error) {
         console.error("Erreur lors de la modification du plat:", error);
      }
   };
   const updateIngredientPlat = async () => {
      try {
         const response = await fetch(`${API_URL}admin/recipe/${id}/compo/`, {
            method: "PUT",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(newIngredientSelected.map((id) => ({ id }))),
         });

         if (!response.ok) {
            throw new Error("Something went wrong");
         }

         const result = await response.json();
         console.log("Ingrédient du plat modifié avec succès:", result);
      } catch (error) {
         console.error("Erreur lors de la modification du plat:", error);
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

      const nomsDesIngredients = ingredientSelected.map((ingredient) => ingredient.Nom).join(", ");
      return (
         <Modal visible={visible} transparent={true} animationType="slide" style={modal.modalOverlay}>
            <View style={modal.modalView}>
               <Text style={styles.sectionTitle}>Précédents ingrédients : {nomsDesIngredients}</Text>
               {ingredients.map((ingredient) => (
                  <TouchableOpacity
                     key={ingredient.id}
                     style={[styles.button, selectedIngredients.includes(ingredient.id) && styles.selectedButton]}
                     onPress={() => toggleIngredient(ingredient.id)}
                  >
                     <Text style={styles.buttonText}>{ingredient.Nom}</Text>
                  </TouchableOpacity>
               ))}
               <TouchableOpacity style={styles.button} onPress={() => updateIngredientPlat()}>
                  <Text style={styles.buttonText}>Sauvegarder ingrédient</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Text style={styles.closeButtonText}>Fermer</Text>
               </TouchableOpacity>
            </View>
         </Modal>
      );
   };
   const [ingredientModalVisible, setIngredientModalVisible] = useState(false);

   return (
      <ScrollView contentContainerStyle={styles.container}>
         <TextInput style={styles.input} placeholder="Nom du plat" value={nom} onChangeText={setNom} />
         <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
         <TextInput style={styles.input} placeholder="Prix unitaire" value={prixUnit} onChangeText={setPrixUnit} keyboardType="numeric" />
         <TextInput style={styles.input} placeholder="Quantité en stock" value={stockQtt} onChangeText={setStockQtt} keyboardType="numeric" />
         <TextInput style={styles.input} placeholder="Allergène" value={allergen} onChangeText={setAllergen} />
         <RNPickerSelect
            selectedValue={region}
            value={region}
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
            selectedIngredients={newIngredientSelected}
            setSelectedIngredients={setNewIngredientSelected}
         />
         <TouchableOpacity style={styles.button} onPress={updatePlat}>
            <Text style={styles.buttonText}>Modifier le plat</Text>
         </TouchableOpacity>
      </ScrollView>
   );
}

const styles = StyleSheet.create({
   container: {
      flexGrow: 1,
      justifyContent: "center",
      padding: 20,
   },
   input: {
      height: 40,
      marginVertical: 10,
      borderWidth: 1,
      borderColor: "#ccc",
      paddingHorizontal: 10,
   },
   button: {
      backgroundColor: "#2196F3",
      padding: 10,
      marginVertical: 10,
      borderRadius: 5,
   },
   buttonText: {
      color: "white",
      textAlign: "center",
      fontSize: 16,
   },
   selectedButton: {
      backgroundColor: "green",
   },
   closeButton: {
      backgroundColor: "red",
      padding: 10,
      marginVertical: 10,
      borderRadius: 5,
   },
   closeButtonText: {
      color: "white",
      textAlign: "center",
      fontSize: 16,
   },
   sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 10,
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
});
