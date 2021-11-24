import React from "react";
import { Box, Text } from "native-base";
import {
    Dimensions,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import ScreenBackgroundTexture from "../component/texture/ScreenBackgroundTexture";
import signInWithGoogle from "../lib/auth/signInWithGoogle";
import signInWithApple from "../lib/auth/signInWithApple";

//@ts-ignore
import GoogleSignIn from "../asset/signin/GoogleSignIn.svg";
//@ts-ignore
import AppleSignIn from "../asset/signin/AppleSignIn.svg";

export default function SignIn() {
    const style = StyleSheet.create({
        buttonStyle: {
            opacity: 0.89,
            width: Dimensions.get("screen").width * 0.87,
            height: Dimensions.get("screen").width * 0.17,
        },
    });

    return (
        <ScreenBackgroundTexture>
            <SafeAreaView style={{ flex: 1 }}>
                <Box flex="1" py="10" px="5" justifyContent="center">
                    <Text
                        fontFamily="heading"
                        fontWeight="600"
                        fontSize="2xl"
                        opacity="0.7"
                    >
                        안녕하세요
                    </Text>
                    <Text fontSize="xl" my="2" opacity="0.7">
                        마음흐름을 다음의 계정으로{"\n"}시작해보세요
                    </Text>
                    <Box marginTop="10">
                        <TouchableOpacity onPress={signInWithGoogle}>
                            <GoogleSignIn style={style.buttonStyle} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={signInWithApple}>
                            <AppleSignIn style={style.buttonStyle} />
                        </TouchableOpacity>
                    </Box>
                </Box>
            </SafeAreaView>
        </ScreenBackgroundTexture>
    );
}
