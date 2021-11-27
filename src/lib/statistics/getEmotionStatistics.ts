import getSituationEmotion from "./getSituationEmotion";
import { getEmotionColor } from "../emotion/getEmotionColor";

export default function getEmotionStatistics(diaryData) {
    const emotion = getSituationEmotion(diaryData).emotion;

    return Object.keys(emotion).map((currEmotion) => {
        const emotionData = emotion[currEmotion][0];

        return {
            emotionColor: getEmotionColor(
                currEmotion,
                Math.round(emotionData.emotionIntensityAvg)
            ),
            situation: emotionData.situation,
            situationCount: emotionData.count,
            situationRatio: emotionData.ratio,
        };
    });
}
