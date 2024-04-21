import React from "react";
import { View, StyleSheet } from "react-native-web";

import useAuth from "./hooks/useAuth";

import LoginPage from "./src/pages/RegisterLoginPages/LoginPage";
import RegisterPage from "./src/pages/RegisterLoginPages/RegisterPage";
import MainPage from "./src/pages/MainPage";

import Header from "./src/pages/layout/Header";
import Footer from "./src/pages/layout/Footer";

import Profil from "./src/pages/Profil";

import Categorie from "./src/pages/Informations/Categorie";
import Plat from "./src/pages/Informations/Plat";
import Ingredient from "./src/pages/Informations/Ingredient";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

export default function App() {
    const { user } = useAuth();

    const Stack = createStackNavigator();

    if (!user || !user.emailVerified) {
        return (
            <>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Login">
                        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
                        <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
                    </Stack.Navigator>
                </NavigationContainer>
            </>
        );
    } else {
        return (
            <NavigationContainer>
                <Header />
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={MainPage} options={{ headerShown: false }} />
                    <Stack.Screen name="Profil" component={Profil} options={{ headerShown: false }} />
                    <Stack.Screen name="Categorie" component={Categorie} options={{ headerShown: false }} />
                    <Stack.Screen name="Plat" component={Plat} options={{ headerShown: false }} />
                    <Stack.Screen name="Ingredient" component={Ingredient} options={{ headerShown: false }} />
                </Stack.Navigator>
                <Footer />
            </NavigationContainer>
        );
    }
}
