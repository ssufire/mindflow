import React, { useState } from "react";
import { Alert } from "react-native";
import DiaryCard from "../component/DiaryCard";
import DiaryCardDeleted from "../component/DiaryCardDeleted";
import DiaryExplodeModalContainer from "./DiaryExplodeModalContainer";

import { useActionSheet } from "@expo/react-native-action-sheet";
import cancelDiaryBomb from "../lib/diary/cancelDiaryBomb";

export default function DiaryCardContainer(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [exploded, setExploded] = useState(
        props.explodedAt && props.explodedAt.toDate().getTime() < Date.now()
    );

    const { showActionSheetWithOptions } = useActionSheet();

    const onPressActionSheet = () => {
        const actionSheetOption = {
            options: [props.explodedAt ? "폭탄 취소" : "폭탄 설정", "취소"],
            cancelButtonIndex: 1,
        };

        const actionSheetFunction = async (index) => {
            switch (index) {
                case 0:
                    props.explodedAt !== null
                        ? Alert.alert(
                              "감정 붙잡기",
                              "이 감정을 떠나보내지 않으시겠어요?",
                              [
                                  {
                                      text: "예",
                                      onPress: async () =>
                                          await cancelDiaryBomb(props.id),
                                  },
                                  {
                                      text: "아니요",
                                      style: "destructive",
                                  },
                              ],
                              { cancelable: true }
                          )
                        : setModalVisible(true);
                    break;

                default:
                    break;
            }
        };

        showActionSheetWithOptions(actionSheetOption, actionSheetFunction);
    };

    return exploded ? (
        <DiaryCardDeleted />
    ) : (
        <>
            <DiaryCard
                {...props}
                onPressActionSheet={onPressActionSheet}
                setExploded={setExploded}
            />
            <DiaryExplodeModalContainer
                id={props.id}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </>
    );
}
