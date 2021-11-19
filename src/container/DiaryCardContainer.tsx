import React, { useState } from "react";
import DiaryCard from "../component/DiaryCard";
import DiaryCardDeleted from "../component/DiaryCardDeleted";

import { useActionSheet } from "@expo/react-native-action-sheet";
import cancelDiaryBomb from "../lib/diary/cancelDiaryBomb";
import addDiaryBomb from "../lib/diary/addDiaryBomb";

export default function DiaryCardContainer(props) {
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
                        ? await cancelDiaryBomb(props.id)
                        : await addDiaryBomb(props.id);
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
        <DiaryCard
            {...props}
            onPressActionSheet={onPressActionSheet}
            setExploded={setExploded}
        />
    );
}
