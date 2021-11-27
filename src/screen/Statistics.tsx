import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Text, ScrollView, HStack, Icon } from "native-base";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import ScreenBackgroundTexture from "../component/texture/ScreenBackgroundTexture";
import PeriodMajorStatistics from "../component/statistics/PeriodMajorStatistics";
import PeriodFlowStatistics from "../component/statistics/PeriodFlowStatistics";
import getSituationStatistics from "../lib/statistics/getSituationStatistics";
import SituationStatistics from "../component/statistics/SituationStatistics";
import EmotionStatistics from "../component/statistics/EmotionStatistics";
import getWeeklyStatistics from "../lib/statistics/getWeeklyStatistics";
import EmptyStatistics from "../component/statistics/EmptyStatistics";

import { getEmotionColor } from "../lib/emotion/getEmotionColor";
import {
    PeriodMajorEmotionStatisticsType,
    DailyEmotionFlowStatisticsType,
    SituationStatisticsType,
    EmotionStatisticsType,
} from "../types/statistics";
import getEmotionStatistics from "../lib/statistics/getEmotionStatistics";
import getDiaryAll from "../lib/statistics/getDiaryAll";

export default function Statistics() {
    // * Get User's nickname from redux
    const nickname = useSelector((state: any) => state.userInfo.nickname);

    // * Declare navigation object for routing to the timeline screen.
    const navigation = useNavigation();
    const routeToTimeline = () => navigation.navigate("timeline");

    const [statisticsAvailable, setStatisticsAvilable] = useState(false);

    // * Declare state for statistics data
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
        getDiaryAll().then((diaryData) => {
            if (diaryData.length === 0) {
                setStatisticsAvilable(false);
                return;
            }

            setStatisticsAvilable(true);
            setSituation(() => getSituationStatistics(diaryData));
            setEmotion(() => getEmotionStatistics(diaryData));
            getWeeklyStatistics().then((res) => {
                setDailyEmotionFlow(res.dailyEmotionFlow);
                setPeriodMajorEmotion(res.periodMajorEmotion);
            });
        });
    }, []);

    return (
        <ScreenBackgroundTexture>
            <SafeAreaView style={{ flex: 1 }}>
                {statisticsAvailable ? (
                    <ScrollView px="5">
                        <HStack py="2" marginTop="3">
                            <TouchableOpacity
                                style={{ justifyContent: "center" }}
                                onPress={routeToTimeline}
                            >
                                <Icon
                                    as={MaterialIcons}
                                    name="arrow-back-ios"
                                    size="sm"
                                    opacity="0.8"
                                />
                            </TouchableOpacity>
                            <Text
                                mx="1"
                                fontFamily="heading"
                                fontWeight="600"
                                fontSize="2xl"
                                opacity="0.87"
                            >
                                마음통계
                            </Text>
                        </HStack>
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
                    </ScrollView>
                ) : (
                    <EmptyStatistics
                        nickname={nickname}
                        onPress={routeToTimeline}
                    />
                )}
            </SafeAreaView>
        </ScreenBackgroundTexture>
    );
}
