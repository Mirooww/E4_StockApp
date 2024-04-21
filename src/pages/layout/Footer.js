import { View, Text, StyleSheet, TouchableOpacity, Modal, TouchableWithoutFeedback } from "react-native";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHouse, faUser, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";

export default function Footer() {
    const navigation = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <View>
            <View style={styles.categContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.button}>
                    <FontAwesomeIcon icon={faHouse} style={styles.categ} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Profil")} style={styles.button}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={styles.categ} />
                </TouchableOpacity>

                <TouchableOpacity onPress={toggleModal} style={styles.button}>
                    <FontAwesomeIcon icon={faPlus} style={styles.categ} />
                </TouchableOpacity>

                <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
                    <TouchableWithoutFeedback onPress={toggleModal}>
                        <View style={styles.modalOverlay}>
                            <View style={styles.modalView}>
                                <TouchableWithoutFeedback>
                                    <View>
                                        <Text style={styles.modalText}>Votre contenu ici</Text>
                                        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate("CreateRegion")}>
                                            <Text>Ajouter région</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate("CreatePlat")}>
                                            <Text>Ajouter plat</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate("CreateIngredient")}>
                                            <Text>Ajouter ingrédient</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

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
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        position: "absolute", // Position absolue pour le placer au-dessus du bouton
        bottom: "10%", // Ajustez la position en fonction de l'emplacement du bouton
        alignSelf: "center", // Centre le modal
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
    closeButton: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
});
