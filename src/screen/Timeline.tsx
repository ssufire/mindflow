import moment from "moment";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Text, FlatList, Heading } from "native-base";
import DiaryWriteContainer from "../container/DiaryWriteContainer";
import DiaryCardContainer from "../container/DiaryCardContainer";

import checkShowDateDivider from "../lib/timeline/checkShowDateDivider";
import subscribeMyDiary from "../lib/diary/subscribeMyDiary";
import writeDiary_Mock from "../lib/diary/writeDiary.mock";
import deleteDiary from "../lib/diary/deleteDiary";

export default function Timeline() {
    // * Get Navigation object for screen routing
    const navigation = useNavigation();

    // * Get User's nickname from redux
    const nickname = useSelector((state: any) => state.userInfo.nickname);

    // * Declare State for diary data
    const [diary, setDiary] = useState([]);

    // * Subscribe user's diary
    useEffect(() => {
        const subscriber = subscribeMyDiary(setDiary);

        return () => {
            if (subscriber) subscriber();
        };
    }, []);

    // * Declare diary and date divider for FlatList
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
                <DiaryCardContainer {...item} author={nickname} key={item.id} />
            </>
        ),
        [diary]
    );

    // * Declare Key Extractor for FlatList
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
                        <Button onPress={async () => await writeDiary_Mock()}>
                            일기작성 (테스트)
                        </Button>
                        <Button onPress={async () => await deleteDiary()}>
                            일기삭제 (테스트)
                        </Button>
                        <Button
                            onPress={() =>
                                navigation.reset({
                                    routes: [{ name: "statistics" }],
                                })
                            }
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
