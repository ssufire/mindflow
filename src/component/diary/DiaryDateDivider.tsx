import React from "react";
import moment from "moment";
import { Text } from "native-base";

export default function DiaryDateDivider({ showDivider, createdAt }) {
    return (
        showDivider && (
            <Text fontSize="xl" marginTop="3">
                {moment(createdAt).format("yyyy년 MM월 DD일")}
            </Text>
        )
    );
}
