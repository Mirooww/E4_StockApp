import React, { useState, useEffect } from "react";
import { View, TextInput, Text, Button, StyleSheet } from "react-native";
import { API_URL } from "@env";
import { useNavigation } from "@react-navigation/native";

export default function EditRegion({ route }) {
    const { id } = route.params;
    const [region, setRegion] = useState(null);
    const [name, setName] = useState("");
    const navigation = useNavigation();
    useEffect(() => {
        fetch(`${API_URL}admin/region/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setRegion(data);
                setName(data.Nom);
            });
    }, [id]);
    const updateRegion = () => {
        const updatedData = {
            nom: name,
        };

        console.log("JSON envoyé :", JSON.stringify(updatedData));

        fetch(`${API_URL}admin/region/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        })
            .then((response) => response.json())
            .then(() => {
                alert("Region updated successfully");
                navigation.goBack();
            })
            .catch((error) => console.error("Error updating regiont:", error));
    };

    const deleteRegion = () => {
        try {
            const response = fetch(`${API_URL}admin/region/${id}`, {
                method: "DELETE",
            });
            alert("Région supprimé avec succès");
            navigation.navigate("Regions");
        } catch (error) {
            console.error("Erreur lors de la suppression de la région:", error);
        }
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
            <Button title="Mettre à jour la région" onPress={updateRegion} />
            <Button title="Supprimer la région" onPress={deleteRegion} color={"red"} />
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
