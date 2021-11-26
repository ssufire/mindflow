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
                    count: number;
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
                    count: number;
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
                    count: 1,
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
                    count: 1,
                    emotionIntensitySum: emotionIntensity,
                });
            } else {
                foundEmotion.count += 1;
                foundEmotion.emotionIntensitySum += emotionIntensity;
            }
        }

        // * If there are no data for situation
        // * Set initial value here
        if (result.situation[situation] === undefined) {
            result.situation[situation] = [
                {
                    emotion,
                    count: 1,
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
                    count: 1,
                    emotionIntensitySum: emotionIntensity,
                });
            } else {
                foundSituation.count += 1;
                foundSituation.emotionIntensitySum += emotionIntensity;
            }
        }
    }

    for (const emotion in result.emotion) {
        let countAll = 0;
        result.emotion[emotion].forEach((v) => (countAll += v.count));

        // * Calculate emotionIntensity average
        result.emotion[emotion].forEach((v) => {
            v.emotionIntensityAvg = v.emotionIntensitySum / v.count;
            v.ratio = Math.round((v.count / countAll) * 100);
        });
        // * Sort emotionIntensity desc
        result.emotion[emotion].sort((a, b) => b.ratio - a.ratio);
    }

    for (const situation in result.situation) {
        let countAll = 0;
        result.situation[situation].forEach((v) => (countAll += v.count));

        // * Calculate emotionIntensity average
        result.situation[situation].forEach((v) => {
            v.emotionIntensityAvg = v.emotionIntensitySum / v.count;
            v.ratio = Math.round((v.count / countAll) * 100);
        });
        // * Sort emotionIntensity desc
        result.situation[situation].sort((a, b) => b.ratio - a.ratio);
    }

    console.log("getMajorEmotion", result);

    return result;
}
