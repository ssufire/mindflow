import getSituationEmotion from "./getSituationEmotion";
import { getEmotionColor } from "../emotion/getEmotionColor";
import { SituationStatisticsType } from "../../types/statistics";

export default function getSituationStatistics(
    diaryData
): SituationStatisticsType[] {
    const situationEmoticon = getSituationEmotion(diaryData);
    const data: SituationStatisticsType[] = [];

    for (const situation in situationEmoticon.situation) {
        const emotion = situationEmoticon.situation[situation].map((v) => {
            return {
                emotionColor: getEmotionColor(
                    v.emotion,
                    Math.round(v.emotionIntensityAvg)
                ),
                ratio: v.ratio,
            };
        });
        data.push({ situation, emotion });
    }

    return data;
}
