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

    const deletePlat = async (id) => {
        try {
            const response = await fetch(`${adresseIp}/admin/plat/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                // Supprimez le plat de l'état pour mettre à jour l'interface utilisateur
                setPlats(plats.filter((plat) => plat.id !== id));
                alert("Plat supprimé avec succès");
            } else {
                alert("Erreur lors de la suppression du plat");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression du plat:", error);
        }
    };

    return (
        <View style={styles.content}>
            <Text>Bienvenue</Text>

            <FlatList
                data={plats}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.platItem}>
                        <TouchableOpacity onPress={() => navigation.navigate("EditPlat", { id: item.id })}>
                            <Text style={styles.platNom}>{item.Nom}</Text>
                            <Text>{item.Description}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deletePlat(item.id)} style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Supprimer</Text>
                        </TouchableOpacity>
                    </View>
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
    deleteButton: {
        padding: 10,
        backgroundColor: "red",
        borderRadius: 5,
        marginTop: 5,
        alignSelf: "flex-end", // Ajoutez ceci pour aligner le bouton à droite
    },
    deleteButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
});
