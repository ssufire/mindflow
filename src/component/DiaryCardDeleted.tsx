import React from "react";
import { Box, Text, Center } from "native-base";

export default function DiaryCardDeleted() {
    return (
        <Box backgroundColor="white" p="3" my="3" width="100%" rounded="xl">
            <Center>
                <Text fontSize="sm" textAlign="center" my="3">
                    이제는 지나간 감정입니다.{"\n"} Dev Notice : 위에 이미지를
                    추가해주세요.
                </Text>
            </Center>
        </Box>
    );
}
