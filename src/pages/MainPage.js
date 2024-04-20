import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { auth } from "../../firebaseConfig";
import React from "react";
import { signOut } from "firebase/auth";

export default function MainPage() {
    const Logout = async () => {
        await signOut(auth);
        console.log("Déconnecté");
    };

    return (
        <View style={styles.content}>
            <Text>Bienvenue</Text>
            <TouchableOpacity onPress={Logout}>
                <Text>Se déconnecter</Text>
            </TouchableOpacity>
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
});
