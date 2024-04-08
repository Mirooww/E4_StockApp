import { View, Text, StyleSheet, Vie } from "react-native";
import React from "react";

export default function Header() {
   return (
      <View>
         <Text style={styles.topBar}>NEXUM</Text>
         <View style={styles.categContainer}>
            <Text style={styles.categ}>Catégorie</Text>
            <Text style={styles.categ}>Plat</Text>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   topBar: {
      height: "50px",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: "#ddd",
   },
   categContainer: {
      width: "100%",
      height: "50px",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
   },
   categ: {
      fontSize: "20px",
      width: "90px",
      textAlign: "center",
   },
});
