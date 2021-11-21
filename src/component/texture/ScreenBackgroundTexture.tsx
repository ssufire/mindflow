import React from "react";
import { Box } from "native-base";
import FastImage from "react-native-fast-image";

export default function ScreenBackgroundTexture(props) {
    return (
        <Box
            {...props}
            backgroundColor="white"
            position="absolute"
            bottom="0"
            right="0"
            left="0"
            top="0"
            rounded="xl"
        >
            <FastImage
                source={require("../../asset/backgroundPaperTexture.jpg")}
                style={{
                    position: "absolute",
                    opacity: 0.45,
                    borderRadius: 13,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    top: 0,
                }}
            />
            {props.children}
        </Box>
    );
}
