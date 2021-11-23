import auth from "@react-native-firebase/auth";
import { appleAuth } from "@invertase/react-native-apple-authentication";

export default async function signInWithApple() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
        throw "Apple Sign-In failed - no identify token returned";
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
        identityToken,
        nonce
    );

    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);
}
