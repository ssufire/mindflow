import React from "react";
import moment from "moment";
import { Text } from "native-base";
import DiaryCardTexture from "../texture/DiaryCardTexture";
import SituationItem from "./SituationItem";
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
        <DiaryCardTexture>
            <Text fontSize="lg" my="2">
                이런 상황에서는{"\n"}
                이런 감정을 느꼈어요.
            </Text>
            <Text fontSize="sm" opacity="0.7">
                {moment().format("MM월 DD일 기준")}
            </Text>
            {data.map((item) => (
                <SituationItem
                    key={item.situation}
                    situation={item.situation}
                    emotion={item.emotion}
                />
            ))}
        </DiaryCardTexture>
    );
}
