import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Text, Heading, Box } from "native-base";

import { useNavigation } from "@react-navigation/core";
import getDiaryWeek from "../lib/statistics/getDiaryWeek";
import DailyStatistics from "../component/statistics/DailyStatistics";
import PeriodStatistics from "../component/statistics/PeriodStatistics";

export default function Statistics() {
    const navigation = useNavigation();

    const [periodDailyStatistics, setPeriodDailyStatistics] = useState({});
    const [periodMajorStatistics, setPeriodMajorStatistics] = useState({
        emotion: [],
        emotionIntensity: -1,
    });

    useEffect(() => {
        getDiaryWeek().then((res: any) => {
            if (res) {
                setPeriodMajorStatistics(res.periodMajorEmotion);
                setPeriodDailyStatistics(res.dailyMajorEmotionFlow);
            }
        });
    }, []);

    useEffect(() => {
        console.log("periodStatics", periodMajorStatistics);
    }, [periodMajorStatistics]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#eeeeee" }}>
            <Heading>Statistics</Heading>
            {periodMajorStatistics.emotionIntensity === -1 ? (
                <Text>표시할 감정이 없어요!</Text>
            ) : (
                <>
                    <Box m="3" p="3" borderRadius="lg" background="white">
                        <PeriodStatistics
                            emotionArray={periodMajorStatistics.emotion}
                            emotionIntensity={
                                periodMajorStatistics.emotionIntensity
                            }
                        />
                    </Box>
                    <Box m="3" p="3" borderRadius="lg" background="white">
                        <Text>일주일동안 이런 감정 흐름을 보였어요</Text>
                        {Object.keys(periodDailyStatistics).map((value) => {
                            const { emotion: emotionArray, emotionIntensity } =
                                periodDailyStatistics[value];

                            return (
                                <DailyStatistics
                                    date={value}
                                    emotionArray={emotionArray}
                                    emotionIntensity={emotionIntensity}
                                />
                            );
                        })}
                    </Box>
                </>
            )}
        </SafeAreaView>
    );
}
