import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";
import { Text, FlatList, Heading, Box } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import ScreenBackgroundTexture from "../component/texture/ScreenBackgroundTexture";
import DiaryWriteContainer from "../container/DiaryWriteContainer";
import DiaryCardContainer from "../container/DiaryCardContainer";

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
        <ScreenBackgroundTexture>
            <FlatList
                px="5"
                data={diary}
                contentContainerStyle={{ paddingBottom: 50 }}
                removeClippedSubviews={true}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (
                    <Box marginTop="50">
                        <Heading>Timeline</Heading>
                        <DiaryWriteContainer />
                    </Box>
                )}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        </ScreenBackgroundTexture>
    );
}
