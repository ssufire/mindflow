import React from "react";
import moment from "moment";
import { Box, HStack, Text } from "native-base";
import { getEmotionColor } from "../../lib/emotion/getEmotionColor";
import DiaryCardTexture from "../texture/DiaryCardTexture";
import StatisticsHeading from "./StatisticsHeading";

/**
 * @description 특정 기간동안의 감정 데이터 통계를 표출하는 Copmonent입니다.
 * @param {number} maxCount 해당 기간 중, 가장 많은 일기가 작성된 날의 일기 개수를 전달합니다
 * @param emotionFlow 해당 기간 동안의 감정 데이터를 전달합니다
 */
export default function PeriodFlowStatistics({
    maxCount = -1,
    emotionFlow = {},
}) {
    return (
        <DiaryCardTexture px="4">
            <StatisticsHeading
                text={`일주일동안${"\n"}이런 감정 흐름을 보였어요`}
            />
            <HStack
                my="5"
                height="250"
                justifyContent="space-between"
                alignItems="flex-end"
            >
                <Box flexDirection="column-reverse">
                    {[0, 20, 40, 60, 80, 100].map((value) => (
                        <Text flex="1">{value}</Text>
                    ))}
                </Box>
                <HStack flex="1" height="250" justifyContent="space-around">
                    {Object.keys(emotionFlow).map((date) => (
                        <AccGraph
                            weekday={moment(date).format("dd")}
                            emotionFlow={emotionFlow[date]}
                            maxCount={maxCount}
                        />
                    ))}
                </HStack>
            </HStack>
        </DiaryCardTexture>
    );
}

/**
 *
 * @param {string} weekday 표현할 그래프의 요일을 전달합니다
 * @param {number} maxCount 일주일 중, 일기를 가장 많이 작성한 날의 일기 수를 전달합니다. PeriodFlowStatistics에서 전달받는 값을 그대로 가져옵니다.
 * @param {Array<{emotion : string, emotionIntensity : number, count : number}>} emotionFlow 하루의 감정 데이터를 가져옵니다.
 * @returns
 */
const AccGraph = ({ weekday, maxCount, emotionFlow = [] }) => {
    return (
        <Box alignItems="center">
            <Box flex="1" width="5" justifyContent="flex-end">
                {emotionFlow.map((value, index) => {
                    const { count, emotion, emotionIntensity } = value;
                    const marginBottom =
                        index === emotionFlow.length - 1 ? 1 : -3;

                    return (
                        <Box
                            flex={count / maxCount}
                            marginBottom={marginBottom}
                            borderTopRadius="full"
                            background={getEmotionColor(
                                emotion,
                                Math.round(emotionIntensity)
                            )}
                        />
                    );
                })}
            </Box>
            <Text>{weekday}</Text>
        </Box>
    );
};
