import "moment/locale/ko";
import moment from "moment";
import React from "react";
import { useTimer } from "react-timer-hook";
import { TouchableOpacity } from "react-native";
import { Box, HStack, Text, Icon, Center, Divider } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { getEmotionColor } from "../../lib/emotion/getEmotionColor";
import DiaryCardTexture from "../texture/DiaryCardTexture";
import DiaryEmotion from "../emotion/Emotion";

export default function DiaryCard({
    text = "",
    author = "",
    situation = "",
    emotion,
    emotionIntensity,
    createdAt = new Date(),
    explodedAt,
    onPressActionSheet = () => {},
    setExploded = () => {},
}) {
    return (
        <>
            {explodedAt && (
                <Timebomb explodedAt={explodedAt} setExploded={setExploded} />
            )}
            <DiaryCardTexture>
                <DiaryCardHeader
                    author={author}
                    situation={situation}
                    createdAt={createdAt}
                    emotion={emotion}
                    emotionIntensity={emotionIntensity}
                    onPressActionSheet={onPressActionSheet}
                />
                <Divider marginTop="3" opacity="0.8" />
                <Text fontSize="sm" my="4">
                    {text}
                </Text>
            </DiaryCardTexture>
        </>
    );
}

const DiaryCardHeader = ({
    author,
    situation,
    createdAt,
    emotion,
    emotionIntensity,
    onPressActionSheet,
}) => {
    const HeaderText = () => (
        <Box flex={1} mx="2">
            <Text fontSize="md" color={situation ? "gray.500" : "darkText"}>
                {situation && (
                    <Text>
                        <Text color="darkText">{situation}</Text> 중인{" "}
                    </Text>
                )}
                {author}
            </Text>
            <Text fontSize="xs" my="0">
                {moment(createdAt).format("A h시 mm분")}
            </Text>
        </Box>
    );

    return (
        <HStack>
            <Center>
                <DiaryEmotion
                    color={getEmotionColor(emotion, emotionIntensity)}
                />
            </Center>
            <HeaderText />
            <TouchableOpacity
                style={{ justifyContent: "center" }}
                onPress={onPressActionSheet}
            >
                <Icon as={MaterialIcons} name="more-horiz" size="sm" />
            </TouchableOpacity>
        </HStack>
    );
};

const Timebomb = ({ explodedAt, setExploded }) => {
    const { hours, minutes } = useTimer({
        expiryTimestamp: explodedAt.toDate(),
        onExpire: () => {
            setExploded(true);
        },
    });

    return (
        <Box
            background="gray.800"
            alignSelf="flex-start"
            p="3"
            paddingBottom="5"
            marginBottom="-6"
            borderRadius="xl"
            borderBottomLeftRadius="0"
        >
            <Text color="white" fontWeight="semibold">
                {hours + minutes === 0
                    ? "잠시 후 감정이 사라집니다."
                    : `${hours}시간 ${minutes}분 뒤에 감정이 사라집니다.`}
            </Text>
        </Box>
    );
};
