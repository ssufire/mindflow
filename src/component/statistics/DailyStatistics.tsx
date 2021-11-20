import React from "react";
import { Text } from "native-base";
import { getEmotionColor } from "../../lib/emotion/getEmotionColor";
import DiaryEmotion from "../DiaryEmotion";

/**
 * @description 통계 화면에서 일별 감정흐름 통계를 표출하는 Component 입니다.
 * @param {string} date 통계를 표출할 날짜를 전달합니다.
 * @param {string[]} emotionArray 해당 날짜의 주요 감정들을 전달합니다.
 * @param {number} emotionIntensity 해당 날짜의 주요 감정의 강도를 전달합니다.
 */
export default function DailyStatistics({
    date,
    emotionArray,
    emotionIntensity,
}) {
    return (
        <Text my="3" alignItems="center">
            {date}
            {emotionArray.map((emotion) => (
                <DiaryEmotion
                    color={getEmotionColor(
                        emotion,
                        Math.round(emotionIntensity)
                    )}
                />
            ))}
        </Text>
    );
}
