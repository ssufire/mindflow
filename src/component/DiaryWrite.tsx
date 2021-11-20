import React from "react";
import { TextInput, TouchableOpacity } from "react-native";
import { Box, Button, HStack, Text } from "native-base";
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
            <Box
                backgroundColor="white"
                p="3"
                my="3"
                h="xs"
                width="100%"
                rounded="xl"
            >
                <TouchableOpacity onPress={onPressEmotion}>
                    <HStack
                        alignItems="center"
                        background="white"
                        alignSelf="flex-end"
                        borderRadius="md"
                        shadow="1"
                        p="2"
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
            </Box>
        </>
    );
}
