import React, { useEffect } from "react";
import { Platform, StatusBar } from "react-native";
import { Box } from "native-base";
import FastImage from "react-native-fast-image";

export default function ScreenBackgroundTexture(props) {
    useEffect(() => {
        StatusBar.setBarStyle("dark-content");
        console.log("currentHeight", StatusBar.currentHeight);
    }, []);

    return (
        <Box
            {...props}
            backgroundColor="white"
            position="absolute"
            bottom="0"
            right="0"
            left="0"
            top="0"
            style={{
                paddingTop:
                    Platform.OS === "android" ? StatusBar.currentHeight : 0,
            }}
        >
            <FastImage
                source={require("../../asset/backgroundPaperTexture.jpg")}
                style={{
                    position: "absolute",
                    opacity: 0.45,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    top: 0,
                }}
            />
            <StatusBar backgroundColor="transparent" translucent={true} />
            {props.children}
        </Box>
    );
}
