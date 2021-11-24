import React from "react";
import { Text, Center } from "native-base";
import DiaryCardTexture from "../texture/DiaryCardTexture";

export default function DiaryCardDeleted() {
    return (
        <DiaryCardTexture>
            <Center>
                <Text fontSize="sm" textAlign="center" my="3">
                    이제는 지나간 감정입니다.{"\n"} Dev Notice : 위에 이미지를
                    추가해주세요.
                </Text>
            </Center>
        </DiaryCardTexture>
    );
}
