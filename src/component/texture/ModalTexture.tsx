import React from "react";
import { Box, Modal } from "native-base";
import FastImage from "react-native-fast-image";

export default function ModalTexture({ modalVisible, onClose, children }) {
    return (
        <Modal isOpen={modalVisible} onClose={onClose}>
            <Modal.Content>
                <FastImage
                    source={require("../../asset/paperTextureLight.png")}
                    style={{
                        position: "absolute",
                        borderRadius: 13,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        top: 0,
                    }}
                />
                <Box
                    opacity="0.15"
                    backgroundColor="red.100"
                    position="absolute"
                    bottom="0"
                    right="0"
                    left="0"
                    top="0"
                />
                <Modal.CloseButton />
                <Modal.Body p="5">{children}</Modal.Body>
            </Modal.Content>
        </Modal>
    );
}
