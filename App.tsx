import React, { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/screen/Routes";

// @ts-ignore
import {
	FIREBASE_APIKEY,
	FIREBASE_AUTHDOMAIN,
	FIREBASE_PROJECTID,
	FIREBASE_STORAGEBUCKET,
	FIREBASE_MESSAGINGSENDERID,
	FIREBASE_APPID,
	FIREBASE_MEASUREMENTID,
} from "react-native-dotenv";

export default function App() {
	useEffect(() => {
		// Initialize Firebase App
		initializeApp({
			apiKey: FIREBASE_APIKEY,
			authDomain: FIREBASE_AUTHDOMAIN,
			projectId: FIREBASE_PROJECTID,
			storageBucket: FIREBASE_STORAGEBUCKET,
			messagingSenderId: FIREBASE_MESSAGINGSENDERID,
			appId: FIREBASE_APPID,
			measurementId: FIREBASE_MEASUREMENTID,
		});
	}, []);

	return (
		<NativeBaseProvider>
			<NavigationContainer>
				<Routes />
			</NavigationContainer>
		</NativeBaseProvider>
	);
}
