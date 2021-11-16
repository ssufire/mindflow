import React, { useEffect } from "react";
import { Alert, SafeAreaView, Text, View } from "react-native";
import {
	GoogleSignin,
	GoogleSigninButton,
} from "@react-native-google-signin/google-signin";
import signInWithGoogle from "./src/lib/auth/signInWithGoogle";
import auth from "@react-native-firebase/auth";
import { GOOGLE_WEB_CLIENT_ID } from "@env";

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
		<SafeAreaView>
			<View>
				<Text>테스으으으으으으</Text>
				<GoogleSigninButton onPress={signInWithGoogle} />
			</View>
		</SafeAreaView>
	);
};

export default App;
