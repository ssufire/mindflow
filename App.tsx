import React from "react";
import Routes from "./src/screen/Routes";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";

const App = () => {
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <ActionSheetProvider>
                    <Routes />
                </ActionSheetProvider>
            </NavigationContainer>
        </NativeBaseProvider>
    );
};

export default App;
