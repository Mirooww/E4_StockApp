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
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.button}>
                <FontAwesomeIcon icon={faHouse} style={styles.icon} />
                <Text style={styles.label}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleModal} style={[styles.addButton]}>
                <FontAwesomeIcon icon={faPlus} style={[styles.icon, styles.addIcon]} />
            </TouchableOpacity>

            <Modal animationType="slide" transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
                <TouchableWithoutFeedback onPress={toggleModal}>
                    <View style={modal.modalOverlay}>
                        <View style={modal.modalView}>
                            <TouchableWithoutFeedback>
                                <View>
                                    <TouchableOpacity style={modal.closeButton} onPress={() => navigation.navigate("creerRegion")}>
                                        <Text style={modal.buttonText}>Ajouter region</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={modal.closeButton} onPress={() => navigation.navigate("creerPlat")}>
                                        <Text style={modal.buttonText}>Ajouter Plat</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={modal.closeButton} onPress={() => navigation.navigate("creerIngredient")}>
                                        <Text style={modal.buttonText}>Ajouter Ingrédient</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            <TouchableOpacity onPress={() => navigation.navigate("Profil")} style={styles.button}>
                <FontAwesomeIcon icon={faUser} style={styles.icon} />
                <Text style={styles.label}>Profile</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        paddingBottom: 15,
        borderWidth: 1,
        paddingTop: 10,
    },
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        fontSize: 24,
        marginBottom: 5,
        color: "#555",
    },
    label: {
        fontSize: 12,
        color: "#555",
    },
    addButton: {
        backgroundColor: "#FF6F61",
        borderRadius: 25,
        width: 40,
        height: 40,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
});

const modal = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalText: {
        marginBottom: 20,
        textAlign: "center",
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        marginBottom: 10,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
    },
});
