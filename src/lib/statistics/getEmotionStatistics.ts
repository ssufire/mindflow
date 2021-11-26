import getDiaryAll from "./getDiaryAll";
import { getEmotionColor } from "../emotion/getEmotionColor";
import { getSituationEmotion } from "./getSituationEmotion";

export default async function getEmotionStatistics() {
    const diary = await getDiaryAll();
    const emotion = await (await getSituationEmotion(diary)).emotion;

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
