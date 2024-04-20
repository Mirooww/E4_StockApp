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
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
               <FontAwesomeIcon icon={faHouse} style={styles.categ} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Profil")}>
               <FontAwesomeIcon icon={faMagnifyingGlass} style={styles.categ} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Profil")}>
               <FontAwesomeIcon icon={faPlus} style={styles.categ} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Profil")}>
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
   },
   categ: {
      borderWidth: 1,
      borderColor: "ddd",
      width: 35,
      height: 35,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
});
