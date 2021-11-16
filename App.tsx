import React, { useEffect } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import {
	GoogleSignin,
	GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import signInWithGoogle from "./src/lib/auth/signInWithGoogle";
import auth from "@react-native-firebase/auth";
import { GOOGLE_WEB_CLIENT_ID } from "@env";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/screen/Routes";

const App = () => {
	useEffect(() => {
		GoogleSignin.configure({
			webClientId: GOOGLE_WEB_CLIENT_ID,
		});

		auth().onAuthStateChanged((user) => {
			if (user) {
				console.log("Signed In", user);
				Alert.alert("Signed In", `${JSON.stringify(user)}`);
			} else {
				console.log("No User Info");
			}
		});
	}, []);

	return (
		<NavigationContainer>
			<Routes />
		</NavigationContainer>
	);
};

export default App;
