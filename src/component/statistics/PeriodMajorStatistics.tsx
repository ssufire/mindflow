import React from "react";
import { HStack, Text } from "native-base";
import DiaryEmotion from "../emotion/Emotion";
import DiaryCardTexture from "../texture/DiaryCardTexture";

/**
 * @description 일주일 간의 주요 감정 통계를 표현하는 Component입니다.
 * @param {string} nickname 현재 사용자의 닉네임을 전달합니다.
 * @param {Array<string>} emotionColor 사용자가 일주일 동안 가장 많이 느낀 감정을 배열로 전달합니다.
 */
export default function PeriodMajorStatistics({
    nickname = "",
    emotionColor = ["#ffffff"],
}) {
    return (
        <DiaryCardTexture>
            <Text>
                {nickname}님의 일주일은{"\n"}[]한 주간이었어요.
            </Text>
            <HStack my="5" justifyContent="center">
                {emotionColor.map((value) => (
                    <DiaryEmotion
                        key={value}
                        color={value}
                        alignSelf="center"
                        borderRadius="2xl"
                        size="6"
                        mx="1"
                    />
                ))}
            </HStack>
        </DiaryCardTexture>
    );
}
