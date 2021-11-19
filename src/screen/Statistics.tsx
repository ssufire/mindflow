import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView } from "react-native";
import { Button, FlatList, Heading } from "native-base";
import DiaryWriteContainer from "../container/DiaryWriteContainer";
import DiaryCardContainer from "../container/DiaryCardContainer";
import subscribeMyDiary from "../lib/diary/subscribeMyDiary";
import getMyProfile from "../lib/profile/getMyProfile";
import deleteDiary from "../lib/diary/deleteDiary";
import writeDiary_Mock from "../lib/diary/writeDiary.mock";
import { useNavigation } from "@react-navigation/core";
import moment from "moment";
import getDiaryWeek from "../lib/statistics/getDiaryWeek";

export default function Statistics() {
    const navigation = useNavigation();

    const [diary, setDiary] = useState([]);
    const [myProfile, setMyProfile] = useState({ nickname: "" });

    useEffect(() => {
        getMyProfile().then(setMyProfile);
        const subscriber = subscribeMyDiary(setDiary);

        getDiaryWeek();

        return () => {
            if (subscriber) subscriber();
        };
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#eeeeee" }}>
            <Heading>Timeline</Heading>
            <Button
                onPress={async () => {
                    navigation.reset({ routes: [{ name: "timeline" }] });
                }}
            >
                일기작성 (테스트)
            </Button>
            <Heading>Timeline</Heading>
        </SafeAreaView>
    );
}
