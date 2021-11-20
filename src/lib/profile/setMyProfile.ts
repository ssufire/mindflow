import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default async function setMyProfile() {
    // * Get current user's uid
    const uid = auth().currentUser?.uid;
    if (!uid) return;

    // * Check user data exists on firestore
    const userProfile = await firestore().collection("user").doc(uid);
    const dataExist = (await (await userProfile.get()).data()) !== undefined;

    // * If user data not exist, then set the profile data
    if (!dataExist) {
        await userProfile.set({ nickname: auth().currentUser.displayName });
    }
}
