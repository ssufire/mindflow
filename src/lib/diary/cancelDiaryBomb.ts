import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default async function cancelDiaryBomb(diaryID) {
    const uid = auth().currentUser.uid;
    if (!uid) return;

    await firestore()
        .collection("diary")
        .doc(diaryID)
        .update({ explodedAt: null });
}
