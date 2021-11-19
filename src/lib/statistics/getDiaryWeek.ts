import auth from "@react-native-firebase/auth";
import firestore, {
    FirebaseFirestoreTypes,
} from "@react-native-firebase/firestore";
import moment from "moment";

export async function getMajorEmotion(
    diary: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[]
) {
    const emotionIntensity = {};

    for (const data of diary) {
        const result = data.data();
        if (emotionIntensity[result["emotion"]] === undefined) {
            emotionIntensity[result["emotion"]] = 0;
        }
        emotionIntensity[result["emotion"]] = result["emotionIntensity"];
        // console.log("getMajorEmotion", result.data());
    }

    let major = null;
    for (const emotion in emotionIntensity) {
        if (major === null) {
            major = emotion;
            continue;
        }

        if (emotionIntensity[major] < emotionIntensity[emotion]) {
            major = emotion;
        }
    }

    console.log("getMajorEmotion", emotionIntensity);
    console.log(`일주일동안 ${major}한 주간이였어요`);
}

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
}
