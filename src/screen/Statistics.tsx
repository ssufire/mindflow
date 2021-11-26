import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Text, Heading, ScrollView } from "native-base";
import { useNavigation } from "@react-navigation/core";
import getDiaryWeek from "../lib/statistics/getDiaryWeek";

import ScreenBackgroundTexture from "../component/texture/ScreenBackgroundTexture";
import PeriodMajorStatistics from "../component/statistics/PeriodMajorStatistics";
import PeriodFlowStatistics from "../component/statistics/PeriodFlowStatistics";
import SituationStatistics from "../component/statistics/SituationStatistics";
import EmotionStatistics from "../component/statistics/EmotionStatistics";

export default function Statistics() {
    const navigation = useNavigation();

    const [periodDailyStatistics, setPeriodDailyStatistics] = useState({});
    const [periodMajorStatistics, setPeriodMajorStatistics] = useState({
        emotion: [],
        emotionIntensity: -1,
    });

    useEffect(() => {
        // getDiaryWeek().then((res: any) => {
        //     if (res) {
        //         setPeriodMajorStatistics(res.periodMajorEmotion);
        //         setPeriodDailyStatistics(res.dailyMajorEmotionFlow);
        //         console.log("DailyEmotionFlow", res.dailyEmotionFlow);
        //     }
        // });
    }, []);

    useEffect(() => {
        console.log("periodStatics", periodMajorStatistics);
    }, [periodMajorStatistics]);

    return (
        <ScreenBackgroundTexture>
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView px="5">
                    <Heading>Statistics</Heading>
                    {periodMajorStatistics.emotionIntensity === -1 ? (
                        <Text>표시할 감정이 없어요!</Text>
                    ) : (
                        <>
                            <PeriodMajorStatistics />
                            <PeriodFlowStatistics />
                            <EmotionStatistics />
                            <SituationStatistics />
                        </>
                    )}
                </ScrollView>
            </SafeAreaView>
        </ScreenBackgroundTexture>
    );
}
