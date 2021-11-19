import React from "react";
import { Box, IconButton, HStack, Text, Icon, Center } from "native-base";

export default function DiaryCard({
    text = "",
    author = "",
    situation = "",
    createdAt = new Date(),
    explodedAt,
    onPressActionSheet = () => {},
}) {
    return (
        <>
            {explodedAt && (
                <Box>이 시간에 삭제됩니다.{explodedAt.toDate().toString()}</Box>
            )}
            <Box backgroundColor="white" p="3" my="3" width="100%" rounded="xl">
                <HStack my="1">
                    <Center>
                        <Icon name={"search"} />
                    </Center>
                    <Box flex={1} mx="2">
                        <Text fontSize="md" color="gray.500">
                            {situation && (
                                <Text>
                                    <Text color="darkText">{situation}</Text>{" "}
                                    중인{" "}
                                </Text>
                            )}
                            {author}
                        </Text>
                        <Text fontSize="xs" my="0">
                            {createdAt.getHours()}:{createdAt.getMinutes()}
                        </Text>
                    </Box>
                    <IconButton
                        icon={<Icon name={"search"} />}
                        onPress={onPressActionSheet}
                    />
                </HStack>
                <Text fontSize="sm" my="3">
                    {text}
                </Text>
            </Box>
        </>
    );
}
