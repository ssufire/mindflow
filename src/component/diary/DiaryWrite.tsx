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
        <>
            <Text fontSize="lg" marginTop="3">
                지금 기분이 어떤가요?
            </Text>
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
                        <Text mx="2" fontSize="xs">
                            {situation.length === 0
                                ? "기분과 상황을 알려주세요"
                                : situation}
                        </Text>
                    </HStack>
                </Button>
                <TextArea
                    my="5"
                    height="140"
                    opacity="0.8"
                    borderWidth="0"
                    fontFamily="GowunBatang-Regular"
                    onChangeText={setText}
                    value={text}
                />
                <HStack
                    alignItems="center"
                    justifyContent="space-between"
                    px="1"
                >
                    <Text>{length}/200</Text>
                    <Button
                        p="1"
                        px="3"
                        rounded="md"
                        alignSelf="flex-start"
                        // background="#B9ADA0"
                        background="#877E74"
                        _text={{
                            color: "white",
                            fontSize: "xs",
                            fontWeight: "400",
                        }}
                        onPress={onPressWrite}
                    >
                        저장
                    </Button>
                </HStack>
            </DiaryCardTexture>
        </>
    );
}
