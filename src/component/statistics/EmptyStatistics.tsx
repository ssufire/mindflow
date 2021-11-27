import React from "react";
import { Box, Text, Button } from "native-base";

/**
 * @description 표시할 통계가 없을 때 통계화면을 렌더하는 Component입니다.
 * @param {string} nickname 사용자의 닉네임을 전달합니다
 * @param {() => void} onPress 타임라인 화면으로 routing하는 함수를 전달합니다
 */
export default function EmptyStatistics({ nickname, onPress }) {
    return (
        <Box flex="1" p="5" justifyContent="center">
            <Text textAlign="center" fontSize="xl">
                일기를 작성하면{"\n"}
                {nickname}님의 감정 통계를 볼 수 있어요
            </Text>
            <Text textAlign="center" my="5" fontSize="lg">
                지금 첫번째 일기를 써보세요
            </Text>
            <Button
                width="4/5"
                rounded="md"
                alignSelf="center"
                background="#877E74"
                onPress={onPress}
                _text={{
                    color: "white",
                    fontSize: "lg",
                    fontWeight: "600",
                }}
            >
                일기쓰기
            </Button>
        </Box>
    );
}
