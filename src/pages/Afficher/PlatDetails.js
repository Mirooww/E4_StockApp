import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { API_URL } from "@env";
import { useNavigation } from "@react-navigation/native";

export default function PlatDetails({ route }) {
    const { id } = route.params;
    const [plats, setPlats] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchPlats = async () => {
            try {
                const response = await fetch(`${API_URL}admin/recipes/${id}`);
                const data = await response.json();
                setPlats(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des plats:", error);
            }
        };
        fetchPlats();
    }, []);

    const deletePlat = async () => {
        try {
            const response = await fetch(`${API_URL}admin/recipes/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                alert("Plat supprimé avec succès");
                navigation.navigate("Home");
            } else {
                alert("Erreur lors de la suppression du plat");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du plat:", error);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {plats ? (
                    <>
                        <View style={styles.infoContainer}>
                            <Text style={styles.idPlat}>ID: {plats.id}</Text>
                            <Text style={styles.titrePlat}>{plats.Nom}</Text>
                        </View>
                        <Text style={styles.descriptionPlat}>Description: {plats.Description}</Text>
                        <View style={styles.infoContainer}>
                            <Text style={styles.prixPlat}>Prix unitaire: {plats.PrixUnit}</Text>
                            <Text style={styles.qttPlat}>Quantité en stock: {plats.StockQtt}</Text>
                        </View>
                        <Text style={styles.rien}>Région: {plats.region.Nom}</Text>
                        <Text style={styles.rien}>Date de péremption: {plats.PeremptionDate}</Text>
                        <Text style={styles.rien}>Allergène: {plats.Allergen}</Text>
                        <View style={styles.ingredientsContainer}>
                            <Text style={styles.ingredientsTitle}>Ingrédients:</Text>
                            {plats.ingredients.map((ingredient, index) => (
                                <Text key={index} style={styles.ingredientPlat}>
                                    {ingredient.Nom}
                                </Text>
                            ))}
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("editerPlat", { id: plats.id })}>
                                <Text style={styles.buttonText}>Editer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.button, { backgroundColor: "red" }]} onPress={deletePlat}>
                                <Text style={styles.buttonText}>Supprimer</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <Text style={styles.loadingText}>Chargement en cours...</Text>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2E3134",
    },
    scrollContainer: {
        padding: 20,
    },
    infoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    idPlat: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
    titrePlat: {
        color: "white",
        fontSize: 20,
        textAlign: "center",
    },
    descriptionPlat: {
        color: "white",
        fontSize: 16,
        marginBottom: 10,
    },
    prixPlat: {
        color: "white",
        fontSize: 16,
    },
    qttPlat: {
        color: "white",
        fontSize: 16,
    },
    rien: {
        color: "white",
        fontSize: 16,
        marginBottom: 10,
    },
    ingredientsContainer: {
        borderWidth: 1,
        borderColor: "white",
        padding: 10,
        marginBottom: 20,
    },
    ingredientsTitle: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    ingredientPlat: {
        color: "white",
        fontSize: 16,
        marginBottom: 5,
    },
    loadingText: {
        color: "white",
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 20,
    },
    button: {
        backgroundColor: "green",
        padding: 15,
        borderRadius: 15,
        width: "45%",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
    },
});
