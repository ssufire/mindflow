import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import moment from "moment";
import { getFlowEmotion } from "./getFlowEmotion";
import { getMajorEmotion } from "./getMajorEmotion";

export default async function getDiaryWeek() {
    // * Get current user's uid
    const uid = auth().currentUser?.uid;
    if (!uid) return null;

    const weekDate = new Date(
        moment().subtract(6, "days").format("YYYY-MM-DD")
    );

    const result = await firestore()
        .collection("diary")
        .where("author", "==", uid)
        .where("createdAt", ">=", weekDate)
        .orderBy("createdAt", "desc")
        .get({
            source: "server",
        })
        .then((v) => v.docs);

    console.log("getDiaryWeek", result);

    getMajorEmotion(result);
    getFlowEmotion(result);
}
