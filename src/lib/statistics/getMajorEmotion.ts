import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

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
