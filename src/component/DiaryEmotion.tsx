import React from "react";
import { Box } from "native-base";

export default function DiaryEmotion({
    size = "4",
    color = "#ffffff",
    borderColor = "#ffffff",
    borderRadius = "xl",
    showBorder = false,
}) {
    return (
        <Box
            p={size}
            borderRadius={borderRadius}
            background={color}
            borderColor={borderColor}
            borderWidth={showBorder ? 2 : 0}
        />
    );
}
