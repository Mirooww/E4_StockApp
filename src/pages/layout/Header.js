import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export default function Header() {
    const navigation = useNavigation();

    return (
        <View>
            <Text style={styles.topBar}>NEXUM</Text>
            <View style={styles.categContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("GetRegion")}>
                    <Text style={styles.categ}>Région</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => navigation.navigate("Plat")}>
                    <Text style={styles.categ}>Plat</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => navigation.navigate("GetIngredient")}>
                    <Text style={styles.categ}>Ingredient</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    topBar: {
        marginTop: 50,
        height: 30,
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    categContainer: {
        width: "100%",
        height: 50,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    categ: {
        fontSize: 20,
        width: 90,
        textAlign: "center",
    },
});
