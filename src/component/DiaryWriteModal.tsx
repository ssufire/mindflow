import React from "react";
import { TouchableOpacity } from "react-native";
import { Box, Button, Divider, HStack, Text } from "native-base";
import ModalTexture from "./texture/ModalTexture";
import DiaryEmotion from "./DiaryEmotion";
import {
    getEmotion,
    getSituation,
    getEmotionIntensity,
} from "../lib/data/getStaticData";
import {
    getEmotionBorderColor,
    getEmotionColor,
} from "../lib/emotion/getEmotionColor";

export default function DiaryWriteModal({
    emotion,
    situation,
    modalVisible,
    setModalVisible,
    onPressEmotionButton,
    onPressSituationButton,
}) {
    return (
        <ModalTexture
            modalVisible={modalVisible}
            onClose={() => setModalVisible(false)}
        >
            <EmotionSelect
                emotion={emotion}
                onPressEmotionButton={onPressEmotionButton}
            />
            <Divider my="3" />
            <SituationSelect
                situation={situation}
                onPressSituationButton={onPressSituationButton}
            />
            <Button
                my="6"
                // opacity="0.8"
                // background="#B9ADA0"
                background="#877E74"
                onPress={() => setModalVisible(false)}
            >
                확인
            </Button>
        </ModalTexture>
    );
}

const emotionList = getEmotion();
const situationList = getSituation();
const intensity = getEmotionIntensity();

/**
 * @description 감정을 선택할 수 있는 리스트를 렌더하는 Component입니다.
 * @param {{emotion : string, emotionIntensity : number}} emotion 현재 선택된 감정의 값을 전달합니다.
 * @param {(emotion : string, emotionIntensity : number) => void} onPressEmotionButton 감정버튼을 눌렀을 때 해당 데이터를 저장할 수 있는 함수를 전달합니다.
 */
const EmotionSelect = ({ onPressEmotionButton, emotion }) => (
    <Box style={{ flex: 1 }}>
        <Text fontSize="md" my="2">
            감정을 선택해주세요
        </Text>
        {emotionList.map((name) => (
            <HStack
                my="2.5"
                alignItems="center"
                justifyContent="space-between"
                key={`emotion_${name}`}
            >
                {intensity.map((emotionIntensity) => (
                    <EmotionButton
                        key={`emotion_${name}_${emotionIntensity}`}
                        borderColor={getEmotionBorderColor(name)}
                        color={getEmotionColor(name, emotionIntensity)}
                        onPress={() =>
                            onPressEmotionButton(name, emotionIntensity)
                        }
                        selected={
                            name === emotion.emotion &&
                            emotionIntensity === emotion.emotionIntensity
                        }
                    />
                ))}
            </HStack>
        ))}
    </Box>
);

/**
 * @description 상황을 선택할 수 있는 리스트를 렌더하는 Component입니다.
 * @param {string} situation 현재 선택된 상황의 값을 전달합니다.
 * @param {(value : string) => void} onPressSituationButton 상황버튼을 눌렀을 때 해당 데이터를 저장할 수 있는 함수를 전달합니다.
 */
const SituationSelect = ({ onPressSituationButton, situation }) => (
    <Box>
        <Text fontSize="md" my="2">
            적절한 상황을 선택해주세요
        </Text>
        <Box mx="-1" my="2" flex="1" flexWrap="wrap" flexDirection="row">
            {situationList.map((value) => (
                <SituationButton
                    value={value}
                    selected={value === situation}
                    onPress={() => onPressSituationButton(value)}
                />
            ))}
        </Box>
    </Box>
);

/**
 * @description 감정을 선택할 수 있는 버튼을 렌더하는 Component입니다.
 * @param {string} color 감정의 색상 코드를 전달합니다. getEmotionColor() 함수를 이용하여 값을 전달합니다.
 * @param {string} borderColor 감정의 테두리의 색상 코드를 전달합니다. getEmotionBorderColor() 함수를 이용하여 값을 전달합니다.
 * @param {boolean} selected 현재 감정이 선택되었는지, 선택되지 않았는지를 전달합니다
 * @param {(emotion : string, emotionIntensity : number) => void} onPress 감정버튼을 눌렀을 때 해당 데이터를 저장할 수 있는 함수를 전달합니다.
 */
const EmotionButton = ({ color, borderColor, selected, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <DiaryEmotion
            color={color}
            borderColor={borderColor}
            showBorder={selected}
        />
    </TouchableOpacity>
);

/**
 * @description 상황을 선택할 수 있는 버튼을 렌더하는 Component입니다.
 * @param {string} value 상황의 값을 반환합니다.
 * @param {boolean} selected 현재 상황이 선택되었는지, 선택되지 않았는지를 전달합니다.
 * @param {(value : string) => void} onPress 상황버튼을 눌렀을 때 해당 데이터를 저장할 수 있는 함수를 전달합니다.
 * @returns
 */
const SituationButton = ({ value, selected, onPress }) => (
    <Button
        m="1"
        my="0.5"
        rounded="md"
        opacity="0.75"
        alignSelf="flex-start"
        onPress={onPress}
        background={selected ? "black" : "#ffffffbb"}
        _text={{ color: selected ? "white" : "black" }}
    >
        {value}
    </Button>
);
