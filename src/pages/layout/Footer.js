import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse, faUser, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

export default function Footer() {
    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.categContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.button}>
                    <FontAwesomeIcon icon={faHouse} style={styles.categ} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Profil")} style={styles.button}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={styles.categ} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Profil")} style={styles.button}>
                    <FontAwesomeIcon icon={faPlus} style={styles.categ} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Profil")} style={styles.button}>
                    <FontAwesomeIcon icon={faUser} style={styles.categ} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    categContainer: {
        width: "100%",
        height: 75,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#fff", // Ajoutez une couleur de fond si nécessaire
    },
    button: {
        width: 50, // Augmentez la largeur pour un bouton plus grand
        height: 50, // Augmentez la hauteur pour un bouton plus grand
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    categ: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 100, // Ajoutez un rayon de bordure pour adoucir les coins
        width: 50, // Augmentez la largeur pour un bouton plus grand
        height: 50, // Augmentez la hauteur pour un bouton plus grand
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000", // Couleur de l'ombre
        shadowOffset: {
            width: 0,
            height: 2, // Décalage vertical de l'ombre
        },
        shadowOpacity: 0.25, // Opacité de l'ombre
        shadowRadius: 3.84, // Flou de l'ombre
        elevation: 5, // Elevation pour Android
    },
});
