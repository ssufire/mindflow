import React from "react";
import { Dimensions, View } from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import signInWithGoogle from "../lib/auth/signInWithGoogle";

export default function SignIn() {
	const { width, height } = Dimensions.get("screen");

	return (
		<View
			style={{
				width,
				height,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<GoogleSigninButton onPress={signInWithGoogle} />
		</View>
	);
}
