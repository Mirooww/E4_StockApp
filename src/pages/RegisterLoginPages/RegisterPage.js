import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

import { useState } from "react";
import { auth, db } from "../../../firebaseConfig";

import { KeyboardAvoidingView, TextInput, View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [password, setPassword] = useState("");

    const handleSignup = async () => {
        if (email && password) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, "Users", userCredential.user.uid), {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                });
                console.log("Inscription réussie");
                await sendEmailVerification(userCredential.user);
                await signOut(auth);
                console.log("Déconnecté");
                navigation.navigate("Login");
            } catch (error) {
                console.log("Erreur lors de l'inscription :", error.message);
            }
        }
    };
    const navigation = useNavigation();

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.inputContainer}>
                <TextInput value={email} placeholder="Email" onChangeText={setEmail} style={styles.input} />
                <TextInput value={password} secureTextEntry placeholder="Mot de passe" onChangeText={setPassword} style={styles.input} />
                <TextInput value={lastName} placeholder="Nom" onChangeText={setLastName} style={styles.input} />
                <TextInput value={firstName} placeholder="Prenom" onChangeText={setFirstName} style={styles.input} />
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={handleSignup} title="S'enregistrer" />
                <Button title="Déja un compte ? S'inscrire" onPress={() => navigation.navigate("Login")} />
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        marginBottom: 10,
        padding: 10,
    },
    buttonContainer: {
        marginTop: 10,
    },
});
