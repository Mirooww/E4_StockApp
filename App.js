import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import useAuth from "./hooks/useAuth";

import LoginPage from "./src/pages/RegisterLoginPages/LoginPage";
import RegisterPage from "./src/pages/RegisterLoginPages/RegisterPage";
import MainPage from "./src/pages/MainPage";

import Header from "./src/pages/layout/Header";
import Footer from "./src/pages/layout/Footer";
import PlatDetails from "./src/pages/Afficher/PlatDetails";
import Ingredient from "./src/pages/Afficher/Ingredient";
import Region from "./src/pages/Afficher/Region";
import AjouterPlat from "./src/pages/Creer/CreerPlat";
import EditerPlat from "./src/pages/Editer/EditerPlat";
import EditIngredient from "./src/pages/Editer/EditerIngredient";
import EditRegion from "./src/pages/Editer/EditerRegion";
import CreateCategorie from "./src/pages/Creer/CreerRegion";
import CreateIngredient from "./src/pages/Creer/CreerIngredient";
import Profil from "./src/pages/Profil";

const Stack = createStackNavigator();

export default function App() {
    const { user } = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <NavigationContainer>
                {user && user.emailVerified ? (
                    <>
                        <View style={styles.header}>
                            <Header />
                        </View>
                        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="Home" component={MainPage} />
                            <Stack.Screen name="Profil" component={Profil} />

                            <Stack.Screen name="PlatDetails" component={PlatDetails} />

                            <Stack.Screen name="Ingredients" component={Ingredient} />
                            <Stack.Screen name="Regions" component={Region} />

                            <Stack.Screen name="creerPlat" component={AjouterPlat} />
                            <Stack.Screen name="creerRegion" component={CreateCategorie} />
                            <Stack.Screen name="creerIngredient" component={CreateIngredient} />

                            <Stack.Screen name="editerPlat" component={EditerPlat} />
                            <Stack.Screen name="editerIngredient" component={EditIngredient} />
                            <Stack.Screen name="editerRegion" component={EditRegion} />
                        </Stack.Navigator>
                        <View style={styles.footer}>
                            <Footer />
                        </View>
                    </>
                ) : (
                    <Stack.Navigator initialRouteName="Login">
                        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
                        <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
                    </Stack.Navigator>
                )}
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff", // Couleur de fond de l'application
    },
    header: {
        height: 150,
    },
    footer: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "red", // Couleur pour visualiser le Footer
    },
});
