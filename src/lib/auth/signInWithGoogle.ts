import {
    GoogleSignin,
    statusCodes,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import onAuthStateChanged from "./onAuthStateChanged";
import { captureEvent, Severity } from "@sentry/react";

export default async function signInWithGoogle(navigation) {
    try {
        await GoogleSignin.hasPlayServices();

        // * Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // * Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // * Sign-in the user with the credential
        return auth()
            .signInWithCredential(googleCredential)
            .then((res) => onAuthStateChanged(res.user, navigation))
            .catch((error) => {
                console.error("Sign In With Google Error", error);
                captureEvent({
                    message: "[Apple] Auth Fail",
                    extra: { error },
                    level: Severity.Warning,
                });
            });
    } catch (error) {
        console.log("error", error);

        const err = error as any;
        const code = err?.code;

        switch (code) {
            case statusCodes.SIGN_IN_CANCELLED:
                console.log("Sign in cancelled");
                break;

            case statusCodes.IN_PROGRESS:
                console.log("In Progress");
                break;

            case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                console.log("play service not available");
                break;

            default:
                console.log("other issue");
                break;
        }
    }
}
