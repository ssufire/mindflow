import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	createStackNavigator,
	StackNavigationOptions,
	TransitionPresets,
} from "@react-navigation/stack";
import Timeline from "./Timeline";
import SignIn from "./SignIn";

import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GOOGLE_WEB_CLIENT_ID } from "@env";

export default function Routes() {
	const navigation = useNavigation();

	useEffect(() => {
		GoogleSignin.configure({
			webClientId: GOOGLE_WEB_CLIENT_ID,
		});

		auth().onAuthStateChanged((user) => {
			if (user) {
				navigation.reset({ routes: [{ name: "timeline" }] });
			}
		});
	}, []);

	// Create StackNavigator
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
		</Stack.Navigator>
	);
}
