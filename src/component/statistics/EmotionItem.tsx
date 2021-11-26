import React from "react";
import { Box, Text } from "native-base";
import DiaryEmotion from "../emotion/Emotion";

/**
 * @description 감정별로 어떤 상황이 많이 일어났는지를 보여주는 Component입니다.
 * @param {string} emotionColor 표현할 감정의 색상을 전달합니다
 * @param {string} situation 감정에 해당하는 상황을 전달합니다
 * @param {number} situationCount 감정에서 해당 상황이 몇번이나 나왔는지를 전달합니다.
 * @param {number} situationRatio 감정에서 상황이 어느정도의 비율로 나왔는지를 전달합니다.
 */
export default function EmotionItem({
    emotionColor = "#ffffff",
    situation = "상황",
    situationCount = 10,
    situationRatio = 50,
}) {
    return (
        <Box alignItems="center">
            <DiaryEmotion
                size="7"
                alignSelf="center"
                borderRadius="3xl"
                color={emotionColor}
            />
            <Text my="1" fontSize="md">
                {situation}
            </Text>
            <Text opacity="0.7" fontSize="sm">
                {situationCount}({situationRatio}%)
            </Text>
        </Box>
    );
}
