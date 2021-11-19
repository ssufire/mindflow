import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import moment from "moment";

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
