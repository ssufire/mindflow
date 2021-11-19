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
        emotionIntensity[result["emotion"]] += result["emotionIntensity"];
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

    return { major, emotionIntensity: emotionIntensity[major] };
}

export async function getFlowEmotion(
    diary: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[]
) {
    const emotionFlow = {};

    for (const data of diary) {
        const result = data.data();
        const createdAt: Date = result["createdAt"].toDate();
        const YYYYMMDD = moment(createdAt).format("YYYY-MM-DD");

        if (emotionFlow[YYYYMMDD] === undefined) {
            emotionFlow[YYYYMMDD] = {};
        }

        if (emotionFlow[YYYYMMDD][result["emotion"]] === undefined) {
            emotionFlow[YYYYMMDD][result["emotion"]] = 0;
        }

        emotionFlow[YYYYMMDD][result["emotion"]] += result["emotionIntensity"];
    }

    for (const YYYYMMDD in emotionFlow) {
        let major = null;

        for (const emotion in emotionFlow[YYYYMMDD]) {
            if (major === null) {
                major = emotion;
                continue;
            }

            if (emotionFlow[YYYYMMDD][major] < emotionFlow[YYYYMMDD][emotion]) {
                major = emotion;
            }
        }

        emotionFlow[YYYYMMDD]["_major"] = {
            emotion: major,
            emotionIntensity: emotionFlow[YYYYMMDD][major],
        };
    }

    console.log("일주일동안 이런 감정 흐름을 보였어요", emotionFlow);

    return emotionFlow;
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
    getFlowEmotion(result);
}
