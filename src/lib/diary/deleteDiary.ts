import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { Alert } from "react-native";

export default async function deleteDiary() {
    // * Get current user's uid
    const uid = auth().currentUser?.uid;
    if (!uid) return null;

    // * Store diary data to firestore
    await firestore()
        .collection("diary")
        .where("author", "==", uid)
        .get({
            source: "server",
        })
        .then((db) => db.docs.forEach((v) => v.ref.delete()));
}
