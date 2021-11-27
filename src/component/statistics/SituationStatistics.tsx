import React from "react";
import { Box } from "native-base";
import SituationItem from "./SituationItem";
import StatisticsHeading from "./StatisticsHeading";
import DiaryCardTexture from "../texture/DiaryCardTexture";
import { SituationStatisticsType } from "../../lib/statistics/getSituationStatistics";

interface SituationStatisticsProps {
    data?: SituationStatisticsType[];
}

/**
 * @description 상황별 감정 통계를 표현하는 Component 입니다.
 * @param {Array<{situation : string, emotion : Array<{emotionColor : string, ratio : number}}>>} data 상황별 감정 통계 표출에 필요한 데이터를 전달합니다
 */
export default function SituationStatistics({
    data = [
        { situation: "", emotion: [{ emotionColor: "#ffffff", ratio: 1 }] },
    ],
}: SituationStatisticsProps) {
    return (
        <DiaryCardTexture px="4">
            <StatisticsHeading
                text={`이런 상황에서는${"\n"}이런 감정을 느꼈어요.`}
            />
            <Box p="2">
                {data.map((item) => (
                    <SituationItem
                        key={item.situation}
                        situation={item.situation}
                        emotion={item.emotion}
                    />
                ))}
            </Box>
        </DiaryCardTexture>
    );
}
