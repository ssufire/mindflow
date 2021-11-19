import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Button, Text, FlatList, Heading } from "native-base";
import DiaryWriteContainer from "../container/DiaryWriteContainer";
import DiaryCardContainer from "../container/DiaryCardContainer";
import subscribeMyDiary from "../lib/diary/subscribeMyDiary";
import getMyProfile from "../lib/profile/getMyProfile";
import deleteDiary from "../lib/diary/deleteDiary";
import writeDiary_Mock from "../lib/diary/writeDiary.mock";
import { useNavigation } from "@react-navigation/core";

import checkShowDateDivider from "../lib/timeline/checkShowDateDivider";
import moment from "moment";

export default function Timeline() {
    const navigation = useNavigation();

    const [diary, setDiary] = useState([]);
    const [myProfile, setMyProfile] = useState({ nickname: "" });

    useEffect(() => {
        getMyProfile().then(setMyProfile);
        const subscriber = subscribeMyDiary(setDiary);

        return () => {
            if (subscriber) subscriber();
        };
    }, []);

    // * To Optimize Performance, wrap renderItem with useCallback
    const renderItem = useCallback(
        ({ item, index }) => (
            <>
                {
                    // * Show Divider when the date changed
                    index !== 0 &&
                        checkShowDateDivider(
                            diary[index - 1].createdAt,
                            item.createdAt
                        ) && (
                            <Text fontSize="lg" marginTop="3">
                                {moment(item.createdAt).format(
                                    "yyyy년 MM월 DD일"
                                )}
                            </Text>
                        )
                }
                <DiaryCardContainer
                    {...item}
                    author={myProfile.nickname}
                    key={item.id}
                />
            </>
        ),
        [diary]
    );

    // * To Optimize Performance, wrap keyExtractor with useCallback
    const keyExtractor = useCallback((item) => item.id, [diary]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#eeeeee" }}>
            <FlatList
                px="5"
                data={diary}
                removeClippedSubviews={true}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <>
                        <Heading>Timeline</Heading>
                        <Button
                            onPress={async () => {
                                await writeDiary_Mock();
                            }}
                        >
                            일기작성 (테스트)
                        </Button>
                        <Button
                            onPress={async () => {
                                await deleteDiary();
                            }}
                        >
                            일기삭제 (테스트)
                        </Button>
                        <Button
                            onPress={async () => {
                                navigation.reset({
                                    routes: [{ name: "statistics" }],
                                });
                            }}
                        >
                            통계이동 (테스트)
                        </Button>
                        <DiaryWriteContainer />
                    </>
                )}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        </SafeAreaView>
    );
}
