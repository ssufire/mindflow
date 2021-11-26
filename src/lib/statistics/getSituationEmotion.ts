import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export async function getSituationEmotion(
    diary: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[]
) {
    const result: {
        /**
         * 상황별 감정 강도
         */
        situation: {
            [situation: string]: [
                /**
                 * emotionIntensityAvg 내림차순
                 */
                {
                    emotion: string;
                    emotionIntensityCount: number;
                    emotionIntensitySum: number;
                    emotionIntensityAvg?: number;
                    ratio?: number;
                }
            ];
        };
        /**
         * 감정에 따른 상황
         */
        emotion: {
            [emotion: string]: [
                /**
                 * emotionIntensityAvg 내림차순
                 */
                {
                    situation: string;
                    situationCount: number;
                    emotionIntensityCount: number;
                    emotionIntensitySum: number;
                    emotionIntensityAvg?: number;
                    ratio?: number;
                }
            ];
        };
    } = {
        situation: {},
        emotion: {},
    };

    for (const data of diary) {
        const { emotion, emotionIntensity, situation } = data.data();

        // * If there are no data for emotion
        // * Set initial value here
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
            // * If there are no data for situation in emotion
            // * Set initial value here
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

        // * If there are no data for situation
        // * Set initial value here
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
            // * If there are no data for emotion in situation
            // * Set initial value here
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
        // * Calculate emotionIntensity average
        result.emotion[emotion].forEach((v) => {
            v.emotionIntensityAvg =
                v.emotionIntensitySum / v.emotionIntensityCount;
        });
        // * Sort emotionIntensity desc
        result.emotion[emotion].sort(
            (a, b) => b.emotionIntensityAvg - a.emotionIntensityAvg
        );
    }

    for (const situation in result.situation) {
        let emotionIntensitySumAll = 0;
        result.situation[situation].forEach(
            (v) => (emotionIntensitySumAll += v.emotionIntensitySum)
        );

        // * Calculate emotionIntensity average
        result.situation[situation].forEach((v) => {
            v.emotionIntensityAvg =
                v.emotionIntensitySum / v.emotionIntensityCount;
            v.ratio = Math.round(
                (v.emotionIntensitySum / emotionIntensitySumAll) * 100
            );
        });
        // * Sort emotionIntensity desc
        result.situation[situation].sort((a, b) => b.ratio - a.ratio);
    }

    console.log("getMajorEmotion", result);

    return result;
}
