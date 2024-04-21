import React from "react";
import { View, StyleSheet } from "react-native-web";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import useAuth from "./hooks/useAuth";

import LoginPage from "./src/pages/RegisterLoginPages/LoginPage";
import RegisterPage from "./src/pages/RegisterLoginPages/RegisterPage";
import MainPage from "./src/pages/MainPage";

import Header from "./src/pages/layout/Header";
import Footer from "./src/pages/layout/Footer";

import Profil from "./src/pages/Profil";

import GetCategorie from "./src/pages/Afficher/GetCategorie";
import GetIngredient from "./src/pages/Afficher/GetIngredient";

import CreateCategorie from "./src/pages/Ajouter/CreateRegion";
import CreatePlat from "./src/pages/Ajouter/CreatePlat";
import CreateIngredient from "./src/pages/Ajouter/CreateIngredient";

import EditPlat from "./src/pages/Edit/EditPlat";
import EditRegion from "./src/pages/Edit/EditRegion";
import EditIngredient from "./src/pages/Edit/EditIngredient";

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
                    {/* GET */}
                    <Stack.Screen name="GetRegion" component={GetCategorie} options={{ headerShown: false }} />
                    <Stack.Screen name="GetIngredient" component={GetIngredient} options={{ headerShown: false }} />
                    {/* CREATE */}
                    <Stack.Screen name="CreateRegion" component={CreateCategorie} options={{ headerShown: false }} />
                    <Stack.Screen name="CreatePlat" component={CreatePlat} options={{ headerShown: false }} />
                    <Stack.Screen name="CreateIngredient" component={CreateIngredient} options={{ headerShown: false }} />
                    {/* EDIT */}
                    <Stack.Screen name="EditPlat" component={EditPlat} options={{ headerShown: false }} />
                    <Stack.Screen name="EditRegion" component={EditRegion} options={{ headerShown: false }} />
                    <Stack.Screen name="EditIngredient" component={EditIngredient} options={{ headerShown: false }} />
                </Stack.Navigator>
                <Footer />
            </NavigationContainer>
        );
    }
}
