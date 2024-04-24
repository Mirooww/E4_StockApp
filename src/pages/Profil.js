import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";

export default function Profil() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (auth.currentUser) {
                    const userRef = doc(db, "Users", auth.currentUser.uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        setUser(userSnap.data());
                    } else {
                        console.log("Aucun document correspondant à l'utilisateur connecté !");
                    }
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données de l'utilisateur: ", error);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            console.log("Vous avez été déconnecté.");
        } catch (error) {
            console.error("Erreur lors de la tentative de déconnexion: ", error);
        }
    };

    return (
        <View style={styles.container}>
            {user ? (
                <View style={styles.userInfoContainer}>
                    <View style={styles.nameContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.label}>Nom:</Text>
                            <Text style={styles.info}>{user.lastName}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.label}>Prénom:</Text>
                            <Text style={styles.info}>{user.firstName}</Text>
                        </View>
                    </View>
                    <View style={styles.emailContainer}>
                        <Text style={styles.label}>Email:</Text>
                        <Text style={[styles.info, { textAlign: "center" }]}>{user.email}</Text>
                    </View>
                    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                        <Text style={styles.logoutButtonText}>Se déconnecter</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text style={styles.noUserText}>Aucun utilisateur connecté.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    userInfoContainer: {
        width: "100%",
    },
    nameContainer: {
        flexDirection: "row",
        width: "100%",
    },
    emailContainer: {
        marginTop: 20,
        alignItems: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
        textAlign: "center",
    },
    info: {
        fontSize: 16,
        marginTop: 5,
        textAlign: "center",
    },
    logoutButton: {
        padding: 10,
        backgroundColor: "red",
        borderRadius: 5,
        marginTop: 80,
        borderWidth: 1,
    },
    logoutButtonText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    noUserText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
});
