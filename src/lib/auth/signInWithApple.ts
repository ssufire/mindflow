import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import { Alert, Platform } from "react-native";
import { captureEvent, Severity } from "@sentry/react";
import { APPLE_SIGNIN_CLIENTID, APPLE_SIGNIN_REDIRECTURI } from "@env";
import {
    appleAuth,
    appleAuthAndroid,
} from "@invertase/react-native-apple-authentication";
import onAuthStateChanged from "./onAuthStateChanged";
import auth from "@react-native-firebase/auth";

export default async function signInWithApple(navigation) {
    // * Get idToken, nonce using AppleSignIn function
    const { idToken, nonce } =
        Platform.OS === "ios"
            ? await appleSignIniOS()
            : await appleSignInAndroid();

    // * Get Firebase credential
    const appleCredential = auth.AppleAuthProvider.credential(idToken, nonce);

    captureEvent({
        message: "appleCredential",
        extra: { appleCredential },
        level: Severity.Info,
    });

    // * Sign the user in with the credential
    auth()
        .signInWithCredential(appleCredential)
        .then((res) => onAuthStateChanged(res.user, navigation))
        .catch((error) => {
            console.error("Sign In With Apple Error", error);
            captureEvent({
                message: "[Apple] Auth Fail",
                extra: { error },
                level: Severity.Warning,
            });
            Alert.alert(
                "오류 발생",
                "로그인 중 오류가 발생했습니다. 다시 시도해주세요"
            );
        });
}

/**
 * @description iOS에서 Apple 로그인을 수행하여 firebase auth를 위한 idToken과 nonce를 반환합니다.
 * @returns {{idToken : string, nonce : string}}
 */
async function appleSignIniOS() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
        throw "Apple Sign-In failed - no identify token returned";
    }

    console.log("appleAuthRequestResponse", appleAuthRequestResponse);

    captureEvent({
        message: "appleAuthRequestResponse",
        extra: { appleAuthRequestResponse },
        level: Severity.Info,
    });

    return {
        idToken: appleAuthRequestResponse.identityToken,
        nonce: appleAuthRequestResponse.nonce,
    };
}

/**
 * @description Android에서 Apple 로그인을 수행하여 firebase auth를 위한 idToken과 nonce를 반환합니다.
 * @returns {{idToken : string, nonce : string}}
 */
async function appleSignInAndroid() {
    // Generate secure, random values for state and nonce
    const rawNonce = uuid();
    const state = uuid();

    // Configure the request
    appleAuthAndroid.configure({
        clientId: APPLE_SIGNIN_CLIENTID,
        redirectUri: APPLE_SIGNIN_REDIRECTURI,
        responseType: appleAuthAndroid.ResponseType.ALL,
        scope: appleAuthAndroid.Scope.ALL,
        nonce: rawNonce,
        state,
    });

    // Open the browser window for user sign in
    const response = await appleAuthAndroid.signIn();

    return {
        idToken: response.id_token,
        nonce: response.nonce,
    };
}
