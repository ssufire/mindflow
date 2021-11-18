import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView } from "react-native";
import { Button, FlatList, Heading } from "native-base";
import DiaryWriteContainer from "../container/DiaryWriteContainer";
import DiaryCardContainer from "../container/DiaryCardContainer";
import subscribeMyDiary from "../lib/diary/subscribeMyDiary";
import getMyProfile from "../lib/profile/getMyProfile";
import deleteDiary from "../lib/diary/deleteDiary";
import writeDiary_Mock from "../lib/diary/writeDiary.mock";

export default function Timeline() {
    const [diary, setDiary] = useState([]);
    const [myProfile, setMyProfile] = useState({ nickname: "" });

    useEffect(() => {
        getMyProfile().then(setMyProfile);
        const subscriber = subscribeMyDiary(setDiary);

        return () => {
            if (subscriber) subscriber();
        };
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#eeeeee" }}>
            <FlatList
                px="5"
                data={diary}
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
                        <DiaryWriteContainer />
                    </>
                )}
                renderItem={({ item }) => (
                    <DiaryCardContainer
                        {...item}
                        author={myProfile.nickname}
                        key={item.id}
                    />
                )}
            />
        </SafeAreaView>
    );
}
