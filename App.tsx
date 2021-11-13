import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { initializeApp } from "firebase/app";

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
		<View style={styles.container}>
			<Text>Open up App.tsx to start working on your app!</Text>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
