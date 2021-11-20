import React from "react";
import { TouchableOpacity } from "react-native";
import { Box, Button, HStack, Modal, Text } from "native-base";
import {
    getDummyEmotion,
    getDummyIntensity,
    getDummySituation,
} from "../lib/diary/getDummyDiaryData";
import emotionColors from "../lib/emotion/emotionColors";
import DiaryEmotion from "./DiaryEmotion";
import {
    getEmotionBorderColor,
    getEmotionColor,
} from "../lib/emotion/getEmotionColor";

const emotionList = getDummyEmotion();
const intensity = getDummyIntensity();

export default function DiaryWriteModal({
    modalVisible,
    setModalVisible,
    situation,
    setSituation,
    emotion,
    setEmotion,
}) {
    return (
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <Modal.Content background="white">
                <Modal.CloseButton />
                <Modal.Body background="white" p="5">
                    <Box style={{ flex: 1 }}>
                        <Text>감정을 선택해주세요</Text>
                        {emotionList.map((name) => (
                            <HStack
                                my="2.5"
                                alignItems="center"
                                justifyContent="space-between"
                                key={`emotion_${name}`}
                            >
                                {intensity.map((emotionIntensity) => (
                                    <TouchableOpacity
                                        onPress={() =>
                                            setEmotion({
                                                emotion: name,
                                                emotionIntensity,
                                            })
                                        }
                                    >
                                        <DiaryEmotion
                                            showBorder={
                                                name === emotion.emotion &&
                                                emotionIntensity ===
                                                    emotion.emotionIntensity
                                            }
                                            borderColor={getEmotionBorderColor(
                                                name
                                            )}
                                            color={getEmotionColor(
                                                name,
                                                emotionIntensity
                                            )}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </HStack>
                        ))}
                    </Box>
                    <Box>
                        <Text>적절한 상황을 선택해주세요</Text>
                        <Box flex="1" flexWrap="wrap" flexDirection="row">
                            {getDummySituation().map((value) => (
                                <Chip
                                    value={value}
                                    selected={value === situation}
                                    setSituation={setSituation}
                                />
                            ))}
                        </Box>
                    </Box>
                </Modal.Body>
            </Modal.Content>
        </Modal>
    );
}

const Chip = ({ value, selected, setSituation }) => {
    return (
        <Button
            m="1"
            alignSelf="flex-start"
            onPress={() => setSituation(value)}
            background={selected ? "yellow.100" : "white"}
            borderRadius="full"
            borderWidth="1"
            _text={{ color: "black" }}
        >
            {value}
        </Button>
    );
};
