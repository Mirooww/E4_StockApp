import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from "react-native";
import { useState } from "react";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";
import { useFocusEffect } from "@react-navigation/native";

export default function Ingredient() {
    const navigation = useNavigation();

    const [ingredients, setIngredients] = useState([]);
    useFocusEffect(
        React.useCallback(() => {
            const fetchIngredients = async () => {
                try {
                    const response = await fetch(`${API_URL}admin/ingredients`);
                    const data = await response.json();
                    setIngredients(data);
                } catch (error) {
                    console.error("Erreur lors de la récupération des ingrédients:", error);
                }
            };
            fetchIngredients();
        }, [])
    );
    return (
        <View style={styles.container}>
            {ingredients ? (
                <ScrollView style={styles.scrollView}>
                    {ingredients.map((ingredient) => (
                        <TouchableOpacity onPress={() => navigation.navigate("editerIngredient", { id: ingredient.id })} key={"container :" + ingredient.id}>
                            <ImageBackground
                                key={ingredient.id}
                                source={require("../../../assets/svg/shadow.png")}
                                style={styles.platContainer}
                                resizeMode="cover"
                            >
                                <View style={styles.platImg}></View>
                                <View style={styles.platDescri}>
                                    <Text style={styles.platDescriTitre}>{ingredient.Nom}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            ) : (
                <Text style={{ color: "white" }}>Chargement en cours...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 95,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    scrollView: {
        marginTop: 20,
        width: "95%",
        backgroundColor: "#2E3134",
        padding: 15,
        borderRadius: 15,
    },
    platContainer: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 15,
        marginBottom: 10,
        display: "flex",
        flexDirection: "row", // Les enfants sont disposés horizontalement
        width: "100%",
        height: 90,
        overflow: "hidden",
    },
    platImg: {
        height: "100%", // Hauteur définie
        aspectRatio: 1, // Le ratio d'aspect 1:1 garantit que la largeur sera
        borderWidth: 1,
        flex: 0,
        borderColor: "white",
        borderRadius: 15,
    },
    platDescri: {
        flex: 1,
        position: "relative",
        color: "white",
    },
    platDescriTitre: {
        position: "absolute",
        fontSize: 18,
        left: 10,
        top: 10,
        color: "white",
    },
    platDescriStock: {
        position: "absolute",
        fontSize: 16,
        bottom: 0,
        marginLeft: "auto",
        marginRight: "auto",

        right: 15,
        textAlign: "center",
        color: "white",
    },
    platDescriPrix: {
        position: "absolute",
        fontSize: 18,
        color: "white",
        left: 10,
        top: 40,
    },
});
