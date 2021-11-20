import React from "react";
import Routes from "./src/screen/Routes";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { Provider } from "react-redux";
import store from "./src/redux/store";

const App = () => {
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <ActionSheetProvider>
                    <Provider store={store}>
                        <Routes />
                    </Provider>
                </ActionSheetProvider>
            </NavigationContainer>
        </NativeBaseProvider>
    );
};

export default App;
