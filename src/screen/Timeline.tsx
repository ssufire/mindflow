import { Platform } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { Text, FlatList, Box } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import ScreenBackgroundTexture from "../component/texture/ScreenBackgroundTexture";
import DiaryWriteContainer from "../container/DiaryWriteContainer";
import DiaryCardContainer from "../container/DiaryCardContainer";
import DiaryDateDivider from "../component/diary/DiaryDateDivider";

import checkShowDateDivider from "../lib/timeline/checkShowDateDivider";
import subscribeMyDiary from "../lib/diary/subscribeMyDiary";

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
                <DiaryDateDivider
                    createdAt={item.createdAt}
                    showDivider={checkShowDateDivider(
                        index,
                        diary[index - 1]?.createdAt,
                        item.createdAt
                    )}
                />
                <DiaryCardContainer {...item} author={nickname} key={item.id} />
            </>
        ),
        [diary]
    );

    const ListHeaderComponent = useCallback(
        () => (
            <Box marginTop={Platform.OS === "ios" ? "50" : "5"}>
                <Text
                    fontFamily="heading"
                    fontWeight="600"
                    fontSize="2xl"
                    opacity="0.87"
                >
                    타임라인
                </Text>
                <DiaryWriteContainer />
            </Box>
        ),
        []
    );

    const ListEmptyComponent = useCallback(
        () => (
            <Text my="10" textAlign="center" fontSize="lg">
                작성된 일기가 없습니다{"\n"}
                첫번째 일기를 작성해보세요
            </Text>
        ),
        []
    );

    // * Declare Key Extractor for FlatList
    // * To Optimize Performance, wrap keyExtractor with useCallback
    const keyExtractor = useCallback((item) => item.id, [diary]);

    return (
        <ScreenBackgroundTexture>
            <FlatList
                px="5"
                data={diary}
                contentContainerStyle={{ paddingBottom: 50 }}
                removeClippedSubviews={true}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={ListHeaderComponent}
                ListEmptyComponent={ListEmptyComponent}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        </ScreenBackgroundTexture>
    );
}
