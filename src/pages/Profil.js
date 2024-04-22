import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { TouchableOpacity } from "react-native-gesture-handler";
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
      <View>
         {user ? (
            <View>
               <Text>Nom: {user.lastName}</Text>
               <Text>Prénom: {user.firstName}</Text>
               <Text>Email: {user.email}</Text>
               <TouchableOpacity onPress={handleLogout} style={styles.deleteButton}>
                  <Text style={styles.deleteButtonText}>Se déconnecter</Text>
               </TouchableOpacity>
            </View>
         ) : (
            <Text>Aucun utilisateur connecté.</Text>
         )}
      </View>
   );
}
const styles = StyleSheet.create({
   deleteButton: {
      padding: 10,
      backgroundColor: "red",
      borderRadius: 5,
      marginTop: 5,
      alignSelf: "flex-end", // Ajoutez ceci pour aligner le bouton à droite
   },
   deleteButtonText: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
   },
});
