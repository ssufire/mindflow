import React from "react";
import moment from "moment";
import { Box, Text } from "native-base";

/**
 * @description 통계화면에서 제목을 표시하는 Component입니다.
 * @param {string} text 표시할 제목을 전달합니다.
 * @param {boolean} showDate 현재 날짜를 "MM월 DD일 기준"으로 표시할지를 결정합니다. 기본값은 true입니다.
 */
export default function StatisticsHeading({ text = "", showDate = true }) {
    return (
        <Box marginBottom="4">
            <Text fontSize="lg" my="2">
                {text}
            </Text>
            {showDate && (
                <Text fontSize="sm" opacity="0.7">
                    {moment().format("MM월 DD일 기준")}
                </Text>
            )}
        </Box>
    );
}
