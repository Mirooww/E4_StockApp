import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export default function Header() {
    const navigation = useNavigation();

    return (
        <>
            <View style={styles.topBar}>
                <Text style={styles.title}>ACME</Text>
            </View>
            <View style={styles.categContainer}>
                <TouchableOpacity style={styles.categItem} onPress={() => navigation.navigate("Regions")}>
                    <Text style={styles.categ}>Région</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categItem} onPress={() => navigation.navigate("Ingredients")}>
                    <Text style={styles.categ}>Ingredient</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    topBar: {
        marginTop: 50,
        height: 40,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    categContainer: {
        width: "100%",
        height: 60,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ddd",
    },
    categ: {
        fontSize: 20,
        borderWidth: 1,
        borderColor: "#ddd",
        width: 100,
        textAlign: "center",
    },
});
