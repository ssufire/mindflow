import React from "react";
import { Button, HStack, Text, TextArea } from "native-base";
import DiaryCardTexture from "../texture/DiaryCardTexture";
import DiaryEmotion from "../emotion/Emotion";

export default function DiaryWrite({
    text,
    length,
    setText,
    situation,
    emotionColor,
    onPressWrite,
    onPressShowModalButton,
}) {
    return (
        <DiaryCardTexture>
            <Button
                onPress={onPressShowModalButton}
                background="#fffffff0"
                alignSelf="flex-start"
                rounded="md"
                shadow="1"
                p="2"
            >
                <HStack alignItems="center">
                    <DiaryEmotion
                        size="3"
                        borderRadius="lg"
                        color={emotionColor}
                    />
                    <Text mx="2" fontSize="sm">
                        {situation.length === 0
                            ? "기분과 상황을 알려주세요"
                            : situation}
                    </Text>
                </HStack>
            </Button>
            <TextArea
                my="3"
                height="150"
                opacity="0.8"
                borderWidth="0"
                fontFamily="GowunBatang-Regular"
                fontSize="md"
                onChangeText={setText}
                value={text}
            />
            <HStack alignItems="center" justifyContent="space-between" px="1">
                <Text>{length}/200</Text>
                <Button
                    px="4"
                    rounded="md"
                    alignSelf="flex-start"
                    background="#877E74"
                    onPress={onPressWrite}
                    _text={{
                        color: "white",
                        fontSize: "md",
                        fontWeight: "600",
                    }}
                >
                    저장
                </Button>
            </HStack>
        </DiaryCardTexture>
    );
}
