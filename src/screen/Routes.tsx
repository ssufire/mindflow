import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import {
    createStackNavigator,
    StackNavigationOptions,
    TransitionPresets,
} from "@react-navigation/stack";
import Statistics from "./Statistics";
import Timeline from "./Timeline";
import Welcome from "./Welcome";
import SignIn from "./SignIn";

import onAuthStateChanged from "../lib/auth/onAuthStateChanged";
import configAuthProvider from "../lib/auth/configAuthProvider";

export default function Routes() {
    const subscribe = useRef(null);
    const navigation = useNavigation();

    useEffect(() => {
        configAuthProvider();
        if (!subscribe.current)
            subscribe.current = onAuthStateChanged(navigation);

        return () => {
            if (subscribe.current) subscribe.current();
        };
    }, []);

    // * Create Stack Navigator and related options
    const Stack = createStackNavigator();
    const TransitionScreenOptions = { ...TransitionPresets.SlideFromRightIOS };
    const screenOption: StackNavigationOptions = { headerShown: false };

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
                name="welcome"
                component={Welcome}
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
