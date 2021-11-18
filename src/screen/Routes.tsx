import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
    createStackNavigator,
    StackNavigationOptions,
    TransitionPresets,
} from "@react-navigation/stack";
import Statistics from "./Statistics";
import Timeline from "./Timeline";
import SignIn from "./SignIn";

import onAuthStateChanged from "../lib/auth/onAuthStateChanged";
import configAuthProvider from "../lib/auth/configAuthProvider";

export default function Routes() {
    const navigation = useNavigation();

    useEffect(() => {
        configAuthProvider();
        const subscribe = onAuthStateChanged(navigation);

        return () => {
            if (subscribe) subscribe();
        };
    }, []);

    // * Create StackNavigator
    const Stack = createStackNavigator();

    const TransitionScreenOptions = {
        ...TransitionPresets.SlideFromRightIOS, // This is where the transition happens
    };

    const screenOption: StackNavigationOptions = {
        headerShown: false,
    };

    // <--------------------DIVIDER-------------------------->

    return (
        <Stack.Navigator screenOptions={TransitionScreenOptions}>
            <Stack.Screen
                name="signin"
                component={SignIn}
                options={screenOption}
            />
            <Stack.Screen
                name="timeline"
                component={Timeline}
                options={screenOption}
            />
            <Stack.Screen
                name="statistics"
                component={Statistics}
                options={screenOption}
            />
        </Stack.Navigator>
    );
}
