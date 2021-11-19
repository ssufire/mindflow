import React from "react";
import DiaryCard from "../component/DiaryCard";

import { useActionSheet } from "@expo/react-native-action-sheet";
import cancelDiaryBomb from "../lib/diary/cancelDiaryBomb";
import addDiaryBomb from "../lib/diary/addDiaryBomb";

export default function DiaryCardContainer(props) {
    const { showActionSheetWithOptions } = useActionSheet();

    const onPressActionSheet = () => {
        const actionSheetOption = {
            options: [props.explodedAt ? "폭탄 취소" : "폭탄 설정", "취소"],
            cancelButtonIndex: 1,
        };

        const actionSheetFunction = async (index) => {
            switch (index) {
                case 0:
                    props.exlodedAt !== null
                        ? await cancelDiaryBomb(props.id)
                        : await addDiaryBomb(props.id);
                    break;

                default:
                    break;
            }
        };

        showActionSheetWithOptions(actionSheetOption, actionSheetFunction);
    };

    return <DiaryCard {...props} onPressActionSheet={onPressActionSheet} />;
}
