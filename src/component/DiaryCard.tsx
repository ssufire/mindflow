import React from "react";
import moment from "moment";
import { useTimer } from "react-timer-hook";
import { Box, IconButton, HStack, Text, Icon, Center } from "native-base";

export default function DiaryCard({
    text = "",
    author = "",
    situation = "",
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
            <Box backgroundColor="white" p="3" my="3" width="100%" rounded="xl">
                <DiaryCardHeader
                    author={author}
                    situation={situation}
                    createdAt={createdAt}
                    onPressActionSheet={onPressActionSheet}
                />
                <Text fontSize="sm" my="3">
                    {text}
                </Text>
            </Box>
        </>
    );
}

const DiaryCardHeader = ({
    author,
    situation,
    createdAt,
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
                {moment(createdAt).format("hh:mm").toString()}
            </Text>
        </Box>
    );

    return (
        <HStack my="1">
            <Center>
                <Icon name={"search"} />
            </Center>
            <HeaderText />
            <IconButton
                icon={<Icon name={"search"} />}
                onPress={onPressActionSheet}
            />
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
