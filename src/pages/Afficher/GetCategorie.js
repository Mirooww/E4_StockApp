import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

import React from "react";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

export default function GetCategorie() {
    const navigation = useNavigation();

    const adresseIp = "http://192.168.1.120:8000";

    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await fetch(`${adresseIp}/admin/region/`);
                const data = await response.json();
                setRegions(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des régions:", error);
            }
        };
        fetchRegions();
    }, []);

    const [regions, setRegions] = useState([]);

    const deleteRegion = async (id) => {
        try {
            const response = await fetch(`${adresseIp}/admin/region/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                // Supprimez la région de l'état pour mettre à jour l'interface utilisateur
                setRegions(regions.filter((item) => item.id !== id));
                alert("Région supprimée avec succès");
            } else {
                alert("Erreur lors de la suppression de la région");
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de la région:", error);
        }
    };

    return (
        <View style={styles.content}>
            <Text>Regions</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollViewStyle}>
                {regions.map((item) => (
                    <View key={item.id.toString()} style={styles.regionItem}>
                        <TouchableOpacity onPress={() => navigation.navigate("EditRegion", { id: item.id })}>
                            <Text style={styles.regionNom}>{item.Nom}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteRegion(item.id)} style={styles.deleteButton}>
                            <Text style={styles.deleteButtonText}>Supprimer</Text>
                        </TouchableOpacity>
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

    regionItem: {
        marginRight: 10,
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
    deleteButton: {
        padding: 3,
        backgroundColor: "red",
        borderRadius: 5,
        marginTop: 5,
    },
    deleteButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});
