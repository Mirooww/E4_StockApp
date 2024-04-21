import { Text, View, ScrollView } from "react-native";
import { StyleSheet } from "react-native";

import React from "react";
import { useState, useEffect } from "react";

export default function GetCategorie() {
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

    return (
        <View style={styles.content}>
            <Text>Regions</Text>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollViewStyle}>
                {regions.map((item) => (
                    <View key={item.id.toString()} style={styles.regionItem}>
                        <Text style={styles.regionNom}>{item.Nom}</Text>
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
});
