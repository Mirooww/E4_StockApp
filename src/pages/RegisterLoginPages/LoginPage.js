import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../firebaseConfig";
import { KeyboardAvoidingView, TextInput, TouchableOpacity, View, Text, Button, StyleSheet } from "react-native-web";
import { useNavigation } from "@react-navigation/native";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        if (email && password) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                console.log("Log");
            } catch (error) {
                console.log(error.message, "erreur:  ");
            }
        }
    };
    const navigation = useNavigation();

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.inputContainer}>
                <TextInput value={email} placeholder="Email" onChangeText={setEmail} style={styles.input} />
                <TextInput value={password} secureTextEntry placeholder="Mot de passe" onChangeText={setPassword} style={styles.input} />
            </View>
            <View style={styles.buttonContainer}>
                <Button onPress={handleLogin} title="Se connecter" />
                <Button title="Pas de compte ? S'inscrire" onPress={() => navigation.navigate("Register")} />
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
