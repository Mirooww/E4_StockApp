import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Button, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

function EditPlat({ route, navigation }) {
    const { id } = route.params;
    const adresseIp = "http://192.168.1.120:8000";

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
                setSelectedIngredient(data.ingredients.length ? data.ingredients[0].id : null); // Assumes first ingredient is the main one
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
            ingredients: [selectedIngredientObject], // Attribution de l'objet d'ingrédient au tableau "ingredients"
        };

        console.log("JSON envoyé :", JSON.stringify(updatedData)); // Ajout du console.log pour afficher le JSON envoyé

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
        <View style={styles.container}>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Nom du plat" />
            <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Description du plat" />
            <TextInput style={styles.input} value={prixUnit} onChangeText={setPrixUnit} placeholder="Prix unitaire" />
            <TextInput style={styles.input} value={stockQtt} onChangeText={setStockQtt} placeholder="Quantité en stock" />
            <TextInput style={styles.input} value={allergen} onChangeText={setAllergen} placeholder="Allergènes" />

            <RNPickerSelect
                onValueChange={setSelectedRegion}
                items={regions.map((region) => ({ label: region.Nom, value: region.id }))}
                placeholder={{ label: "Sélectionnez une région...", value: null }}
                value={selectedRegion}
            />
            <RNPickerSelect
                onValueChange={setSelectedIngredient}
                items={ingredients.map((ingredient) => ({ label: ingredient.Nom, value: ingredient.id }))}
                placeholder={{ label: "Sélectionnez un ingrédient...", value: null }}
                value={selectedIngredient}
            />

            <Button title="Mettre à jour le plat" onPress={updatePlat} />
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

export default EditPlat;
