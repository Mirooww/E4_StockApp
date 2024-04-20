import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";

export default function MainPage() {
    const [plats, setPlats] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [regions, setRegions] = useState([]);

    const adresseIp = "http://192.168.1.120:8000";
    useEffect(() => {
        const fetchPlats = async () => {
            try {
                const response = await fetch(`${adresseIp}/admin/plat/`);
                const data = await response.json();
                setPlats(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des plats:", error);
            }
        };
        const fetchIngredients = async () => {
            try {
                const response = await fetch(`${adresseIp}/admin/plat/`);
                const data = await response.json();
                setIngredients(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des ingrédients:", error);
            }
        };

        const fetchRegions = async () => {
            try {
                const response = await fetch(`${adresseIp}/admin/plat/`);
                const data = await response.json();
                setRegions(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des régions:", error);
            }
        };

        fetchPlats();
        fetchIngredients();
        fetchRegions();
    }, []);

    const Logout = async () => {
        await signOut(auth);
        console.log("Déconnecté");
    };

    return (
        <View style={styles.content}>
            <Text>Bienvenue</Text>
            <FlatList
                data={plats}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.platItem}>
                        <Text style={styles.platNom}>{item.Nom}</Text>
                        <Text>{item.Description}</Text>
                    </View>
                )}
            />
            <Text>Ingrédient</Text>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollViewStyle}>
                {ingredients.map((item) => (
                    <View key={item.id.toString()} style={styles.ingredientItem}>
                        <Text style={styles.ingredientNom}>{item.Nom}</Text>
                    </View>
                ))}
            </ScrollView>

            <Text>Région</Text>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollViewStyle}>
                {regions.map((item) => (
                    <View key={item.id.toString()} style={styles.regionItem}>
                        <Text style={styles.regionNom}>{item.Nom}</Text>
                    </View>
                ))}
            </ScrollView>
            <TouchableOpacity onPress={Logout}>
                <Text>Se déconnecter</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    scrollViewStyle: {
        flexDirection: "row",
        marginVertical: 10,
    },
    ingredientItem: {
        marginRight: 10,
    },
    regionItem: {
        marginRight: 10,
    },
    content: {
        display: "flex",
        minHeight: "90vh",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 0 1px",
    },
    platItem: {
        padding: 20,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        backgroundColor: "#f9f9f9",
    },
    platNom: {
        fontWeight: "bold",
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
    regionItem: {
        padding: 15,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: "#bbb",
        borderRadius: 5,
        backgroundColor: "#fff0f0",
    },
    regionNom: {
        fontWeight: "bold",
        color: "#a83f39",
    },
});
