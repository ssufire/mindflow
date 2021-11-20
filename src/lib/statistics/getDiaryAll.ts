import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { getSituationEmotion } from "./getSituationEmotion";

export default async function getDiaryAll() {
    // * Get current user's uid
    const uid = auth().currentUser?.uid;
    if (!uid) return null;

    const result = await firestore()
        .collection("diary")
        .where("author", "==", uid)
        .orderBy("createdAt", "desc")
        .get()
        .then((v) => v.docs);

    return getSituationEmotion(result);
}
