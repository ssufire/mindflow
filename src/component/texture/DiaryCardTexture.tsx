import React from "react";
import { Box } from "native-base";

export default function DiaryCardTexture(props) {
    // * To Optimize Performance
    // * DO NOT PLACE IMAGE HERE!!
    return (
        <Box
            {...props}
            p="3"
            my="3"
            width="100%"
            rounded="xl"
            backgroundColor="#ffffff99"
        >
            {props.children}
        </Box>
    );
}
