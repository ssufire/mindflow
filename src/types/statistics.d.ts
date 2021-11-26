export interface DailyEmotionFlowStatisticsType {
    maxCount: number;
    emotionFlow: {
        [dateString: string]: {
            emotion: string;
            emotionIntensity: number;
            count: number;
        }[];
    };
}

export interface PeriodMajorEmotionStatisticsType {
    emotion: string[];
    emotionIntensity: number;
}

export interface EmotionStatisticsType {
    emotionColor: string;
    situation: string;
    situationCount: number;
    situationRatio: number;
}

export interface SituationStatisticsType {
    situation: string;
    emotion: {
        emotionColor: string;
        ratio: number;
    }[];
}
