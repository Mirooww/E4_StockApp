import { View, Text } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../../firebaseConfig";
export default function Profil() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // Vérifiez si un utilisateur est connecté
                if (auth.currentUser) {
                    const userRef = doc(db, "Users", auth.currentUser.uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        // Définissez les données de l'utilisateur dans l'état local
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

    // Affichez les informations de l'utilisateur connecté
    return (
        <View>
            {user ? (
                <View>
                    <Text>Nom: {user.lastName}</Text>
                    <Text>Prénom: {user.firstName}</Text>
                    <Text>Email: {user.email}</Text>
                </View>
            ) : (
                <Text>Aucun utilisateur connecté.</Text>
            )}
        </View>
    );
}
