import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box, Button, Text, Input } from "native-base";
import ScreenBackgroundTexture from "../component/texture/ScreenBackgroundTexture";
import setMyProfile from "../lib/profile/setMyProfile";

export default function Welcome() {
    const navigation = useNavigation();
    const [nickname, setNickname] = useState(auth().currentUser.displayName);

    const onPressConfirm = async () => {
        await setMyProfile(nickname).then((res) => {
            if (res) navigation.reset({ routes: [{ name: "timeline" }] });
        });
    };

    return (
        <ScreenBackgroundTexture>
            <SafeAreaView style={{ flex: 1 }}>
                <Box flex="2" py="10" px="5" justifyContent="center">
                    <Text
                        fontFamily="heading"
                        fontWeight="600"
                        fontSize="2xl"
                        opacity="0.7"
                    >
                        환영합니다!
                    </Text>
                    <Text fontSize="lg" my="2" opacity="0.7">
                        마음흐름에서 사용할 이름을 작성해주세요
                    </Text>
                    <Input
                        value={nickname}
                        onChangeText={setNickname}
                        placeholder="2-10글자의 닉네임을 입력해주세요"
                        fontSize="lg"
                        opacity="0.8"
                        marginTop="5"
                        borderWidth="0"
                        borderRadius="0"
                        borderBottomWidth="1"
                        borderColor="#2E2B27"
                        _focus={{ borderColor: "#2E2B27" }}
                        InputRightElement={
                            <Button
                                px="5"
                                my="2"
                                marginLeft="5"
                                background="#2E2B27"
                                onPress={onPressConfirm}
                                _text={{ fontSize: "md" }}
                            >
                                확인
                            </Button>
                        }
                    />
                </Box>
                <Box flex="1" />
            </SafeAreaView>
        </ScreenBackgroundTexture>
    );
}
