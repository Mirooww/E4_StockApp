import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { StyleSheet } from "react-native";
import { auth } from "../../firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function MainPage() {
    const [plats, setPlats] = useState([]);

    const navigation = useNavigation();
    const adresseIp = "http://192.168.1.120:8000";

    const fetchPlats = async () => {
        try {
            const response = await fetch(`${adresseIp}/admin/plat/`);
            const data = await response.json();
            setPlats(data);
        } catch (error) {
            console.error("Erreur lors de la récupération des plats:", error);
        }
    };

    useEffect(() => {
        fetchPlats();
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
                    <TouchableOpacity
                        style={styles.platItem}
                        onPress={() => navigation.navigate("EditPlat", { id: item.id })} // Naviguez vers MoreInfo avec l'id du plat
                    >
                        <Text style={styles.platNom}>{item.Nom}</Text>
                        <Text>{item.Description}</Text>
                    </TouchableOpacity>
                )}
                onRefresh={fetchPlats}
                refreshing={false}
            />

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
});
