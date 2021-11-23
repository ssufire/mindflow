import React from "react";
import { Dimensions, View } from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import signInWithGoogle from "../lib/auth/signInWithGoogle";

import { AppleButton } from "@invertase/react-native-apple-authentication";
import signInWithApple from "../lib/auth/signInWithApple";

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
            <AppleButton
                buttonStyle={AppleButton.Style.WHITE}
                buttonType={AppleButton.Type.CONTINUE}
                style={{ width: 250, height: 45, marginTop: 30 }}
                onPress={signInWithApple}
            />
        </View>
    );
}
