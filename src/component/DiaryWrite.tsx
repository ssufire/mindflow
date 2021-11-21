import React from "react";
import { Button, HStack, Text } from "native-base";
import { TextInput, TouchableOpacity } from "react-native";
import DiaryCardTexture from "./texture/DiaryCardTexture";
import DiaryEmotion from "./DiaryEmotion";

export default function DiaryWrite({
    text,
    setText,
    length,
    emotionColor = "white",
    onPressEmotion,
    onPressWrite,
}) {
    return (
        <>
            <Text fontSize="lg" marginTop="3">
                지금 기분이 어떤가요?
            </Text>
            <DiaryCardTexture height="xs">
                <TouchableOpacity onPress={onPressEmotion}>
                    <HStack
                        alignItems="center"
                        alignSelf="flex-end"
                        background="white"
                        borderRadius="md"
                        shadow="1"
                        p="1.5"
                    >
                        <Text mx="2">상황</Text>
                        <DiaryEmotion
                            size="3"
                            borderRadius="lg"
                            color={emotionColor}
                        />
                    </HStack>
                </TouchableOpacity>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    multiline={true}
                    style={{ flex: 1 }}
                />
                <HStack alignItems="center" justifyContent="space-between">
                    <Text>{length}/200</Text>
                    <Button onPress={onPressWrite}>Save</Button>
                </HStack>
            </DiaryCardTexture>
        </>
    );
}
