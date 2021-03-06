import React, { useState } from "react";
import { Alert } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import cancelDiaryBomb from "../lib/diary/cancelDiaryBomb";
import DiaryExplodeModalContainer from "./DiaryExplodeModalContainer";
import DiaryCard from "../component/diary/DiaryCard";

export default function DiaryCardContainer(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [exploded, setExploded] = useState(
        props.explodedAt && props.explodedAt.toDate().getTime() < Date.now()
    );

    const { showActionSheetWithOptions } = useActionSheet();

    const onPressActionSheet = () => {
        const actionSheetOption = {
            options: [
                props.explodedAt ? "감정 붙잡기" : "감정 떠나보내기",
                "취소",
            ],
            cancelButtonIndex: 1,
        };

        const actionSheetFunction = async (index) => {
            switch (index) {
                case 0:
                    props.explodedAt !== null
                        ? Alert.alert(
                              "감정 붙잡기",
                              "감정을 붙잡으면 타임라인에서 일기가 사라지지 않습니다.",
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

    return (
        !exploded && (
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
        )
    );
}
