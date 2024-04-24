import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from "react-native";
import { useState } from "react";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "@env";
import { useFocusEffect } from "@react-navigation/native";

export default function Region() {
    const navigation = useNavigation();

    const [region, setRegion] = useState([]);
    useFocusEffect(
        React.useCallback(() => {
            const fetchPlats = async () => {
                try {
                    const response = await fetch(`${API_URL}admin/regions`);
                    const data = await response.json();
                    setRegion(data);
                } catch (error) {
                    console.error("Erreur lors de la récupération des régions:", error);
                }
            };
            fetchPlats();
        }, [])
    );
    return (
        <View style={styles.container}>
            {region ? (
                <ScrollView style={styles.scrollView}>
                    {region.map((plat) => (
                        <TouchableOpacity onPress={() => navigation.navigate("editerRegion", { id: plat.id })} key={"container :" + plat.id}>
                            <ImageBackground key={plat.id} source={require("../../../assets/svg/shadow.png")} style={styles.platContainer} resizeMode="cover">
                                <View style={styles.platImg}></View>
                                <View style={styles.platDescri}>
                                    <Text style={styles.platDescriTitre}>{plat.Nom}</Text>
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
        flexDirection: "row",
        width: "100%",
        height: 90,
        overflow: "hidden",
    },
    platImg: {
        height: "100%",
        aspectRatio: 1,
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
