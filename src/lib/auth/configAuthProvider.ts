import { GOOGLE_WEB_CLIENT_ID } from "@env";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function configAuthProvider() {
    GoogleSignin.configure({
        webClientId: GOOGLE_WEB_CLIENT_ID,
    });
}
