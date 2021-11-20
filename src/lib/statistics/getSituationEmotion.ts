import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export async function getSituationEmotion(
    diary: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[]
) {
    const situationAcc: EmotionBySituationAcc = {};
    const emotionAcc: SituationByEmotionAcc = {};

    for (const data of diary) {
        const {
            situation,
            emotionIntensity,
            emotion: emotionString,
        } = data.data();

        // * Explicitly convert emotionString to Upper Case
        // * To prevent unexpected error
        const emotion = emotionString.toUpperCase();

        // * If there are no data for current emotion or situation in emotionAcc,
        // * Then set initial value here
        if (!emotionAcc[emotion]) emotionAcc[emotion] = {};
        if (!emotionAcc[emotion][situation]) {
            emotionAcc[emotion][situation] = 0;
        }

        // * If there are no data for current situation or emotion in situationAcc,
        // * Then set initial value here
        if (!situationAcc[situation]) situationAcc[situation] = {};
        if (!situationAcc[situation][emotion]) {
            situationAcc[situation][emotion] = {
                count: 0,
                intensity: 0,
            };
        }

        // * To shorten the code, parse prevSituationAcc value
        const { count: prevCount, intensity: prevIntensity } =
            situationAcc[situation][emotion];

        // * Add data to emotionAcc, situationAcc
        emotionAcc[emotion][situation] += 1;
        situationAcc[situation][emotion] = {
            count: prevCount + 1,
            intensity: prevIntensity + emotionIntensity,
        };
    }

    const emotionOrdered: SituationByEmotionOrdered = {};
    const situationOrdered: EmotionBySituationOrdered = {};

    // * Convert emotionAcc to SitautionByEmotionOrdered Type
    for (const emotion in emotionAcc) {
        emotionOrdered[emotion] = Object.keys(emotionAcc[emotion])
            .map((situation) => ({
                situation,
                count: emotionAcc[emotion][situation],
            }))
            .sort((a, b) => b.count - a.count);
    }

    // * Convert situationAcc to EmotionBySituationOrdered Type
    for (const situation in situationAcc) {
        situationOrdered[situation] = Object.keys(situationAcc[situation])
            .map((emotion) => {
                const { count, intensity } = situationAcc[situation][emotion];
                return {
                    emotion,
                    emotionIntensity: intensity / count,
                };
            })
            .sort((a, b) => b.emotionIntensity - a.emotionIntensity);
    }

    return {
        situationByEmotion: situationOrdered,
        emotionBySituation: emotionOrdered,
    };
}

/**
 * @description 감정별 상황의 표출 횟수를 정리한 상태의 타입을 나타냅니다.
 */
interface SituationByEmotionAcc {
    [emotion: string]: {
        [situation: string]: number;
    };
}

/**
 * @description 상황별 감정을 감정의 표출횟수, 강도의 합으로 정리한 상태의 타입을 나타냅니다.
 */
interface EmotionBySituationAcc {
    [situation: string]: {
        [emotion: string]: {
            count: number;
            intensity: number;
        };
    };
}

/**
 * @description 감정별 상황을 상황의 빈도에 따라 정렬을 완료한 상태의 타입을 나타냅니다.
 */
interface SituationByEmotionOrdered {
    [emotion: string]: { situation: string; count: number }[];
}

/**
 * @description 상황별 감정을 감정의 평균 강도에 따라 정렬을 완료한 상태의 타입을 나타냅니다.
 */
interface EmotionBySituationOrdered {
    [situation: string]: { emotion: string; emotionIntensity: number }[];
}
