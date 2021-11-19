import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export async function getSituationEmotion(
    diary: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[]
) {
    const result: {
        situation: {
            [situation: string]: [
                {
                    emotion: string;
                    emotionIntensityCount: number;
                    emotionIntensitySum: number;
                    emotionIntensityAvg?: number;
                }
            ];
        };
        emotion: {
            [emotion: string]: [
                {
                    situation: string;
                    situationCount: number;
                    emotionIntensityCount: number;
                    emotionIntensitySum: number;
                    emotionIntensityAvg?: number;
                }
            ];
        };
    } = {
        situation: {},
        emotion: {},
    };

    for (const data of diary) {
        const { emotion, emotionIntensity, situation } = data.data();

        if (result.emotion[emotion] === undefined) {
            result.emotion[emotion] = [
                {
                    situation,
                    situationCount: 1,
                    emotionIntensityCount: 1,
                    emotionIntensitySum: emotionIntensity,
                },
            ];
        } else {
            const foundEmotion = result.emotion[emotion].find(
                (v) => v.situation === situation
            );
            if (foundEmotion === undefined) {
                result.emotion[emotion].push({
                    situation,
                    situationCount: 1,
                    emotionIntensityCount: 1,
                    emotionIntensitySum: emotionIntensity,
                });
            } else {
                foundEmotion.emotionIntensityCount += 1;
                foundEmotion.emotionIntensitySum += emotionIntensity;
                foundEmotion.situationCount += 1;
            }
        }

        if (result.situation[situation] === undefined) {
            result.situation[situation] = [
                {
                    emotion,
                    emotionIntensityCount: 1,
                    emotionIntensitySum: emotionIntensity,
                },
            ];
        } else {
            const foundSituation = result.situation[situation].find(
                (v) => v.emotion === emotion
            );
            if (foundSituation === undefined) {
                result.situation[situation].push({
                    emotion,
                    emotionIntensityCount: 1,
                    emotionIntensitySum: emotionIntensity,
                });
            } else {
                foundSituation.emotionIntensityCount += 1;
                foundSituation.emotionIntensitySum += emotionIntensity;
            }
        }
    }

    for (const emotion in result.emotion) {
        result.emotion[emotion].forEach(
            (v) =>
                (v.emotionIntensityAvg =
                    v.emotionIntensitySum / v.emotionIntensityCount)
        );
        result.emotion[emotion].sort(
            (a, b) => b.emotionIntensityAvg - a.emotionIntensityAvg
        );
    }

    for (const situation in result.situation) {
        result.situation[situation].forEach(
            (v) =>
                (v.emotionIntensityAvg =
                    v.emotionIntensitySum / v.emotionIntensityCount)
        );
        result.situation[situation].sort(
            (a, b) => b.emotionIntensityAvg - a.emotionIntensityAvg
        );
    }

    console.log("getMajorEmotion", result);

    return result;
}
