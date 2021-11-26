import moment from "moment";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import {
    DailyEmotionFlowStatisticsType,
    PeriodMajorEmotionStatisticsType,
} from "../../types/statistics";

export default async function getPeriodEmotionAnalysis(
    diary: FirebaseFirestoreTypes.QueryDocumentSnapshot<FirebaseFirestoreTypes.DocumentData>[]
) {
    const dailyEmotionFlowAcc: DailyEmotionFlowAcc = {};
    const periodEmotionAcc: PeriodEmotionAcc = {};
    const dailyDiaryCount: DailyDiaryCount = {};

    for (const data of diary) {
        const {
            createdAt,
            emotionIntensity,
            emotion: emotionString,
        } = data.data();
        const dateString = moment(createdAt.toDate()).format("YYYY-MM-DD");

        // * Explicitly convert emotionString to Upper Case
        // * To prevent unexpected error
        const emotion = emotionString.toUpperCase();

        // * If there are no data for currentDate or emotion in dailyEmotionFlowAcc,
        // * Set initial value here
        if (dailyDiaryCount[dateString] === undefined)
            dailyDiaryCount[dateString] = 0;
        if (dailyEmotionFlowAcc[dateString] === undefined)
            dailyEmotionFlowAcc[dateString] = {};
        if (dailyEmotionFlowAcc[dateString][emotion] === undefined)
            dailyEmotionFlowAcc[dateString][emotion] = {
                intensitySum: 0,
                count: 0,
            };

        // * If there are no data for current emotion in periodEmotionAcc,
        // * Set initial Value here
        if (periodEmotionAcc[emotion] === undefined)
            periodEmotionAcc[emotion] = { intensitySum: 0, count: 0 };

        // * To shorten the code, get prev value of current emotion
        const prevDaily = dailyEmotionFlowAcc[dateString][emotion];
        const prevPeriod = periodEmotionAcc[emotion];

        // * Add data to emotionDaily, periodEmotionAcc
        dailyDiaryCount[dateString] += 1;
        dailyEmotionFlowAcc[dateString][emotion] = {
            intensitySum: prevDaily.intensitySum + emotionIntensity,
            count: prevDaily.count + 1,
        };

        periodEmotionAcc[emotion] = {
            intensitySum: prevPeriod.intensitySum + emotionIntensity,
            count: prevPeriod.count + 1,
        };
    }

    // * Declare DailyEmotionFlow, PeriodMajorEmotion
    let dailyEmotionFlow: DailyEmotionFlowStatisticsType = {
        maxCount: 0,
        emotionFlow: {},
    };
    let periodMajorEmotion: PeriodMajorEmotionStatisticsType = {
        emotion: null,
        emotionIntensity: -1,
    };

    // * Get daily emotion flow
    for (const dateString in dailyEmotionFlowAcc) {
        const currentDailyCount = dailyDiaryCount[dateString];
        if (currentDailyCount > dailyEmotionFlow.maxCount)
            dailyEmotionFlow.maxCount = currentDailyCount;

        // * Get current day's emotion data
        // * Convert Data format and sort the array in count descending order
        const currentDayEmotions = dailyEmotionFlowAcc[dateString];
        const sortedEmotions = Object.keys(currentDayEmotions)
            .map((emotion) => {
                const { intensitySum, count } = currentDayEmotions[emotion];

                return {
                    count,
                    emotion,
                    emotionIntensity: intensitySum / count,
                };
            })
            .sort((b, a) => b.count - a.count);

        // * Append the data to dailyEmotionFlow
        dailyEmotionFlow.emotionFlow[dateString] = sortedEmotions;
    }

    // * Get Period Major Emotion
    for (const emotion of Object.keys(periodEmotionAcc)) {
        const currentEmotionAvgIntensity =
            periodEmotionAcc[emotion].intensitySum /
            periodEmotionAcc[emotion].count;

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
            continue;
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

    return { dailyEmotionFlow, periodMajorEmotion };
}

// * ---------------- Below the line, declare types ----------------

interface DailyEmotionFlowAcc {
    [dateString: string]: {
        [emotion: string]: {
            intensitySum: number;
            count: number;
        };
    };
}

interface PeriodEmotionAcc {
    [emotion: string]: { intensitySum: number; count: number };
}

interface DailyDiaryCount {
    [dateString: string]: number;
}
