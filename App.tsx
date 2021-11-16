import React from "react";
import Routes from "./src/screen/Routes";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
	return (
		<NativeBaseProvider>
			<NavigationContainer>
				<Routes />
			</NavigationContainer>
		</NativeBaseProvider>
	);
};

export default App;
