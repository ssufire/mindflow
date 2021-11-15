import React from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/screen/Routes";

export default function App() {
	return (
		<NativeBaseProvider>
			<NavigationContainer>
				<Routes />
			</NavigationContainer>
		</NativeBaseProvider>
	);
}
