import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	createStackNavigator,
	StackNavigationOptions,
	TransitionPresets,
} from "@react-navigation/stack";
import { Alert } from "react-native";
import Timeline from "./Timeline";
import SignIn from "./SignIn";

import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GOOGLE_WEB_CLIENT_ID } from "@env";

import setMyProfile from "../lib/profile/setMyProfile";

export default function Routes() {
	const navigation = useNavigation();

	useEffect(() => {
		GoogleSignin.configure({
			webClientId: GOOGLE_WEB_CLIENT_ID,
		});

		const subscribe = auth().onAuthStateChanged((user) => {
			if (user) {
				setMyProfile()
					.then(() =>
						navigation.reset({ routes: [{ name: "timeline" }] })
					)
					.catch((error) => {
						console.log(error);
						Alert.alert(
							"오류 발생",
							"오류가 발생했습니다. 다시 시도해주세요"
						);
					});
			}
		});

		return () => {
			if (subscribe) subscribe();
		};
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
