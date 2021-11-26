import React from "react";
import moment from "moment";
import { Text, HStack } from "native-base";
import DiaryCardTexture from "../texture/DiaryCardTexture";
import EmotionItem from "./EmotionItem";

/**
 * @description 감정별 상황 통계를 렌더하는 Component입니다.
 * @param {Array<{emotionColor : string, situation : string, situationCount : number, situationRatio : number}>} data 표현할 감정별 상황 데이터를 전달합니다. 배열의 길이가 3 이상일 경우, 앞의 두개의 데이터만 표출됩니다.
 */
export default function EmotionStatistics({
    data = [
        {
            emotionColor: "#ffffff",
            situation: "상황1",
            situationCount: 10,
            situationRatio: 50,
        },
        {
            emotionColor: "#ffffff",
            situation: "상황2",
            situationCount: 10,
            situationRatio: 50,
        },
    ],
}) {
    return (
        <DiaryCardTexture>
            <Text fontSize="lg" my="2">
                이런 감정에서는{"\n"}
                주로 이런 상황이었어요
            </Text>
            <Text fontSize="sm" opacity="0.7">
                {moment().format("MM월 DD일 기준")}
            </Text>
            <HStack justifyContent="space-around" my="5" mx="4">
                {data.map(
                    (value, index) =>
                        index < 2 && (
                            <EmotionItem
                                {...value}
                                key={`${value.situation}_emotionItem`}
                            />
                        )
                )}
            </HStack>
        </DiaryCardTexture>
    );
}
