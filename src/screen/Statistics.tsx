import React, { useEffect, useState } from "react";
import { Text, Heading, ScrollView } from "native-base";
import { SafeAreaView } from "react-native";
import { useSelector } from "react-redux";

import ScreenBackgroundTexture from "../component/texture/ScreenBackgroundTexture";
import PeriodMajorStatistics from "../component/statistics/PeriodMajorStatistics";
import PeriodFlowStatistics from "../component/statistics/PeriodFlowStatistics";
import SituationStatistics from "../component/statistics/SituationStatistics";
import EmotionStatistics from "../component/statistics/EmotionStatistics";
import getSituationStatistics from "../lib/statistics/getSituationStatistics";
import getWeeklyStatistics from "../lib/statistics/getWeeklyStatistics";
import { getEmotionColor } from "../lib/emotion/getEmotionColor";
import {
    PeriodMajorEmotionStatisticsType,
    DailyEmotionFlowStatisticsType,
    SituationStatisticsType,
    EmotionStatisticsType,
} from "../types/statistics";
import getEmotionStatistics from "../lib/statistics/getEmotionStatistics";

export default function Statistics() {
    // * Get User's nickname from redux
    const nickname = useSelector((state: any) => state.userInfo.nickname);

    const [dailyEmotionFlow, setDailyEmotionFlow] =
        useState<DailyEmotionFlowStatisticsType>({
            maxCount: -1,
            emotionFlow: {},
        });
    const [periodMajorEmotion, setPeriodMajorEmotion] =
        useState<PeriodMajorEmotionStatisticsType>({
            emotion: [],
            emotionIntensity: -1,
        });
    const [situation, setSituation] = useState<SituationStatisticsType[]>([]);
    const [emotion, setEmotion] = useState<EmotionStatisticsType[]>([]);

    useEffect(() => {
        getSituationStatistics().then((res) => setSituation(res));
        getEmotionStatistics().then((res) => setEmotion(res));
        getWeeklyStatistics().then((res) => {
            setDailyEmotionFlow(res.dailyEmotionFlow);
            setPeriodMajorEmotion(res.periodMajorEmotion);
        });
    }, []);

    return (
        <ScreenBackgroundTexture>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView px="5">
                    <Heading>Statistics</Heading>
                    {periodMajorEmotion.emotionIntensity === -1 ? (
                        <Text>표시할 감정이 없어요!</Text>
                    ) : (
                        <>
                            <PeriodMajorStatistics
                                nickname={nickname}
                                emotionColor={periodMajorEmotion.emotion.map(
                                    (emotion) =>
                                        getEmotionColor(
                                            emotion,
                                            Math.round(
                                                periodMajorEmotion.emotionIntensity
                                            )
                                        )
                                )}
                            />
                            <PeriodFlowStatistics
                                maxCount={dailyEmotionFlow.maxCount}
                                emotionFlow={dailyEmotionFlow.emotionFlow}
                            />
                            <EmotionStatistics data={emotion} />
                            <SituationStatistics data={situation} />
                        </>
                    )}
                </ScrollView>
            </SafeAreaView>
        </ScreenBackgroundTexture>
    );
}
