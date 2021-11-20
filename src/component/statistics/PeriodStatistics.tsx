import React from "react";
import { Text } from "native-base";
import { getEmotionColor } from "../../lib/emotion/getEmotionColor";
import DiaryEmotion from "../DiaryEmotion";

export default function PeriodStatistics({ emotionArray, emotionIntensity }) {
    return (
        <Text>
            이세빈님의 일주일은{" "}
            {emotionArray.map((value) => (
                <DiaryEmotion
                    color={getEmotionColor(value, Math.round(emotionIntensity))}
                />
            ))}
            이였어요
        </Text>
    );
}
