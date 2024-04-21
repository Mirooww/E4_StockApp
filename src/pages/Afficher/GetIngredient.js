import { Text, View, ScrollView } from "react-native";
import { StyleSheet } from "react-native";

import React from "react";
import { useState, useEffect } from "react";

export default function GetIngredient() {
    const adresseIp = "http://192.168.1.120:8000";

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

    return (
        <View style={styles.content}>
            <Text>Ingrédient</Text>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollViewStyle}>
                {ingredients.map((item) => (
                    <View key={item.id.toString()} style={styles.ingredientItem}>
                        <Text style={styles.ingredientNom}>{item.Nom}</Text>
                    </View>
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
});
