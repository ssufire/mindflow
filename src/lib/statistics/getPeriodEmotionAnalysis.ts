import moment from "moment";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export default async function getPeriodEmotionAnalysis(
    diary: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[]
) {
    const dailyEmotionFlow = {};
    const periodEmotion = {};

    for (const data of diary) {
        const { createdAt, emotion, emotionIntensity } = data.data();
        const dateString = moment(createdAt.toDate()).format("YYYY-MM-DD");

        // * If there are no data for currentDate or emotion in dailyEmotionFlow,
        // * Set initial value here
        if (dailyEmotionFlow[dateString] === undefined)
            dailyEmotionFlow[dateString] = {};
        if (dailyEmotionFlow[dateString][emotion] === undefined)
            dailyEmotionFlow[dateString][emotion] = {
                intensitySum: 0,
                count: 0,
            };

        // * If there are no data for current emotion in periodEmotion,
        // * Set initial Value here
        if (periodEmotion[emotion] === undefined)
            periodEmotion[emotion] = { intensitySum: 0, count: 0 };

        // * To shorten the code, get prev value of current emotion
        const prevDaily = dailyEmotionFlow[dateString][emotion];
        const prevPeriod = periodEmotion[emotion];

        // * Add data to emotionDaily, periodEmotion
        dailyEmotionFlow[dateString][emotion] = {
            intensitySum: prevDaily.intensitySum + emotionIntensity,
            count: prevDaily.count + 1,
        };

        periodEmotion[emotion] = {
            intensitySum: prevPeriod.intensitySum + emotionIntensity,
            count: prevPeriod.count + 1,
        };
    }

    let dailyMajorEmotionFlow = {};
    let periodMajorEmotion = {
        emotion: null,
        emotionIntensity: -1,
    };

    // * Get daily major emotion
    for (const dateString in dailyEmotionFlow) {
        let majorEmotion = null;
        let majorEmotionAvgIntensity = -1;

        for (const emotion in dailyEmotionFlow[dateString]) {
            // * Calculate the average intensity of given emotion
            const currentEmotionAvgIntensity =
                dailyEmotionFlow[dateString][emotion].intensitySum /
                dailyEmotionFlow[dateString][emotion].count;

            // * If majorEmotion value is falsy
            // * Then assign current emotion as major.
            if (!majorEmotion) {
                majorEmotion = [emotion];
                majorEmotionAvgIntensity = currentEmotionAvgIntensity;
                continue;
            }

            // * If currentEmotion's average intensity is higher than major,
            // * Then change major emotion
            if (currentEmotionAvgIntensity > majorEmotionAvgIntensity) {
                majorEmotion = [emotion];
                majorEmotionAvgIntensity = currentEmotionAvgIntensity;
            }

            // * If currentEmotion has same average intensity with major,
            // * Then add current emotion to major
            if (currentEmotionAvgIntensity === majorEmotionAvgIntensity) {
                majorEmotion = [...majorEmotion, emotion];
            }
        }

        // * Save major emotion data to dailyEmotionFlow
        dailyMajorEmotionFlow[dateString] = {
            emotion: majorEmotion,
            emotionIntensity: majorEmotionAvgIntensity,
        };
    }

    // * Get Period Major Emotion
    for (const emotion of Object.keys(periodEmotion)) {
        const currentEmotionAvgIntensity =
            periodEmotion[emotion].intensitySum / periodEmotion[emotion].count;

        // * If tmpPeriodMajor value is falsy
        // * Then assign current emotion as major.
        if (!periodMajorEmotion.emotion) {
            periodMajorEmotion.emotion = [emotion];
            periodMajorEmotion.emotionIntensity = currentEmotionAvgIntensity;
            continue;
        }

        // * If currentEmotion's average intensity is higher than major,
        // * Then change major emotion
        if (currentEmotionAvgIntensity > periodMajorEmotion.emotionIntensity) {
            periodMajorEmotion.emotion = [emotion];
            periodMajorEmotion.emotionIntensity = currentEmotionAvgIntensity;
        }

        // * If currentEmotion has same average intensity with major,
        // * Then add current emotion to major
        if (
            currentEmotionAvgIntensity === periodMajorEmotion.emotionIntensity
        ) {
            periodMajorEmotion.emotion = [
                ...periodMajorEmotion.emotion,
                emotion,
            ];
        }
    }

    console.log("일주일동안 이런 감정 흐름을 보였어요", dailyMajorEmotionFlow);
    console.log("이번주는 이런 감정을 가진 주간이였어요", periodMajorEmotion);

    return { dailyMajorEmotionFlow, periodMajorEmotion };
}
