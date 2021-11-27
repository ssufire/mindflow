import React from "react";
import { Box, Text, HStack } from "native-base";
import DiaryEmotion from "../emotion/Emotion";

/**
 * @description 상황별 감정의 그래프를 렌더하는 Component 입니다.
 * @param {string} situation 감정 분포를 표현할 상황의 이름을 전달합니다.
 * @param {Array<{emotionColor : string, ratio : number}>} emotion 그래프로 표현할 "상황에서의 감정의 색상과 그 비율"을 배열로 전달합니다.
 */
export default function SituationItem({
    situation = "알바",
    emotion = [
        { emotionColor: "#ffffff", ratio: 0.8 },
        { emotionColor: "#666666", ratio: 0.3 },
    ],
}) {
    return (
        <Box my="5">
            <Text fontSize="lg" opacity="0.87">
                {situation}
            </Text>
            <HStack height="3" my="3">
                {emotion.map(({ emotionColor, ratio }, index) => (
                    <Box
                        mx="0.5"
                        height="4"
                        flex={ratio}
                        background={emotionColor}
                        borderLeftRadius={index === 0 ? "full" : "0"}
                        borderRightRadius={
                            index === emotion.length - 1 ? "full" : "0"
                        }
                        key={`${situation}_${emotionColor}_bar`}
                    />
                ))}
            </HStack>
            <HStack alignItems="center">
                {emotion.map(({ emotionColor, ratio }, index) => (
                    <Box
                        mx="2"
                        flexDirection="row"
                        alignItems="center"
                        marginLeft={index === 0 ? "1" : "2"}
                    >
                        <DiaryEmotion
                            size="1.5"
                            width="3"
                            height="3"
                            borderRadius="sm"
                            color={emotionColor}
                        />
                        <Text mx="1" fontSize="sm">
                            {ratio}%
                        </Text>
                    </Box>
                ))}
            </HStack>
        </Box>
    );
}
