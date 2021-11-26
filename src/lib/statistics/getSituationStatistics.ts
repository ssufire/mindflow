import { SituationStatisticsType } from "../../types/statistics";
import { getSituationEmotion } from "./getSituationEmotion";
import { getEmotionColor } from "../emotion/getEmotionColor";
import getDiaryAll from "./getDiaryAll";

export default async function getSituationStatistics(): Promise<
    SituationStatisticsType[]
> {
    const diary = await getDiaryAll();
    const situationEmoticon = await getSituationEmotion(diary);
    const data: SituationStatisticsType[] = [];

    console.log("situationEmotion", situationEmoticon);

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
