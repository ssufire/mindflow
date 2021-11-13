import React from "react";
import {
	createStackNavigator,
	StackNavigationOptions,
	TransitionPresets,
} from "@react-navigation/stack";
import Timeline from "./Timeline";

export default function Routes() {
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
				name="timeline"
				component={Timeline}
				options={screenOption}
			/>
		</Stack.Navigator>
	);
}
