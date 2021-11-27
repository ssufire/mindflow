import React from "react";
import { Button, Text } from "native-base";
import { Picker } from "@react-native-picker/picker";
import { getExplodeTimeList } from "../../lib/data/getStaticData";
import ModalTexture from "../texture/ModalTexture";

const timelist = getExplodeTimeList();

export default function DiaryExplodeModal({
    modalVisible,
    setModalVisible,
    selectedTime,
    setSelectedTime,
    onPressSetTimebomb,
}) {
    return (
        <ModalTexture
            modalVisible={modalVisible}
            onClose={() => setModalVisible(false)}
        >
            <Text textAlign="center" fontSize="lg" my="3">
                지금 이 감정,{"\n"}언제 떠나보내실 건가요?
            </Text>
            <Picker
                selectedValue={selectedTime}
                onValueChange={setSelectedTime}
            >
                {timelist.map((value) => (
                    <Picker.Item
                        color="black"
                        label={`${value}시간 후`}
                        value={value}
                        key={value}
                    />
                ))}
            </Picker>
            <Button
                m="3"
                background="#877E74"
                onPress={onPressSetTimebomb}
                _text={{ fontSize: "md" }}
            >
                떠나보내기
            </Button>
        </ModalTexture>
    );
}
