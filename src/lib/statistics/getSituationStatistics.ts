import { getEmotionColor } from "../emotion/getEmotionColor";
import getDiaryAll from "./getDiaryAll";
import { getSituationEmotion } from "./getSituationEmotion";

export interface SituationStatisticsType {
    situation: string;
    emotion: {
        emotionColor: string;
        ratio: number;
    }[];
}

export async function getSituationStatistics(): Promise<
    SituationStatisticsType[]
> {
    const diary = await getDiaryAll();
    const situationEmoticon = await getSituationEmotion(diary);
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

    console.log("getSituationStatistics", data);

    return data;
}
