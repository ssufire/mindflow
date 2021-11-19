import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export default async function addDiaryBomb(diaryID, hour) {
    const uid = auth().currentUser.uid;
    if (!uid) return;

    await firestore()
        .collection("diary")
        .doc(diaryID)
        .update({
            explodedAt: new Date(Date.now() + hour * 60 * 60 * 1000),
        });
}
