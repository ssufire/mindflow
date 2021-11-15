import React, { useEffect } from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GOOGLE_WEB_CLIENT_ID } from "@env";
import auth from "@react-native-firebase/auth";
import Routes from "./src/screen/Routes";

export default function App() {
	useEffect(() => {
		GoogleSignin.configure({
			webClientId: GOOGLE_WEB_CLIENT_ID,
		});

		auth().onAuthStateChanged((user) => {
			if (user) {
				console.log("Signed In", user);
			} else {
				console.log("Signed Out");
			}
		});
	});

	return (
		<NativeBaseProvider>
			<NavigationContainer>
				<Routes />
			</NavigationContainer>
		</NativeBaseProvider>
	);
}
