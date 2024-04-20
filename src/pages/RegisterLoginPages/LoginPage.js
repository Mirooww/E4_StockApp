import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../firebaseConfig";

import {
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Button,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        if (user.emailVerified) {
          console.log("Log");
          navigation.navigate("Home");
        } else {
          setError("Veuillez vérifier votre email");
        }
      } catch (error) {
        setError(error.message, "erreur:  ");
      }
    }
  };

  const handlePasswordReset = async () => {
    if (email) {
        try {
            await sendPasswordResetEmail(auth, email);
            setError("Un lien de réinitialisation du mot de passe a été envoyé à votre adresse e-mail.");
        } catch (error) {
            setError("Erreur lors de l'envoi de l'e-mail de réinitialisation du mot de passe.");
        }
    } else {
        setError("Veuillez entrer votre adresse e-mail.");
    }
};
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          placeholder="Email"
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          value={password}
          secureTextEntry
          placeholder="Mot de passe"
          onChangeText={setPassword}
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={handlePasswordReset}>
                <Text style={styles.resetPasswordText}>Mot de passe oublié ?</Text>
            </TouchableOpacity>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <View style={styles.buttonContainer}>
        <Button onPress={handleLogin} title="Se connecter" />
        <Button
          title="Pas de compte ? S'inscrire"
          onPress={() => navigation.navigate("Register")}
        />
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
    errorText: {
        color: "red",
        textAlign: "center",
    },
    resetPasswordText: {
        color: '#007bff', 
        marginTop: 10,
        textAlign: 'center',
    },
});
