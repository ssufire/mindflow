import {
	GoogleSignin,
	statusCodes,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

export default async function signInWithGoogle() {
	try {
		await GoogleSignin.hasPlayServices();

		// * Get the users ID token
		const { idToken } = await GoogleSignin.signIn();

		// * Create a Google credential with the token
		const googleCredential = auth.GoogleAuthProvider.credential(idToken);

		// * Sign-in the user with the credential
		return auth().signInWithCredential(googleCredential);
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
