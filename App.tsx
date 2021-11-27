import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Platform } from "react-native";
import * as Sentry from "@sentry/react-native";
import { extendTheme, NativeBaseProvider } from "native-base";
import { CODEPUSH_PROD_ANDROID, CODEPUSH_PROD_IOS, SENTRY_DSN } from "@env";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { NavigationContainer } from "@react-navigation/native";
import codePush from "react-native-code-push";
import Routes from "./src/screen/Routes";
import store from "./src/redux/store";

const theme = extendTheme({
    fonts: {
        heading: "GowunBatang-Bold",
        body: "GowunBatang-Regular",
    },
});

const App = () => {
    Sentry.init({
        dsn: SENTRY_DSN,
        // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
        // We recommend adjusting this value in production.
        tracesSampleRate: 1.0,
    });

    useEffect(() => {
        codePush.sync({
            deploymentKey:
                Platform.OS === "android"
                    ? CODEPUSH_PROD_ANDROID
                    : CODEPUSH_PROD_IOS,
            installMode: codePush.InstallMode.IMMEDIATE,
        });
    }, []);

    return (
        <NativeBaseProvider theme={theme}>
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

export default Sentry.wrap(App);
